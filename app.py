from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
from datetime import datetime
from services.pdf_service import PDFService
from services.signature_service import SignatureService
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# In-memory database (for prototype)
requests_db = {}

pdf_service = PDFService()
signature_service = SignatureService()

@app.route('/api/requests', methods=['POST'])
def create_request():
    data = request.json
    request_id = str(uuid.uuid4())[:8]
    new_request = {
        'id': request_id,
        'applicant_name': data.get('applicant_name'),
        'applicant_email': data.get('applicant_email'),
        'ficha': data.get('ficha', 'N/A'),
        'cedula': data.get('cedula', 'N/A'),
        'fecha_ingreso': data.get('fecha_ingreso', 'N/A'),
        'fecha_salida': data.get('fecha_salida', 'N/A'),
        'fecha_retorno': data.get('fecha_retorno', 'N/A'),
        'dias_disfrutar': data.get('dias_disfrutar', '0'),
        'periodo': data.get('periodo', '2025'),
        'description': data.get('description', ''),
        'status': 'PENDING_LEVEL_1',
        'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'approvals': [
            {'level': 1, 'name': 'Erika Ferrao', 'status': 'PENDING', 'date': None},
            {'level': 2, 'name': 'Leisser Ciampani', 'status': 'PENDING', 'date': None},
            {'level': 3, 'name': 'Ana T. Naranjo', 'status': 'PENDING', 'date': None}
        ],
        "signature_request_id": None,
        "signing_url": None
    }
    
    requests_db[request_id] = new_request
    return jsonify(new_request), 201

@app.route('/api/requests', methods=['GET'])
def get_all_requests():
    return jsonify(list(requests_db.values()))

@app.route('/api/requests/<request_id>', methods=['GET'])
def get_request(request_id):
    req = requests_db.get(request_id)
    if not req:
        return jsonify({"error": "Request not found"}), 404
    return jsonify(req)

@app.route('/api/requests/<request_id>/approve', methods=['POST'])
def approve_request(request_id):
    req = requests_db.get(request_id)
    if not req:
        return jsonify({"error": "Request not found"}), 404
    
    # Simple logic to move through levels 1 to 3
    current_status = req["status"]
    
    if current_status == "PENDING_LEVEL_1":
        req["approvals"][0]["status"] = "APPROVED"
        req["approvals"][0]["date"] = datetime.now().strftime("%d/%m/%Y")
        req["status"] = "PENDING_LEVEL_2"
    elif current_status == "PENDING_LEVEL_2":
        req["approvals"][1]["status"] = "APPROVED"
        req["approvals"][1]["date"] = datetime.now().strftime("%d/%m/%Y")
        req["status"] = "PENDING_LEVEL_3"
    elif current_status == "PENDING_LEVEL_3":
        req["approvals"][2]["status"] = "APPROVED"
        req["approvals"][2]["date"] = datetime.now().strftime("%d/%m/%Y")
        req["status"] = "APPROVED"
        
        # FINAL APPROVAL - Trigger PDF and Signature
        pdf_filename = f"request_{request_id}.pdf"
        pdf_path = os.path.join("temp", pdf_filename)
        os.makedirs("temp", exist_ok=True)
        
        pdf_service.generate_vacation_request(req, pdf_path)
        
        # Send to Dropbox Sign
        sign_result = signature_service.send_signature_request(
            pdf_path,
            req["applicant_email"],
            req["applicant_name"],
            f"Firma de Solicitud {request_id}",
            "Tu solicitud ha sido aprobada. Por favor procede a firmar el documento."
        )
        
        req["signature_request_id"] = sign_result.get("request_id")
        req["signing_url"] = sign_result.get("signing_url")
        req["status"] = "SIGNATURE_REQUESTED"
        
    return jsonify(req)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
