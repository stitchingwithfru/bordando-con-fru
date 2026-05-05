import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type NotifyAction = "preview" | "send";

function checkAdminPassword(value: unknown) {
  const provided = String(value || "");
  const expected = process.env.ADMIN_INVITE_PASSWORD;

  return Boolean(expected && provided === expected);
}

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

function buildUpdateEmail({
  title,
  description,
  version,
}: {
  title: string;
  description: string | null;
  version: string | null;
}) {
  const siteUrl = getSiteUrl();

  const subject = version
    ? `Actualización disponible: ${title} · v${version}`
    : `Actualización disponible: ${title}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #403A36; line-height: 1.6; max-width: 620px;">
      <h2 style="font-family: Georgia, serif; color: #403A36;">
        Nueva actualización disponible
      </h2>

      <p>
        Hola,
      </p>

      <p>
        Hay una actualización disponible para uno de los productos digitales que tienes asociados a tu cuenta de
        <strong>Bordando con Fru</strong>.
      </p>

      <div style="background:#F7F3EE; border:1px solid #E8DED8; border-radius:18px; padding:16px; margin:20px 0;">
        <p style="margin:0 0 8px 0; font-weight:bold;">
          ${title}
        </p>

        ${
          version
            ? `<p style="margin:0 0 8px 0;">Versión: <strong>${version}</strong></p>`
            : ""
        }

        ${
          description
            ? `<p style="margin:0;">${description}</p>`
            : ""
        }
      </div>

      <p>
        Puedes entrar en tu zona privada para consultar los recursos actualizados y el historial de cambios.
      </p>

      <p>
        <a href="${siteUrl}/acceso-clientes" style="display:inline-block;background:#403A36;color:#ffffff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:bold;">
          Ir a mi espacio
        </a>
      </p>

      <p>
        Si el botón no funciona, copia y pega este enlace en tu navegador:
      </p>

      <p>
        <a href="${siteUrl}/acceso-clientes">${siteUrl}/acceso-clientes</a>
      </p>

      <p>
        Gracias,<br />
        Bordando con Fru
      </p>
    </div>
  `;

  return { subject, html };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const adminPassword = body.adminPassword;
    const updateId = String(body.updateId || "").trim();
    const action = String(body.action || "") as NotifyAction;

    if (!checkAdminPassword(adminPassword)) {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 401 }
      );
    }

    if (!updateId) {
      return NextResponse.json(
        { ok: false, error: "Falta la actualización." },
        { status: 400 }
      );
    }

    if (action !== "preview" && action !== "send") {
      return NextResponse.json(
        { ok: false, error: "Acción no reconocida." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    const { data: update, error: updateError } = await supabaseAdmin
      .from("product_updates")
      .select("id, title, description, version, published_at, is_visible")
      .eq("id", updateId)
      .single();

    if (updateError || !update) {
      return NextResponse.json(
        {
          ok: false,
          error: updateError?.message || "No se ha encontrado la actualización.",
        },
        { status: 404 }
      );
    }

    const { data: updateItems, error: itemsError } = await supabaseAdmin
      .from("product_update_items")
      .select("product_id")
      .eq("update_id", updateId);

    if (itemsError) {
      return NextResponse.json(
        { ok: false, error: itemsError.message },
        { status: 500 }
      );
    }

    const productIds = Array.from(
      new Set((updateItems || []).map((item) => item.product_id).filter(Boolean))
    );

    if (!productIds.length) {
      return NextResponse.json(
        {
          ok: false,
          error: "Esta actualización no tiene productos afectados.",
        },
        { status: 400 }
      );
    }

    const { data: accessRows, error: accessError } = await supabaseAdmin
      .from("customer_access")
      .select("customer_email")
      .in("product_id", productIds);

    if (accessError) {
      return NextResponse.json(
        { ok: false, error: accessError.message },
        { status: 500 }
      );
    }

    const allRecipients = Array.from(
      new Set((accessRows || []).map((row) => normalizeEmail(row.customer_email)).filter(Boolean))
    );

    const { data: sentRows, error: sentError } = await supabaseAdmin
      .from("customer_update_notifications")
      .select("customer_email, sent_at")
      .eq("update_id", updateId);

    if (sentError) {
      return NextResponse.json(
        { ok: false, error: sentError.message },
        { status: 500 }
      );
    }

    const alreadySentEmails = new Set(
      (sentRows || []).map((row) => normalizeEmail(row.customer_email))
    );

    const pendingRecipients = allRecipients.filter(
      (email) => !alreadySentEmails.has(email)
    );

    if (action === "preview") {
      return NextResponse.json({
        ok: true,
        update,
        totalRecipients: allRecipients.length,
        alreadySentCount: alreadySentEmails.size,
        pendingCount: pendingRecipients.length,
        recipients: allRecipients,
        pendingRecipients,
      });
    }

    if (!pendingRecipients.length) {
      return NextResponse.json({
        ok: true,
        message: "No hay destinatarias pendientes para esta actualización.",
        sentCount: 0,
        skippedCount: allRecipients.length,
      });
    }

    const { subject, html } = buildUpdateEmail({
      title: update.title,
      description: update.description,
      version: update.version,
    });

    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.UPDATE_EMAIL_SENDER || "soporte@stitchingwithfru.com";
    const senderName = process.env.UPDATE_EMAIL_SENDER_NAME || "Bordando con Fru";

    if (!brevoApiKey) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Falta BREVO_API_KEY en variables de entorno. Añádela para enviar avisos de actualización.",
        },
        { status: 500 }
      );
    }

    let sentCount = 0;
    const failedRecipients: { email: string; error: string }[] = [];

    for (const email of pendingRecipients) {
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
              email,
            },
          ],
          subject,
          htmlContent: html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        failedRecipients.push({
          email,
          error: errorText || "Error desconocido al enviar email.",
        });
        continue;
      }

      const { error: insertError } = await supabaseAdmin
        .from("customer_update_notifications")
        .insert({
          update_id: updateId,
          customer_email: email,
        });

      if (insertError) {
        failedRecipients.push({
          email,
          error: insertError.message,
        });
        continue;
      }

      sentCount += 1;
    }

    return NextResponse.json({
      ok: failedRecipients.length === 0,
      message:
        failedRecipients.length === 0
          ? "Avisos enviados correctamente."
          : "Algunos avisos no se han podido enviar.",
      sentCount,
      failedCount: failedRecipients.length,
      failedRecipients,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se ha podido procesar el aviso.",
      },
      { status: 500 }
    );
  }
}