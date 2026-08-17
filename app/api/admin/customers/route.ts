import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type AdminAction =
  | "load"
  | "lookup"
  | "grant_access"
  | "revoke_access"
  | "save_inventory_delivery"
  | "set_inventory_delivery_status"
  | "send_invitation"
  | "send_password_recovery";

type InventoryDeliveryStatus =
  | "ready"
  | "redeemed"
  | "revoked";

const INVENTORY_VARIANTS = [
  "inventario-base",
  "inventario-base-calculadora",
  "inventario-base-kits",
  "inventario-base-kits-calculadora",
  "inventario-base-telas",
  "inventario-base-telas-calculadora",
  "inventario-base-telas-kits",
  "inventario-base-telas-kits-calculadora",
] as const;

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function checkAdminPassword(value: unknown) {
  const provided = String(value || "");
  const expected = process.env.ADMIN_INVITE_PASSWORD;

  return Boolean(expected && provided === expected);
}

function isInventoryVariant(value: string) {
  return INVENTORY_VARIANTS.includes(
    value as (typeof INVENTORY_VARIANTS)[number]
  );
}

function isInventoryDeliveryStatus(
  value: string
): value is InventoryDeliveryStatus {
  return (
    value === "ready" ||
    value === "redeemed" ||
    value === "revoked"
  );
}

async function findAuthUserByEmail(email: string) {
  const supabaseAdmin = createAdminClient();

  let page = 1;
  const perPage = 100;

  while (page <= 20) {
    const { data, error } =
      await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

    if (error) {
      throw new Error(error.message);
    }

    const found = data.users.find(
      (user) =>
        String(user.email || "").toLowerCase() === email
    );

    if (found) return found;

    if (data.users.length < perPage) return null;

    page += 1;
  }

  return null;
}

