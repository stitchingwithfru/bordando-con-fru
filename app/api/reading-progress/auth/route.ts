import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const password = process.env.READING_PROGRESS_PASSWORD;

    if (!password) {
      return NextResponse.json(
        { ok: false, error: "Falta la contraseña de configuración." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const submittedPassword = String(body.password || "").trim();

    if (!submittedPassword) {
      return NextResponse.json(
        { ok: false, error: "Introduce la clave de acceso." },
        { status: 400 }
      );
    }

    if (submittedPassword !== password) {
      return NextResponse.json(
        { ok: false, error: "Clave incorrecta." },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error interno al comprobar la clave." },
      { status: 500 }
    );
  }
}