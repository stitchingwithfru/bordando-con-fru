import { NextResponse } from "next/server";

type FormType = "contact" | "tracking_order" | "inventory_order";

type RequestBody = {
  type?: FormType;
  data?: Record<string, unknown>;
};

const ORDER_LEGAL_VERSION = "2026-08-17";

function isEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getRequiredString(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function hasRequiredConfirmations(data: Record<string, unknown>) {
  const confirmations = data.confirmations;

  if (
    !confirmations ||
    typeof confirmations !== "object" ||
    Array.isArray(confirmations)
  ) {
    return false;
  }

  const values = confirmations as Record<string, unknown>;

  return (
    values.manual === true &&
    values.copy === true &&
    values.refunds === true &&
    values.waiver === true
  );
}

function validate(type: FormType, data: Record<string, unknown>) {
  const name = getRequiredString(data, "name");
  const email = data.email;

  if (!name) return "El nombre es obligatorio.";
  if (!isEmail(email)) return "Necesito un email válido para poder continuar.";

  if (type === "contact") {
    if (!getRequiredString(data, "subject")) return "El asunto es obligatorio.";
    if (!getRequiredString(data, "message")) return "El mensaje es obligatorio.";
    if (data.privacyAccepted !== true) return "Debes aceptar la Política de privacidad para poder enviar el mensaje.";
  }

  if (type === "tracking_order" || type === "inventory_order") {
    if (!hasRequiredConfirmations(data)) {
      return "Debes aceptar todas las condiciones obligatorias antes de enviar el pedido.";
    }
  }

  if (type === "tracking_order") {
    if (!getRequiredString(data, "paymentMethod")) return "Selecciona un método de pago.";
    if (typeof data.total !== "number" || data.total <= 0) return "El pedido no tiene un importe válido.";
  }

  if (type === "inventory_order") {
    if (!getRequiredString(data, "paymentMethod")) return "Selecciona un método de pago.";
    if (typeof data.total !== "number" || data.total <= 0) return "El pedido no tiene un importe válido.";
  }

  return null;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  const secret = process.env.FORMS_SHARED_SECRET;

  if (!webhookUrl || !secret) {
    return NextResponse.json(
      {
        ok: false,
        error: "El formulario todavía no está configurado en el servidor. Revisa las variables GOOGLE_APPS_SCRIPT_WEBHOOK_URL y FORMS_SHARED_SECRET en Netlify.",
      },
      { status: 500 },
    );
  }

  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "No he podido leer los datos enviados." }, { status: 400 });
  }

  const type = body.type;
  const data = body.data;

  if (!type || !data || (type !== "contact" && type !== "tracking_order" && type !== "inventory_order")) {
    return NextResponse.json({ ok: false, error: "La solicitud no tiene un formato válido." }, { status: 400 });
  }

  const validationError = validate(type, data);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const dataForUpstream =
    type === "tracking_order" || type === "inventory_order"
      ? {
          ...data,
          legalVersion: ORDER_LEGAL_VERSION,
        }
      : data;

  const payload = {
    secret,
    source: "bordando-con-fru-web",
    submittedAt: new Date().toISOString(),
    type,
    data: dataForUpstream,
  };

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No he podido conectar con el sistema de Google. Inténtalo de nuevo dentro de unos minutos." },
      { status: 502 },
    );
  }

  let upstreamData: { ok?: boolean; error?: string; reference?: string } = {};
  try {
    upstreamData = (await upstreamResponse.json()) as { ok?: boolean; error?: string; reference?: string };
  } catch {
    // ignore parsing issues and use generic error below
  }

  if (!upstreamResponse.ok || upstreamData.ok === false) {
    return NextResponse.json(
      { ok: false, error: upstreamData.error || "Google ha recibido la petición, pero no ha podido procesarla correctamente." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference: upstreamData.reference ?? null });
}
