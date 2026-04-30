import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    const secret = process.env.FORMS_SHARED_SECRET;

    if (!webhookUrl || !secret) {
      return NextResponse.json(
        { ok: false, error: "Faltan variables de configuración." },
        { status: 500 }
      );
    }

    const payload = {
      secret,
      type: "reading_proposal",
      submittedAt: new Date().toISOString(),
      data: {
        title: String(body.title || "").trim(),
        author: String(body.author || "").trim(),
        genre: String(body.genre || "").trim(),
        reason: String(body.reason || "").trim(),
      },
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || "No se pudo enviar la propuesta." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Error al enviar la propuesta." },
      { status: 500 }
    );
  }
}