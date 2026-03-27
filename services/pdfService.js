const fs = require("fs");
const path = require("path");

class PDFService {
    constructor() {}

    async generateVacationRequest(data, outputPath) {
        const PDFDocument = require("pdfkit-table");
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        
        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Header section...
        doc.fontSize(10).text("EMPRESA: INFOCENT, C.A.", { align: "left" });
        doc.text("NÓMINA: EMPLEADOS", { align: "left" });
        doc.moveDown();

        const table = {
            title: "SOLICITUD DE VACACIONES",
            divider: {
                header: { disabled: false, width: 2, opacity: 1 },
                horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
            },
            headers: [
                { label: "N° FICHA", property: "ficha", width: 60 },
                { label: "APELLIDOS Y NOMBRES", property: "nombre", width: 250 },
                { label: "FECHA INGRESO", property: "ingreso", width: 100 },
                { label: "CÉDULA", property: "cedula", width: 100 },
            ],
            datas: [
                {
                    ficha: data.ficha || "N/A",
                    nombre: data.applicant_name || "N/A",
                    ingreso: data.fecha_ingreso || "07/09/2023",
                    cedula: data.cedula || "N/A"
                }
            ],
            options: {
                padding: 5,
                columnSpacing: 10,
            }
        };

        await doc.table(table);

        doc.moveDown();

        const detailTable = {
            title: "DETALLES DE LA SOLICITUD",
            headers: [
                { label: "FECHA SALIDA", property: "salida", width: 130 },
                { label: "FECHA RETORNO", property: "retorno", width: 130 },
                { label: "DÍAS A DISFRUTAR", property: "dias", width: 130 },
                { label: "PERIODO", property: "periodo", width: 120 },
            ],
            datas: [
                {
                    salida: data.fecha_salida || "N/A",
                    retorno: data.fecha_retorno || "N/A",
                    dias: data.dias_disfrutar || "0",
                    periodo: data.periodo || "2024-2025"
                }
            ]
        };

        await doc.table(detailTable);

        doc.moveDown(4);

        // Signature section
        const startY = doc.y;
        doc.rect(50, startY, 200, 60).stroke();
        doc.text("SOLICITANTE", 50, startY + 5, { width: 200, align: "center" });
        
        // Tag invisible para posicionamiento automático de firma
        doc.fillColor("white").fontSize(1).text("[sig|req|signer1]", 100, startY + 30);
        doc.fillColor("black").fontSize(10); // Restaurar colores y tamaño

        doc.rect(340, startY, 200, 60).stroke();
        doc.text("APROBADO POR", 340, startY + 5, { width: 200, align: "center" });

        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(outputPath));
            stream.on('error', reject);
            doc.end();
        });
    }
}

module.exports = PDFService;
