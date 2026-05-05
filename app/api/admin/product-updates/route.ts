import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ProductUpdateListItem = {
  id: string;
  title: string;
  version: string | null;
  published_at: string;
  created_at: string;
};

type UpdateItemInput = {
  productId: string;
  updatedTemplateUrl?: string;
  updatedPdfFilePath?: string;
  updatedVideoUrl?: string;
  notes?: string;
};

function checkAdminPassword(value: unknown) {
  const provided = String(value || "");
  const expected = process.env.ADMIN_INVITE_PASSWORD;

  return Boolean(expected && provided === expected);
}

function cleanOptionalString(value: unknown) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

function isValidResourceUrl(value: string | null) {
  if (!value) return true;

  return (
    value.startsWith("https://docs.google.com/") ||
    value.startsWith("https://drive.google.com/")
  );
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const adminPassword = url.searchParams.get("adminPassword");

    if (!checkAdminPassword(adminPassword)) {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 401 }
      );
    }

    const supabaseAdmin = createAdminClient();

    const { data: updates, error } = await supabaseAdmin
      .from("product_updates")
      .select("id, title, version, published_at, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      updates: (updates || []) as ProductUpdateListItem[],
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se han podido cargar las actualizaciones.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const adminPassword = body.adminPassword;
    const title = cleanOptionalString(body.title);
    const description = cleanOptionalString(body.description);
    const version = cleanOptionalString(body.version);
    const publishedAt = cleanOptionalString(body.publishedAt);
    const items = Array.isArray(body.items) ? (body.items as UpdateItemInput[]) : [];

    if (!checkAdminPassword(adminPassword)) {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 401 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Falta el título de la actualización." },
        { status: 400 }
      );
    }

    if (!items.length) {
      return NextResponse.json(
        { ok: false, error: "Selecciona al menos un producto afectado." },
        { status: 400 }
      );
    }

    const normalizedItems = items
      .map((item, index) => ({
        productId: cleanOptionalString(item.productId),
        updatedTemplateUrl: cleanOptionalString(item.updatedTemplateUrl),
        updatedPdfFilePath: cleanOptionalString(item.updatedPdfFilePath),
        updatedVideoUrl: cleanOptionalString(item.updatedVideoUrl),
        notes: cleanOptionalString(item.notes),
        sortOrder: index + 1,
      }))
      .filter((item) => item.productId);

    if (!normalizedItems.length) {
      return NextResponse.json(
        { ok: false, error: "No hay productos válidos en la actualización." },
        { status: 400 }
      );
    }

    const invalidUrlItem = normalizedItems.find(
      (item) =>
        !isValidResourceUrl(item.updatedTemplateUrl) ||
        !isValidResourceUrl(item.updatedVideoUrl)
    );

    if (invalidUrlItem) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Revisa los enlaces. Las plantillas deben ser de Google Sheets y los vídeos de Google Drive.",
        },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    const { data: createdUpdate, error: updateError } = await supabaseAdmin
      .from("product_updates")
      .insert({
        title,
        description,
        version,
        published_at: publishedAt || new Date().toISOString().slice(0, 10),
        is_visible: true,
      })
      .select("id")
      .single();

    if (updateError || !createdUpdate) {
      return NextResponse.json(
        {
          ok: false,
          error: updateError?.message || "No se ha podido crear la actualización.",
        },
        { status: 500 }
      );
    }

    const updateId = createdUpdate.id as string;

    const updateItemsPayload = normalizedItems.map((item) => ({
      update_id: updateId,
      product_id: item.productId,
      updated_template_url: item.updatedTemplateUrl,
      updated_pdf_file_path: item.updatedPdfFilePath,
      updated_video_url: item.updatedVideoUrl,
      notes: item.notes,
      sort_order: item.sortOrder,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("product_update_items")
      .insert(updateItemsPayload);

    if (itemsError) {
      await supabaseAdmin.from("product_updates").delete().eq("id", updateId);

      return NextResponse.json(
        { ok: false, error: itemsError.message },
        { status: 500 }
      );
    }

    for (const item of normalizedItems) {
      if (!item.productId) continue;

      if (item.updatedTemplateUrl) {
        const { error } = await supabaseAdmin
          .from("product_resources")
          .update({
            url: item.updatedTemplateUrl,
            version,
          })
          .eq("product_id", item.productId)
          .eq("type", "google_sheet_copy");

        if (error) {
          return NextResponse.json(
            {
              ok: false,
              error: `Actualización creada, pero no se pudo actualizar la plantilla: ${error.message}`,
            },
            { status: 500 }
          );
        }
      }

      if (item.updatedPdfFilePath) {
        const { error } = await supabaseAdmin
          .from("product_resources")
          .update({
            file_path: item.updatedPdfFilePath,
            version,
          })
          .eq("product_id", item.productId)
          .eq("type", "pdf");

        if (error) {
          return NextResponse.json(
            {
              ok: false,
              error: `Actualización creada, pero no se pudo actualizar el PDF: ${error.message}`,
            },
            { status: 500 }
          );
        }
      }

      if (item.updatedVideoUrl) {
        const { error } = await supabaseAdmin
          .from("product_resources")
          .update({
            url: item.updatedVideoUrl,
            version,
          })
          .eq("product_id", item.productId)
          .eq("type", "video");

        if (error) {
          return NextResponse.json(
            {
              ok: false,
              error: `Actualización creada, pero no se pudo actualizar el vídeo: ${error.message}`,
            },
            { status: 500 }
          );
        }
      }

      if (version) {
        const { error } = await supabaseAdmin
          .from("products")
          .update({
            current_version: version,
          })
          .eq("id", item.productId);

        if (error) {
          return NextResponse.json(
            {
              ok: false,
              error: `Actualización creada, pero no se pudo actualizar la versión del producto: ${error.message}`,
            },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Actualización creada y recursos principales actualizados.",
      updateId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se ha podido crear la actualización.",
      },
      { status: 500 }
    );
  }
}