function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty("SHARED_SECRET");
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");
    const ownerEmail = props.getProperty("OWNER_EMAIL");

    if (!secret || !spreadsheetId || !ownerEmail) {
      return json_({ ok: false, error: "Faltan propiedades de configuración en Apps Script." });
    }

    if (!payload.secret || payload.secret !== secret) {
      return json_({ ok: false, error: "Secreto no válido." });
    }

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const reference = createReference_();
    const submittedAt = payload.submittedAt || new Date().toISOString();
    const type = payload.type;
    const data = payload.data || {};

    if (type === "contact") {
      saveContact_(ss, reference, submittedAt, data);
      sendOwnerContactEmail_(ownerEmail, reference, data);
      sendUserContactConfirmation_(data.email, reference, data);
      return json_({ ok: true, reference: reference });
    }

    if (type === "tracking_order") {
      saveTrackingOrder_(ss, reference, submittedAt, data);
      sendOwnerTrackingEmail_(ownerEmail, reference, data);
      sendUserOrderConfirmation_(data.email, reference, "Sistema de Seguimiento de Punto de Cruz", data);
      return json_({ ok: true, reference: reference });
    }

    if (type === "inventory_order") {
      saveInventoryOrder_(ss, reference, submittedAt, data);
      sendOwnerInventoryEmail_(ownerEmail, reference, data);
      sendUserOrderConfirmation_(data.email, reference, "Sistema de Inventario Profesional", data);
      return json_({ ok: true, reference: reference });
    }

    return json_({ ok: false, error: "Tipo de formulario no reconocido." });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: "Error interno en Apps Script." });
  }
}

function saveContact_(ss, reference, submittedAt, data) {
  const sheet = getOrCreateSheet_(ss, "Contacto", [
    "Referencia",
    "Fecha",
    "Nombre",
    "Email",
    "Asunto",
    "Mensaje",
    "Acepta privacidad",
    "Acepta novedades",
  ]);

  sheet.appendRow([
    reference,
    submittedAt,
    data.name || "",
    data.email || "",
    data.subject || "",
    data.message || "",
    data.privacyAccepted ? "Sí" : "No",
    data.marketingAccepted ? "Sí" : "No",
  ]);
}

function saveTrackingOrder_(ss, reference, submittedAt, data) {
  const sheet = getOrCreateSheet_(ss, "Pedidos Seguimiento", [
    "Referencia",
    "Fecha",
    "Nombre",
    "Email",
    "Tipo de pedido",
    "Versión nueva",
    "Versión actual",
    "Mejora elegida",
    "Método de pago",
    "Importe total",
    "Acepta novedades",
  ]);

  sheet.appendRow([
    reference,
    submittedAt,
    data.name || "",
    data.email || "",
    data.requestType || "",
    data.newVersion || "",
    data.currentVersion || "",
    data.upgradeVersion || "",
    data.paymentMethod || "",
    data.total || "",
    data.marketingAccepted ? "Sí" : "No",
  ]);
}

function saveInventoryOrder_(ss, reference, submittedAt, data) {
  const sheet = getOrCreateSheet_(ss, "Pedidos Inventario", [
    "Referencia",
    "Fecha",
    "Nombre",
    "Email",
    "Tipo de pedido",
    "Modo compra nueva",
    "Complementos que ya tiene",
    "Complementos solicitados",
    "Método de pago",
    "Importe total",
    "Acepta novedades",
  ]);

  sheet.appendRow([
    reference,
    submittedAt,
    data.name || "",
    data.email || "",
    data.requestType || "",
    data.newMode || "",
    Array.isArray(data.owned) ? data.owned.join(", ") : "",
    Array.isArray(data.wanted) ? data.wanted.join(", ") : "",
    data.paymentMethod || "",
    data.total || "",
    data.marketingAccepted ? "Sí" : "No",
  ]);
}

function sendOwnerContactEmail_(ownerEmail, reference, data) {
  MailApp.sendEmail({
    to: ownerEmail,
    subject: "Nuevo mensaje de contacto · " + reference,
    htmlBody: [
      "<p>Has recibido un nuevo mensaje de contacto.</p>",
      "<p><strong>Referencia:</strong> " + reference + "</p>",
      "<p><strong>Nombre:</strong> " + escapeHtml_(data.name || "") + "</p>",
      "<p><strong>Email:</strong> " + escapeHtml_(data.email || "") + "</p>",
      "<p><strong>Asunto:</strong> " + escapeHtml_(data.subject || "") + "</p>",
      "<p><strong>Mensaje:</strong><br>" + escapeHtml_(data.message || "").replace(/\n/g, "<br>") + "</p>",
    ].join(""),
  });
}

