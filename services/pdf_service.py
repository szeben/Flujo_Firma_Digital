from fpdf import FPDF
import os

class PDFService:
    @staticmethod
    def generate_vacation_request(request_data, output_path):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("helvetica", size=10)

        # Helper for Gray Headers
        def draw_header(text, y_pos):
            pdf.set_fill_color(169, 169, 169) # Gray
            pdf.set_text_color(0, 0, 0)
            pdf.set_font("helvetica", "B", 10)
            pdf.set_xy(10, y_pos)
            pdf.cell(190, 6, text, border=1, ln=1, align='C', fill=True)
            pdf.set_font("helvetica", "", 10)

        # 1. Fecha de Solicitud (Top Right)
        pdf.set_fill_color(169, 169, 169)
        pdf.set_xy(150, 10)
        pdf.cell(40, 6, "FECHA DE SOLICITUD", border=1, ln=1, align='C', fill=True)
        pdf.set_xy(150, 16)
        pdf.cell(40, 6, request_data.get('created_at', '').split(' ')[0], border=1, ln=1, align='C')

        # 2. Title
        pdf.set_font("helvetica", "B", 14)
        pdf.set_xy(10, 30)
        pdf.cell(190, 10, "SOLICITUD DE VACACIONES", ln=1, align='C')

        # 3. EMPRESA
        draw_header("EMPRESA", 45)
        pdf.set_xy(10, 51)
        pdf.cell(190, 10, f"Empresa: INFOCENT, C.A.", border="LRB", ln=1)
        pdf.set_xy(10, 61)
        pdf.cell(190, 10, f"Nómina: EMPLEADOS", border="LRB", ln=1)

        # 4. Employee Data
        pdf.set_fill_color(169, 169, 169)
        pdf.set_font("helvetica", "B", 8)
        pdf.set_xy(10, 75)
        pdf.cell(30, 6, "N° FICHA", border=1, align='C', fill=True)
        pdf.cell(70, 6, "APELLIDOS Y NOMBRES", border=1, align='C', fill=True)
        pdf.cell(50, 6, "FECHA DE INGRESO", border=1, align='C', fill=True)
        pdf.cell(40, 6, "CÉDULA DE IDENTIDAD", border=1, ln=1, align='C', fill=True)
        
        pdf.set_font("helvetica", "", 10)
        pdf.cell(30, 8, request_data.get('ficha', 'N/A'), border=1, align='C')
        pdf.cell(70, 8, request_data.get('applicant_name', 'N/A'), border=1, align='C')
        pdf.cell(50, 8, request_data.get('fecha_ingreso', 'N/A'), border=1, align='C')
        pdf.cell(40, 8, request_data.get('cedula', 'N/A'), border=1, ln=1, align='C')

        # 5. TIPO DE SOLICITUD
        draw_header("TIPO DE SOLICITUD", 95)
        pdf.set_font("helvetica", "", 9)
        pdf.set_xy(10, 101)
        pdf.cell(40, 10, "Disfrute Parcial", border=1, align='L')
        pdf.cell(10, 10, "X", border=1, align='C')
        pdf.cell(40, 10, "Disfrute Total", border=1, align='L')
        pdf.cell(10, 10, "", border=1, align='C')
        pdf.cell(45, 10, "Fecha de Salida:", border=1, align='L')
        pdf.cell(45, 10, request_data.get('fecha_salida', 'N/A'), border=1, ln=1, align='C')

        pdf.set_xy(10, 111)
        pdf.cell(45, 30, f"Período a disfrutar:\n\n{request_data.get('periodo', '2025')}", border=1, align='L')
        pdf.cell(45, 30, f"Días a disfrutar:\n\n{request_data.get('dias_disfrutar', '0')}", border=1, align='L')
        
        pdf.set_xy(100, 111)
        pdf.cell(45, 10, "Fecha de Retorno:", border=1, align='L')
        pdf.cell(45, 10, request_data.get('fecha_retorno', 'N/A'), border=1, ln=1, align='C')
        
        pdf.set_xy(100, 121)
        pdf.cell(45, 10, "Días pendientes:", border=1, align='L')
        pdf.cell(45, 10, "5", border=1, ln=1, align='C')

        pdf.set_xy(100, 131)
        pdf.cell(45, 10, "Total días a disfrutar:", border=1, align='L')
        pdf.cell(45, 10, request_data.get('dias_disfrutar', '0'), border=1, ln=1, align='C')

        # 6. RRHH
        draw_header("SOLO PARA USO DE LA GERENCIA DE RECURSOS HUMANOS", 150)
        pdf.rect(10, 156, 190, 30)

        # 7. Signature Footer
        pdf.set_font("helvetica", "B", 8)
        pdf.set_xy(10, 200)
        pdf.cell(47.5, 6, "SOLICITADO POR:", border=1, align='C', fill=True)
        pdf.cell(47.5, 6, "REVISADO POR:", border=1, align='C', fill=True)
        pdf.cell(47.5, 6, "PROCESADO POR:", border=1, align='C', fill=True)
        pdf.cell(47.5, 6, "APROBADO POR:", border=1, ln=1, align='C', fill=True)
        
        # Signature boxes
        pdf.rect(10, 206, 47.5, 30)
        pdf.rect(57.5, 206, 47.5, 30)
        pdf.rect(105, 206, 47.5, 30)
        pdf.rect(152.5, 206, 47.5, 30)
        
        # Approval details (optional text inside boxes)
        pdf.set_font("helvetica", "", 7)
        for i, app in enumerate(request_data.get('approvals', [])):
            if app['status'] == 'APPROVED':
                pdf.set_xy(57.5 + (i*47.5), 220)
                pdf.cell(47.5, 4, f"Firmado por: {app['name']}", ln=1, align='C')
                pdf.set_x(57.5 + (i*47.5))
                pdf.cell(47.5, 4, f"Fecha: {app['date']}", ln=1, align='C')

        pdf.output(output_path)
