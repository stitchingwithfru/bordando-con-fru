import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const MANUAL_FILE_PATH =
  "inventario-profesional/MANUAL_DE_CLIENTA_v1.0.0.pdf";

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(
      new URL("/acceso-clientes", request.url)
    );
  }

  /*
   * inventory_activation_deliveries tiene RLS:
   * la clienta autenticada solo puede ver su propia entrega.
   *
   * Por tanto, si esta consulta devuelve una fila,
   * sabemos que esa cuenta de Mi espacio tiene
   * Inventario Profesional asignado.
   */
  const {
    data: inventoryDelivery,
    error: deliveryError,
  } = await supabase
    .from("inventory_activation_deliveries")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (deliveryError) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No se ha podido comprobar el acceso al manual.",
      },
      { status: 500 }
    );
  }

  if (!inventoryDelivery) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No tienes acceso al manual de Inventario Profesional.",
      },
      { status: 403 }
    );
  }

  /*
   * Una vez autorizado el usuario mediante la tabla
   * de entregas, el servidor genera una URL temporal
   * del archivo privado.
   */
  const supabaseAdmin = createAdminClient();

  const {
    data: signedUrlData,
    error: signedUrlError,
  } = await supabaseAdmin.storage
    .from("product-files")
    .createSignedUrl(
      MANUAL_FILE_PATH,
      60,
      {
        download: true,
      }
    );

  if (
    signedUrlError ||
    !signedUrlData?.signedUrl
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No se ha podido generar el enlace de descarga del manual.",
      },
      { status: 500 }
    );
  }

  return NextResponse.redirect(
    signedUrlData.signedUrl
  );
}