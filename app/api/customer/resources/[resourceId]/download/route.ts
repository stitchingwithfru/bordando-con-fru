import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    resourceId: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  const supabase = await createClient();
  const { resourceId } = await context.params;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(new URL("/acceso-clientes", request.url));
  }

  const { data: resource, error: resourceError } = await supabase
    .from("product_resources")
    .select("id, type, label, file_path, product_id")
    .eq("id", resourceId)
    .eq("type", "pdf")
    .single();

  if (resourceError || !resource || !resource.file_path) {
    return NextResponse.json(
      { ok: false, error: "No se ha encontrado el recurso solicitado." },
      { status: 404 }
    );
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("product-files")
    .createSignedUrl(resource.file_path, 60);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    return NextResponse.json(
      { ok: false, error: "No se ha podido generar el enlace de descarga." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(signedUrlData.signedUrl);
}