import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 401 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    const senderEmail =
      process.env.UPDATE_EMAIL_SENDER || "soporte@stitchingwithfru.com";
    const senderName =
      process.env.UPDATE_EMAIL_SENDER_NAME || "Bordando con Fru";

    if (!brevoApiKey) {
      return NextResponse.json(
        { ok: false, error: "Falta BREVO_API_KEY." },
        { status: 500 }
      );
    }

    if (!adminEmail) {
      return NextResponse.json(
        { ok: false, error: "Falta ADMIN_NOTIFICATION_EMAIL." },
        { status: 500 }
      );
    }

    const siteUrl = getSiteUrl();

    const subject = "Una clienta ha creado su contraseña";

    const html = `
      <div style="font-family: Arial, sans-serif; color: #403A36; line-height: 1.6; max-width: 620px;">
        <h2 style="font-family: Georgia, serif; color: #403A36;">
          Nueva contraseña creada
        </h2>

        <p>
          Una clienta ha creado correctamente su contraseña para acceder a su zona privada.
        </p>

        <div style="background:#F7F3EE; border:1px solid #E8DED8; border-radius:18px; padding:16px; margin:20px 0;">
          <p style="margin:0 0 8px 0;">
            <strong>Email:</strong> ${user.email}
          </p>

          <p style="margin:0;">
            <strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}
          </p>
        </div>

        <p>
          Puedes revisar sus accesos desde el panel de gestión:
        </p>

        <p>
          <a href="${siteUrl}/admin-clientes" style="display:inline-block;background:#403A36;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:bold;">
            Ir a Gestión
          </a>
        </p>
      </div>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: adminEmail,
          },
        ],
        subject,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: errorText || "No se ha podido enviar el aviso.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Aviso enviado correctamente.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se ha podido enviar el aviso.",
      },
      { status: 500 }
    );
  }
}