const twilio = require('twilio');

class NotificationService {
    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID;
        this.authToken = process.env.TWILIO_AUTH_TOKEN;
        this.from = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
        this.templateSid = process.env.TWILIO_TEMPLATE_SID;
        
        if (this.accountSid && this.authToken) {
            this.client = twilio(this.accountSid, this.authToken);
        }
    }

    async sendWhatsAppNotification(to, applicantName, signingUrl) {
        if (!this.client) {
            console.error('Twilio client not initialized. Check your .env file.');
            return null;
        }

        try {
            // Asegurar formato whatsapp:+
            let formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
            if (!formattedTo.includes('+')) {
                // Si no tiene el +, asumimos que el usuario no lo puso pero Twilio lo requiere
                formattedTo = formattedTo.replace('whatsapp:', 'whatsapp:+');
            }

            console.log(`Enviando WhatsApp a ${formattedTo} usando plantilla ${this.templateSid}...`);
            
            const message = await this.client.messages.create({
                from: this.from,
                to: formattedTo,
                contentSid: this.templateSid,
                contentVariables: JSON.stringify({
                    "1": applicantName,  // Corresponde a {{1}} en la plantilla de Twilio
                    "2": signingUrl      // Corresponde a {{2}} en la plantilla de Twilio
                })
            });

            console.log(`WhatsApp enviado con éxito. SID: ${message.sid}`);
            return message.sid;
        } catch (error) {
            console.error('Error enviando WhatsApp via Twilio:', error);
            throw error;
        }
    }
}

module.exports = new NotificationService();
