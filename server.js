const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

const PDFService = require('./services/pdfService');
const SignatureService = require('./services/signatureService');
const notificationService = require('./services/notificationService');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory database (for prototype)
const requests_db = {};

const pdfService = new PDFService();
const signatureService = new SignatureService();

// Create a new request
app.post('/api/requests', (req, res) => {
    const data = req.body;
    const request_id = uuidv4().substring(0, 8);
    
    const new_request = {
        id: request_id,
        applicant_name: data.applicant_name,
        applicant_email: data.applicant_email,
        ficha: data.ficha || 'N/A',
        cedula: data.cedula || 'N/A',
        fecha_ingreso: data.fecha_ingreso || 'N/A',
        fecha_salida: data.fecha_salida || 'N/A',
        fecha_retorno: data.fecha_retorno || 'N/A',
        dias_disfrutar: data.dias_disfrutar || '0',
        applicant_phone: data.applicant_phone || null,
        periodo: data.periodo || '2025',
        description: data.description || '',
        status: 'PENDING_LEVEL_1',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        approvals: [
            { level: 1, name: 'Erika Ferrao', status: 'PENDING', date: null },
            { level: 2, name: 'Leisser Ciampani', status: 'PENDING', date: null },
            { level: 3, name: 'Ana T. Naranjo', status: 'PENDING', date: null }
        ],
        signature_request_id: null,
        signing_url: null
    };
    
    requests_db[request_id] = new_request;
    res.status(201).json(new_request);
});

// Get all requests
app.get('/api/requests', (req, res) => {
    res.json(Object.values(requests_db));
});

// Get a single request
app.get('/api/requests/:id', (req, res) => {
    const request = requests_db[req.params.id];
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
});

// Approve a request
app.post('/api/requests/:id/approve', async (req, res) => {
    const request_id = req.params.id;
    const request = requests_db[request_id];
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    const today = new Date().toLocaleDateString('es-ES');
    
    if (request.status === 'PENDING_LEVEL_1') {
        request.approvals[0].status = 'APPROVED';
        request.approvals[0].date = today;
        request.status = 'PENDING_LEVEL_2';
    } else if (request.status === 'PENDING_LEVEL_2') {
        request.approvals[1].status = 'APPROVED';
        request.approvals[1].date = today;
        request.status = 'PENDING_LEVEL_3';
    } else if (request.status === 'PENDING_LEVEL_3') {
        request.approvals[2].status = 'APPROVED';
        request.approvals[2].date = today;
        request.status = 'APPROVED';
        
        // Final Approval - PDF generation and Signature request
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        
        const pdfPath = path.join(tempDir, `request_${request_id}.pdf`);
        
        try {
            // Generate PDF
            await pdfService.generateVacationRequest(request, pdfPath);
            
            // Send to Dropbox Sign
            const { request_id: sig_id, signing_info } = await signatureService.sendSignatureRequest(
                request.applicant_name,
                request.applicant_email,
                pdfPath
            );
            
                if (sig_id) {
                    request.signature_request_id = sig_id;
                    request.signing_url = signing_info;
                    request.status = 'SIGNATURE_REQUESTED';

                    // Trigger WhatsApp Notification
                    if (request.applicant_phone) {
                        try {
                            await notificationService.sendWhatsAppNotification(
                                request.applicant_phone,
                                request.applicant_name,
                                signing_info
                            );
                        } catch (wsError) {
                            console.error('Error sending WhatsApp:', wsError);
                        }
                    }
                } else {
                request.status = 'ERROR_SIGNATURE';
            }
        } catch (err) {
            console.error('Error in final approval process:', err);
            request.status = 'ERROR_INTERNAL';
        }
    }
    
    res.json(request);
});

// Serve generated PDF
app.get('/api/requests/:id/pdf', (req, res) => {
    const pdfPath = path.join(__dirname, 'temp', `request_${req.params.id}.pdf`);
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.sendFile(pdfPath);
    } else {
        res.status(404).send('PDF no encontrado. Asegúrate de que la solicitud haya sido aprobada totalmente.');
    }
});

// Serve frontend
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
