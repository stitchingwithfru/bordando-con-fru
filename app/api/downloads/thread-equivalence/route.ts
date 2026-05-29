import { createHmac, timingSafeEqual } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FILE_NAME = "guia-equivalencias-hilos-punto-cruz.pdf";

function getSecret() {
  const secret = process.env.DOWNLOAD_SIGNING_SECRET;

  if (!secret) {
    throw new Error("Falta DOWNLOAD_SIGNING_SECRET.");
  }

  return secret;
}

function createSignature(expires: string) {
  return createHmac("sha256", getSecret())
    .update(`thread-equivalence:${expires}`)
    .digest("hex");
}

function hexToUint8Array(hex: string) {
  return new Uint8Array(Buffer.from(hex, "hex"));
}

function isValidSignature(expires: string, signature: string) {
  const expected = createSignature(expires);

  const expectedBytes = hexToUint8Array(expected);
  const receivedBytes = hexToUint8Array(signature);

  if (expectedBytes.length !== receivedBytes.length) {
    return false;
  }

  return timingSafeEqual(expectedBytes, receivedBytes);
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const expires = url.searchParams.get("expires") || "";
    const signature = url.searchParams.get("signature") || "";

    if (!expires || !signature) {
      return NextResponse.json(
        { ok: false, error: "Enlace de descarga no válido." },
        { status: 400 }
      );
    }

    const expiresNumber = Number(expires);

    if (!Number.isFinite(expiresNumber) || Date.now() > expiresNumber) {
      return NextResponse.json(
        { ok: false, error: "Este enlace de descarga ha caducado." },
        { status: 403 }
      );
    }

    if (!isValidSignature(expires, signature)) {
      return NextResponse.json(
        { ok: false, error: "Firma de descarga no válida." },
        { status: 403 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "private",
      "downloads",
      FILE_NAME
    );

    const fileBuffer = await readFile(filePath);
    const fileBytes = new Uint8Array(fileBuffer);

    return new NextResponse(fileBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se ha podido descargar el archivo." },
      { status: 500 }
    );
  }
}