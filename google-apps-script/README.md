# Integración con Google Apps Script

Este proyecto ya incluye una integración pensada para que:

- los formularios de pedido y contacto envíen la información a tu entorno Google,
- Google Sheets reciba una fila por cada envío,
- y Google Apps Script mande correos automáticos a ti y a la clienta.

## 1. Crea una hoja de cálculo en Google Sheets

Crea un archivo nuevo y copia su ID de la URL.

## 2. Crea un proyecto de Apps Script

- Abre la hoja
- Extensiones → Apps Script
- Sustituye el contenido de `Code.gs` por el archivo `Code.gs` incluido en esta carpeta

## 3. Configura estas propiedades del script

En Apps Script:

- Configuración del proyecto
- Propiedades del script

Añade estas tres:

- `SHARED_SECRET` → una cadena larga y secreta
- `SPREADSHEET_ID` → el ID de tu hoja de cálculo
- `OWNER_EMAIL` → `stitchingwithfru@gmail.com`

## 4. Despliega el script como Web App

- Implementar → Nueva implementación
- Tipo: Aplicación web
- Ejecutar como: tú misma
- Quién tiene acceso: cualquiera con el enlace

Copia la URL `/exec`.

## 5. Añade variables en Vercel

En tu proyecto de Vercel:

- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` → URL `/exec` de Apps Script
- `FORMS_SHARED_SECRET` → el mismo valor que `SHARED_SECRET`

Después vuelve a desplegar.

## 6. Qué crea automáticamente el script

La primera vez que llegue cada formulario, el script creará estas pestañas si no existen:

- `Contacto`
- `Pedidos Seguimiento`
- `Pedidos Inventario`

## 7. Correos automáticos

El script envía:

- un correo para ti con el detalle del mensaje o pedido
- un correo de confirmación para la persona que ha enviado el formulario
