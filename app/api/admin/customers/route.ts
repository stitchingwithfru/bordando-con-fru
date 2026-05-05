import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type AdminAction =
  | "load"
  | "lookup"
  | "grant_access"
  | "revoke_access"
  | "send_invitation"
  | "send_password_recovery";

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function checkAdminPassword(value: unknown) {
  const provided = String(value || "");
  const expected = process.env.ADMIN_INVITE_PASSWORD;

  return Boolean(expected && provided === expected);
}

async function findAuthUserByEmail(email: string) {
  const supabaseAdmin = createAdminClient();

  let page = 1;
  const perPage = 100;

  while (page <= 20) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw new Error(error.message);
    }

    const found = data.users.find(
      (user) => String(user.email || "").toLowerCase() === email
    );

    if (found) return found;

    if (data.users.length < perPage) return null;

    page += 1;
  }

  return null;
}

async function getProductsAndAccesses(email?: string) {
  const supabaseAdmin = createAdminClient();

  const { data: products, error: productsError } = await supabaseAdmin
    .from("products")
    .select("id, slug, name, current_version, is_active")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (productsError) {
    throw new Error(productsError.message);
  }

  let accesses: unknown[] = [];

  if (email) {
    const { data: accessRows, error: accessError } = await supabaseAdmin
      .from("customer_access")
      .select(`
        id,
        customer_email,
        product_id,
        granted_at,
        notes,
        products (
          id,
          slug,
          name,
          current_version
        )
      `)
      .eq("customer_email", email)
      .order("granted_at", { ascending: false });

    if (accessError) {
      throw new Error(accessError.message);
    }

    accesses = accessRows || [];
  }

  return {
    products: products || [],
    accesses,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const action = String(body.action || "") as AdminAction;
    const adminPassword = body.adminPassword;
    const email = normalizeEmail(body.email);
    const productId = String(body.productId || "").trim();

    if (!checkAdminPassword(adminPassword)) {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 401 }
      );
    }

    const supabaseAdmin = createAdminClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (action === "load") {
      const result = await getProductsAndAccesses();
      return NextResponse.json({ ok: true, ...result });
    }

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Falta el email de la clienta." },
        { status: 400 }
      );
    }

    if (action === "lookup") {
      const result = await getProductsAndAccesses(email);
      const authUser = await findAuthUserByEmail(email);

      return NextResponse.json({
        ok: true,
        ...result,
        authUser: authUser
          ? {
              id: authUser.id,
              email: authUser.email,
              created_at: authUser.created_at,
              last_sign_in_at: authUser.last_sign_in_at,
            }
          : null,
      });
    }

    if (action === "grant_access") {
      if (!productId) {
        return NextResponse.json(
          { ok: false, error: "Selecciona un producto." },
          { status: 400 }
        );
      }

      const { error } = await supabaseAdmin.from("customer_access").upsert(
        {
          customer_email: email,
          product_id: productId,
          notes: "Acceso asignado desde panel admin",
        },
        {
          onConflict: "customer_email,product_id",
        }
      );

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 }
        );
      }

      const result = await getProductsAndAccesses(email);

      return NextResponse.json({
        ok: true,
        message: "Acceso asignado correctamente.",
        ...result,
      });
    }

    if (action === "revoke_access") {
      if (!productId) {
        return NextResponse.json(
          { ok: false, error: "Selecciona un producto." },
          { status: 400 }
        );
      }

      const { error } = await supabaseAdmin
        .from("customer_access")
        .delete()
        .eq("customer_email", email)
        .eq("product_id", productId);

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 }
        );
      }

      const result = await getProductsAndAccesses(email);

      return NextResponse.json({
        ok: true,
        message: "Acceso revocado correctamente.",
        ...result,
      });
    }

    if (action === "send_invitation") {
      const existingUser = await findAuthUserByEmail(email);

      if (existingUser) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Este email ya tiene una cuenta creada. Usa recuperación de contraseña si necesita volver a entrar.",
          },
          { status: 400 }
        );
      }

      const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          redirectTo: `${siteUrl}/crear-contrasena`,
        }
      );

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Invitación enviada correctamente.",
        userId: data.user?.id || null,
      });
    }

    if (action === "send_password_recovery") {
      const existingUser = await findAuthUserByEmail(email);

      if (!existingUser) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Este email todavía no tiene cuenta. Envía primero una invitación.",
          },
          { status: 400 }
        );
      }

      const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/crear-contrasena`,
      });

      if (error) {
        return NextResponse.json(
          { ok: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Email de recuperación enviado correctamente.",
      });
    }

    return NextResponse.json(
      { ok: false, error: "Acción no reconocida." },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se ha podido completar la acción.",
      },
      { status: 500 }
    );
  }
}