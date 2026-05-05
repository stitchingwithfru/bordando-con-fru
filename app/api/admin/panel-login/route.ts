import { NextResponse } from "next/server";
import {
  ADMIN_PANEL_COOKIE,
  getAdminPanelPassword,
  getAdminPanelToken,
} from "@/lib/admin-panel-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password || "");
    const expectedPassword = getAdminPanelPassword();

    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json(
        { ok: false, error: "Clave incorrecta." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      message: "Panel desbloqueado.",
    });

    response.cookies.set({
      name: ADMIN_PANEL_COOKIE,
      value: getAdminPanelToken(),
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se ha podido desbloquear el panel." },
      { status: 500 }
    );
  }
}