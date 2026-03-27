const DropboxSign = require("@dropbox/sign");
const fs = require("fs");
const path = require("path");

class SignatureService {
    constructor() {
        this.apiKey = process.env.DROPBOX_SIGN_API_KEY;
        if (this.apiKey) {
            this.apiInstance = new DropboxSign.SignatureRequestApi();
            this.apiInstance.username = this.apiKey;
            
            // Forzar test_mode=1 en todas las solicitudes salientes como workaround
            this.apiInstance.addInterceptor((requestOptions) => {
                // Siempre añadir como query param en la URL para evitar payment_required
                requestOptions.params = requestOptions.params || {};
                requestOptions.params.test_mode = 1;
                return Promise.resolve();
            });
        } else {
            console.warn("WARNING: DROPBOX_SIGN_API_KEY not found. Running in simulation mode.");
            this.apiInstance = null;
        }
    }

    async sendSignatureRequest(applicant_name, applicant_email, pdfPath) {
        if (!this.apiInstance) {
            console.log("SIMULATION: Sending signature request to", applicant_email);
            return { request_id: "sim_" + Date.now(), signing_info: "http://localhost:5000/mock-sign" };
        }

        const signer = {
            name: applicant_name,
            emailAddress: applicant_email
        };

        const data = {
            title: "Solicitud de Vacaciones",
            subject: "Por favor firma tu solicitud de vacaciones",
            message: "Hola, tu solicitud ha sido aprobada. Por favor firmala para completar el proceso.",
            signers: [signer],
            files: [
                {
                    value: fs.readFileSync(pdfPath),
                    options: {
                        filename: 'solicitud_vacaciones.pdf',
                        contentType: 'application/pdf'
                    }
                }
            ],
            testMode: 1,
            useTextTags: true
        };

        try {
            const result = await this.apiInstance.signatureRequestSend(data);
            
            // Log for debugging
            console.log("Dropbox Sign Response:", JSON.stringify(result.body, null, 2));

            return {
                request_id: result.body.signatureRequest.signatureRequestId,
                signing_info: result.body.signatureRequest.signingUrl || "Check your email for the signing link"
            };
        } catch (error) {
            console.error("Exception when calling Dropbox Sign API:", error);
            return { request_id: null, signing_info: null };
        }
    }
}

module.exports = SignatureService;
