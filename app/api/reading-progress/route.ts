import { NextResponse } from "next/server";

type ReadingProgressPayload = {
  lectura_id?: string;
  pagina_actual?: number | string;
  porcentaje_actual?: number | string;
  estado?: string;
  nota?: string;
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

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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

    const body = (await request.json()) as ReadingProgressPayload;

    const lectura_id = String(body.lectura_id || "").trim();
    const estado = String(body.estado || "").trim().toLowerCase();
    const nota = String(body.nota || "").trim();

    const pagina_actual =
      body.pagina_actual === "" || body.pagina_actual == null
        ? ""
        : Number(body.pagina_actual);

    const porcentaje_actual =
      body.porcentaje_actual === "" || body.porcentaje_actual == null
        ? ""
        : Number(body.porcentaje_actual);

    if (!lectura_id) {
      return NextResponse.json(
        { ok: false, error: "Selecciona una lectura." },
        { status: 400 }
      );
    }

    if (!["leyendo", "pausado", "terminado", "abandonado"].includes(estado)) {
      return NextResponse.json(
        { ok: false, error: "Selecciona un estado válido." },
        { status: 400 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        secret: sharedSecret,
        type: "reading_progress",
        submittedAt: getMadridDateTime(),
        data: {
          lectura_id,
          pagina_actual,
          porcentaje_actual,
          estado,
          nota,
        },
      }),
    });

    const text = await response.text();

    let result: { ok?: boolean; error?: string; reference?: string };

    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Respuesta no válida de Apps Script." },
        { status: 502 }
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || "No se pudo guardar el progreso." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      reference: result.reference || "",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false, error: "Error interno al guardar el progreso." },
      { status: 500 }
    );
  }
}