import { createHmac } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DOWNLOAD_TTL_MS = 15 * 60 * 1000;

type LeadMagnetPayload = {
  name?: string;
  email?: string;
  source?: string;
  marketingAccepted?: boolean;
};

function getMadridDateTime() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value || "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")} ${getPart(
    "hour"
  )}:${getPart("minute")}:${getPart("second")}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getDownloadSigningSecret() {
  const secret = process.env.DOWNLOAD_SIGNING_SECRET;

  if (!secret) {
    throw new Error("Falta DOWNLOAD_SIGNING_SECRET.");
  }

  return secret;
}

function createTemporaryDownloadUrl() {
  const expires = String(Date.now() + DOWNLOAD_TTL_MS);

  const signature = createHmac("sha256", getDownloadSigningSecret())
    .update(`thread-equivalence:${expires}`)
    .digest("hex");

  return `/api/downloads/thread-equivalence?expires=${expires}&signature=${signature}`;
}

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    const sharedSecret = process.env.FORMS_SHARED_SECRET;

    if (!webhookUrl || !sharedSecret) {
      return NextResponse.json(
        { ok: false, error: "Faltan variables de configuración." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as LeadMagnetPayload;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const source = String(
      body.source || "lead_magnet_equivalencias_hilos"
    ).trim();
    const marketingAccepted = Boolean(body.marketingAccepted);

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Introduce tu email para descargar la guía." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Introduce un email válido." },
        { status: 400 }
      );
    }

    const downloadUrl = createTemporaryDownloadUrl();

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        secret: sharedSecret,
        type: "lead_magnet",
        submittedAt: getMadridDateTime(),
        data: {
          name,
          email,
          source,
          marketingAccepted,
          resource: "Guía de equivalencias de hilos para punto de cruz",
          downloadUrl,
        },
      }),
    });

    const text = await response.text();

    let result: { ok?: boolean; error?: string; reference?: string };

    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Respuesta no válida del servidor." },
        { status: 502 }
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error || "No se ha podido guardar la solicitud.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      reference: result.reference || "",
      downloadUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Error interno al preparar la descarga.",
      },
      { status: 500 }
    );
  }
}