function sendOwnerTrackingEmail_(ownerEmail, reference, data) {
  MailApp.sendEmail({
    to: ownerEmail,
    subject: "Nuevo pedido Seguimiento · " + reference,
    htmlBody: [
      "<p>Has recibido un nuevo pedido del Sistema de Seguimiento de Punto de Cruz.</p>",
      "<p><strong>Referencia:</strong> " + reference + "</p>",
      "<p><strong>Nombre:</strong> " + escapeHtml_(data.name || "") + "</p>",
      "<p><strong>Email:</strong> " + escapeHtml_(data.email || "") + "</p>",
      "<p><strong>Tipo de pedido:</strong> " + escapeHtml_(data.requestType || "") + "</p>",
      "<p><strong>Versión nueva:</strong> " + escapeHtml_(data.newVersion || "") + "</p>",
      "<p><strong>Versión actual:</strong> " + escapeHtml_(data.currentVersion || "") + "</p>",
      "<p><strong>Mejora elegida:</strong> " + escapeHtml_(data.upgradeVersion || "") + "</p>",
      "<p><strong>Método de pago:</strong> " + escapeHtml_(data.paymentMethod || "") + "</p>",
      "<p><strong>Total:</strong> " + escapeHtml_(String(data.total || "")) + " €</p>",
    ].join(""),
  });
}

function sendOwnerInventoryEmail_(ownerEmail, reference, data) {
  MailApp.sendEmail({
    to: ownerEmail,
    subject: "Nuevo pedido Inventario · " + reference,
    htmlBody: [
      "<p>Has recibido un nuevo pedido del Sistema de Inventario Profesional.</p>",
      "<p><strong>Referencia:</strong> " + reference + "</p>",
      "<p><strong>Nombre:</strong> " + escapeHtml_(data.name || "") + "</p>",
      "<p><strong>Email:</strong> " + escapeHtml_(data.email || "") + "</p>",
      "<p><strong>Tipo de pedido:</strong> " + escapeHtml_(data.requestType || "") + "</p>",
      "<p><strong>Modo compra nueva:</strong> " + escapeHtml_(data.newMode || "") + "</p>",
      "<p><strong>Complementos que ya tiene:</strong> " + escapeHtml_(Array.isArray(data.owned) ? data.owned.join(", ") : "") + "</p>",
      "<p><strong>Complementos solicitados:</strong> " + escapeHtml_(Array.isArray(data.wanted) ? data.wanted.join(", ") : "") + "</p>",
      "<p><strong>Método de pago:</strong> " + escapeHtml_(data.paymentMethod || "") + "</p>",
      "<p><strong>Total:</strong> " + escapeHtml_(String(data.total || "")) + " €</p>",
    ].join(""),
  });
}

function paymentInstructionsHtml_(data) {
  var method = String(data.paymentMethod || "").toLowerCase();
  var total = escapeHtml_(String(data.total || "")) + " €";

  if (method === "paypal") {
    return [
      "<p><strong>Datos de pago:</strong></p>",
      "<p><strong>Método:</strong> PayPal</p>",
      "<p><strong>Importe:</strong> " + total + "</p>",
      "<p>Puedes completar el pago usando el código QR mostrado al finalizar el pedido en la web.</p>",
      "<p><strong>Si el QR no te funciona correctamente</strong>, realiza el pago a este email: <strong>frnt24@hotmail.com</strong>.</p>",
      "<p>Indica el importe correspondiente y, en la nota, escribe tu nombre completo. Selecciona "Amigos y familiares" para completar el pago.</p>"
    ].join("");
  }

  if (method === "bizum") {
    return [
      "<p><strong>Datos de pago:</strong></p>",
      "<p><strong>Método:</strong> Bizum</p>",
      "<p><strong>Importe:</strong> " + total + "</p>",
      "<p>Envía el pago al siguiente número: <strong>624009129</strong>.</p>",
      "<p><strong>Concepto:</strong> tu nombre completo.</p>"
    ].join("");
  }

  return "";
}

function sendUserOrderConfirmation_(email, reference, productName, data) {
  if (!email) return;

  MailApp.sendEmail({
    to: email,
    subject: "Confirmación de pedido · " + reference,
    htmlBody: [
      "<p>Hola,</p>",
      "<p>He recibido correctamente tu pedido en Bordando con Fru.</p>",
      "<p><strong>Referencia:</strong> " + reference + "</p>",
      "<p><strong>Producto:</strong> " + escapeHtml_(productName) + "</p>",
      "<p><strong>Método de pago seleccionado:</strong> " + escapeHtml_(data.paymentMethod || "") + "</p>",
      "<p><strong>Importe total:</strong> " + escapeHtml_(String(data.total || "")) + " €</p>",
      paymentInstructionsHtml_(data),
      "<p>Una vez comprobado el pago, recibirás la entrega correspondiente por correo electrónico.</p>",
      "<p>Gracias.</p>",
    ].join(""),
  });
}

function sendUserContactConfirmation_(email, reference, data) {
  if (!email) return;

  MailApp.sendEmail({
    to: email,
    subject: "Confirmación de contacto · " + reference,
    htmlBody: [
      "<p>Hola,</p>",
      "<p>He recibido correctamente tu mensaje en Bordando con Fru.</p>",
      "<p><strong>Referencia:</strong> " + reference + "</p>",
      "<p><strong>Asunto:</strong> " + escapeHtml_(data.subject || "") + "</p>",
      "<p>Te responderé en cuanto me sea posible.</p>",
      "<p>Gracias.</p>",
    ].join(""),
  });
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

function createReference_() {
  return "BCF-" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
