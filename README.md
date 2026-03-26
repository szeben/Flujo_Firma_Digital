# Flujo de Solicitudes con Firma Digital (Prototype)

Este proyecto es un prototipo funcional de un sistema de gestión de solicitudes (ej. vacaciones) con un flujo de aprobación de 3 niveles y firma digital integrada mediante **Dropbox Sign**.

## 🚀 Características
- **Backend**: Python 3 con Flask.
- **Generación de PDF**: Documentos automáticos basados en un formato profesional real usando `fpdf2`.
- **Firma Digital**: Integración (simulada y real) con la API de Dropbox Sign.
- **Frontend**: Interfaz moderna con *Glassmorphism* y **Modo Simulación (Mock Mode)** para pruebas rápidas sin servidor.

## 🛠️ Requisitos
- Python 3.8+
- Dependencias listadas en `requirements.txt`

## 📦 Instalación y Uso
1. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
2. Ejecutar el servidor:
   ```bash
   python app.py
   ```
3. Abrir `public/index.html` en el navegador.

---
Prototipo diseñado para la gestión eficiente de documentos firmados.