async function getInventoryDelivery(email: string) {
  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("inventory_activation_deliveries")
    .select(`
      id,
      customer_email,
      license_variant,
      activation_code,
      activation_status,
      created_at,
      updated_at,
      redeemed_at,
      notes
    `)
    .eq("customer_email", email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data || null;
}

async function getProductsAndAccesses(email?: string) {
  const supabaseAdmin = createAdminClient();

  const { data: products, error: productsError } =
    await supabaseAdmin
      .from("products")
      .select(
        "id, slug, name, current_version, is_active"
      )
      .eq("is_active", true)
      .order("name", { ascending: true });

  if (productsError) {
    throw new Error(productsError.message);
  }

  let accesses: unknown[] = [];
  let inventoryDelivery = null;

  if (email) {
    const { data: accessRows, error: accessError } =
      await supabaseAdmin
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
    inventoryDelivery =
      await getInventoryDelivery(email);
  }

  return {
    products: products || [],
    accesses,
    inventoryDelivery,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const action = String(
      body.action || ""
    ) as AdminAction;

    const adminPassword = body.adminPassword;
    const email = normalizeEmail(body.email);
    const productId = String(
      body.productId || ""
    ).trim();

    const licenseVariant = String(
      body.licenseVariant || ""
    ).trim();

    const activationCode = String(
      body.activationCode || ""
    ).trim();

    const activationStatus = String(
      body.activationStatus || ""
    ).trim();

    if (!checkAdminPassword(adminPassword)) {
      return NextResponse.json(
        {
          ok: false,
          error: "No autorizado.",
        },
        { status: 401 }
      );
    }

    const supabaseAdmin = createAdminClient();

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    if (action === "load") {
      const result = await getProductsAndAccesses();

      return NextResponse.json({
        ok: true,
        ...result,
      });
    }

    if (!email) {
      return NextResponse.json(
        {
          ok: false,
          error: "Falta el email de la clienta.",
        },
        { status: 400 }
      );
    }

    if (action === "lookup") {
      const result =
        await getProductsAndAccesses(email);

      const authUser =
        await findAuthUserByEmail(email);

      return NextResponse.json({
        ok: true,
        ...result,
        authUser: authUser
          ? {
              id: authUser.id,
              email: authUser.email,
              created_at: authUser.created_at,
              last_sign_in_at:
                authUser.last_sign_in_at,
            }
          : null,
      });
    }

    if (action === "grant_access") {
      if (!productId) {
        return NextResponse.json(
          {
            ok: false,
            error: "Selecciona un producto.",
          },
          { status: 400 }
        );
      }

      const { data: selectedProduct, error: selectedProductError } =
        await supabaseAdmin
          .from("products")
          .select("id, slug")
          .eq("id", productId)
          .eq("is_active", true)
          .maybeSingle();

      if (selectedProductError) {
        return NextResponse.json(
          {
            ok: false,
            error: selectedProductError.message,
          },
          { status: 500 }
        );
      }

      if (!selectedProduct) {
        return NextResponse.json(
          {
            ok: false,
            error: "El producto seleccionado no es válido.",
          },
          { status: 400 }
        );
      }

      if (selectedProduct.slug.startsWith("inventario-")) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Inventario Profesional ya no se asigna mediante el sistema antiguo de accesos. Utiliza el bloque específico de Inventario Profesional.",
          },
          { status: 400 }
        );
      }

      const { error } = await supabaseAdmin
        .from("customer_access")
        .upsert(
          {
            customer_email: email,
            product_id: productId,
            notes:
              "Acceso asignado desde panel admin",
          },
          {
            onConflict:
              "customer_email,product_id",
          }
        );

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }

      const result =
        await getProductsAndAccesses(email);

      return NextResponse.json({
        ok: true,
        message:
          "Acceso asignado correctamente.",
        ...result,
      });
    }

    if (action === "revoke_access") {
      if (!productId) {
        return NextResponse.json(
          {
            ok: false,
            error: "Selecciona un producto.",
          },
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
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }

      const result =
        await getProductsAndAccesses(email);

      return NextResponse.json({
        ok: true,
        message:
          "Acceso revocado correctamente.",
        ...result,
      });
    }

    if (action === "save_inventory_delivery") {
      if (!isInventoryVariant(licenseVariant)) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Selecciona una variante válida de Inventario Profesional.",
          },
          { status: 400 }
        );
      }

      const existingDelivery =
        await getInventoryDelivery(email);

      if (
        !existingDelivery &&
        !activationCode
      ) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Introduce el código de activación para preparar la entrega.",
          },
          { status: 400 }
        );
      }

      const now = new Date().toISOString();

      if (existingDelivery) {
        const codeHasChanged =
          Boolean(activationCode) &&
          activationCode !==
            existingDelivery.activation_code;

        const updatePayload: {
          license_variant: string;
          updated_at: string;
          activation_code?: string;
          activation_status?: InventoryDeliveryStatus;
          redeemed_at?: string | null;
        } = {
          license_variant: licenseVariant,
          updated_at: now,
        };

        if (codeHasChanged) {
          updatePayload.activation_code =
            activationCode;

          updatePayload.activation_status =
            "ready";

          updatePayload.redeemed_at = null;
        }

        const { error } = await supabaseAdmin
          .from(
            "inventory_activation_deliveries"
          )
          .update(updatePayload)
          .eq("id", existingDelivery.id);

        if (error) {
          return NextResponse.json(
            {
              ok: false,
              error: error.message,
            },
            { status: 500 }
          );
        }
      } else {
        const { error } = await supabaseAdmin
          .from(
            "inventory_activation_deliveries"
          )
          .insert({
            customer_email: email,
            license_variant: licenseVariant,
            activation_code: activationCode,
            activation_status: "ready",
            created_at: now,
            updated_at: now,
            redeemed_at: null,
            notes:
              "Entrega preparada desde panel admin",
          });

        if (error) {
          return NextResponse.json(
            {
              ok: false,
              error: error.message,
            },
            { status: 500 }
          );
        }
      }

      const result =
        await getProductsAndAccesses(email);

      return NextResponse.json({
        ok: true,
        message: existingDelivery
          ? "Datos de Inventario actualizados correctamente."
          : "Entrega de Inventario preparada correctamente.",
        ...result,
      });
    }

    if (
      action ===
      "set_inventory_delivery_status"
    ) {
      if (
        !isInventoryDeliveryStatus(
          activationStatus
        )
      ) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "El estado indicado no es válido.",
          },
          { status: 400 }
        );
      }

      const existingDelivery =
        await getInventoryDelivery(email);

      if (!existingDelivery) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Esta clienta todavía no tiene una entrega de Inventario preparada.",
          },
          { status: 404 }
        );
      }

      const now = new Date().toISOString();

      const updatePayload: {
        activation_status: InventoryDeliveryStatus;
        updated_at: string;
        redeemed_at?: string | null;
      } = {
        activation_status:
          activationStatus,
        updated_at: now,
      };

      if (activationStatus === "ready") {
        updatePayload.redeemed_at = null;
      }

      if (
        activationStatus === "redeemed" &&
        !existingDelivery.redeemed_at
      ) {
        updatePayload.redeemed_at = now;
      }

      const { error } = await supabaseAdmin
        .from(
          "inventory_activation_deliveries"
        )
        .update(updatePayload)
        .eq("id", existingDelivery.id);

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }

      const result =
        await getProductsAndAccesses(email);

      return NextResponse.json({
        ok: true,
        message:
          "Estado de la entrega actualizado correctamente.",
        ...result,
      });
    }

    if (action === "send_invitation") {
      const existingUser =
        await findAuthUserByEmail(email);

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

      const { data, error } =
        await supabaseAdmin.auth.admin.inviteUserByEmail(
          email,
          {
            redirectTo: `${siteUrl}/auth/confirm`,
          }
        );

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message:
          "Invitación enviada correctamente.",
        userId: data.user?.id || null,
      });
    }

    if (
      action === "send_password_recovery"
    ) {
      const existingUser =
        await findAuthUserByEmail(email);

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

      const { error } =
        await supabaseAdmin.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${siteUrl}/auth/confirm`,
          }
        );

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            error: error.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        message:
          "Email de recuperación enviado correctamente.",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Acción no reconocida.",
      },
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