import os
from dropbox_sign import ApiClient, Configuration, apis, models
from dotenv import load_dotenv

load_dotenv()

class SignatureService:
    def __init__(self):
        self.api_key = os.getenv("DROPBOX_SIGN_API_KEY")
        if self.api_key:
            self.configuration = Configuration(api_key={'api_key': self.api_key})
        else:
            self.configuration = None

    def send_signature_request(self, pdf_path, email, name, subject, message):
        """
        Sends a signature request via Dropbox Sign.
        If no API key is set, it simulates the request.
        """
        if not self.configuration:
            return {
                "status": "simulated",
                "request_id": "sim_12345",
                "signing_url": f"https://app.hellosign.com/s/simulated_link_for_{name}"
            }

        with ApiClient(self.configuration) as api_client:
            signature_request_api = apis.SignatureRequestApi(api_client)

            signer_1 = models.SubSignatureRequestSigner(
                email_address=email,
                name=name,
                order=0,
            )

            request_data = models.SignatureRequestSendRequest(
                title=subject,
                subject=subject,
                message=message,
                signers=[signer_1],
                files=[open(pdf_path, "rb")],
                test_mode=True,  # Default to test mode
            )

            try:
                response = signature_request_api.signature_request_send(request_data)
                return {
                    "status": "sent",
                    "request_id": response.signature_request.signature_request_id,
                    "is_complete": response.signature_request.is_complete
                }
            except Exception as e:
                print(f"Error sending signature request: {e}")
                return {"status": "error", "message": str(e)}

# Example usage
if __name__ == "__main__":
    service = SignatureService()
    # Mock call
    result = service.send_signature_request(
        "test_vacation_request.pdf", 
        "user@example.com", 
        "Juan Perez", 
        "Solicitud de Vacaciones", 
        "Por favor firma tu solicitud de vacaciones."
    )
    print(result)
