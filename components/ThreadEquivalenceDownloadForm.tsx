"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

const DOWNLOAD_URL = "";

export default function ThreadEquivalenceDownloadForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(DOWNLOAD_URL);
  const hasAutoDownloadedRef = useRef(false);

  useEffect(() => {
    if (state !== "success" || !downloadUrl || hasAutoDownloadedRef.current) {
        return;
    }

    hasAutoDownloadedRef.current = true;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }, [state, downloadUrl]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      marketingAccepted: formData.get("marketingAccepted") === "on",
      source: "articulo_organizar_hilos",
    };

    if (!payload.email) {
      setState("error");
      setError("Introduce tu email para descargar la guía.");
      return;
    }

    setState("sending");
    setError("");
    hasAutoDownloadedRef.current = false;

    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se ha podido preparar la descarga.");
      }

      setDownloadUrl(result.downloadUrl || DOWNLOAD_URL);
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error
          ? err.message
          : "No se ha podido preparar la descarga."
      );
    }
  }

  return (
    <>
      <style>
        {`
          .thread-download-card {
            background: linear-gradient(135deg, #FFF7EF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
          }

          .thread-download-kicker {
            display: inline-flex;
            align-items: center;
            background: #E9F0E6;
            color: #4D6249;
            border-radius: 999px;
            padding: 7px 13px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 14px;
          }

          .thread-download-title {
            margin: 0 0 12px 0;
            font-family: Georgia, serif;
            font-size: 30px;
            line-height: 1.12;
            color: #403A36;
          }

          .thread-download-text {
            margin: 0;
            color: #6F655F;
            font-size: 16px;
            line-height: 1.7;
          }

          .thread-download-list {
            display: grid;
            gap: 10px;
            margin: 18px 0 22px 0;
          }

          .thread-download-list p {
            margin: 0;
            color: #6F655F;
            font-size: 15px;
            line-height: 1.55;
          }

          .thread-download-form {
            display: grid;
            gap: 14px;
            margin-top: 20px;
          }

          .thread-download-field {
            display: grid;
            gap: 7px;
          }

          .thread-download-field label {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .thread-download-input {
            width: 100%;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            background: #FFFFFF;
            color: #403A36;
            padding: 13px 14px;
            font-size: 16px;
            outline: none;
          }

          .thread-download-input:focus {
            border-color: #D8B7B0;
            box-shadow: 0 0 0 3px rgba(216, 183, 176, 0.22);
          }

          .thread-download-checkbox {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            color: #6F655F;
            font-size: 14px;
            line-height: 1.45;
          }

          .thread-download-checkbox input {
            margin-top: 3px;
          }

          .thread-download-legal {
            margin: 0;
            color: #8A7C74;
            font-size: 12.5px;
            line-height: 1.55;
          }

          .thread-download-legal a {
            color: #403A36;
            font-weight: 700;
            text-decoration: underline;
            text-underline-offset: 3px;
          }

          .thread-download-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 999px;
            background: #403A36;
            color: #FFFFFF;
            padding: 13px 22px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          .thread-download-button:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }

          .thread-download-message {
            border-radius: 18px;
            padding: 13px 15px;
            font-size: 14px;
            line-height: 1.5;
          }

          .thread-download-message.success {
            background: #E9F0E6;
            color: #4D6249;
          }

          .thread-download-message.error {
            background: #F7E4E1;
            color: #8A3C35;
          }

          .thread-download-direct-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            border-radius: 999px;
            background: #403A36;
            color: #FFFFFF;
            padding: 13px 22px;
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
            margin-top: 14px;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          @media (max-width: 600px) {
            .thread-download-card {
              border-radius: 26px;
              padding: 24px 20px;
            }

            .thread-download-title {
              font-size: 27px;
            }

            .thread-download-button,
            .thread-download-direct-link {
              width: 100%;
            }
          }
        `}
      </style>

      <section className="thread-download-card">
        <div className="thread-download-kicker">
          Recurso gratuito
        </div>

        <h2 className="thread-download-title">
          Descarga la guía de equivalencias de hilos
        </h2>

        <p className="thread-download-text">
          Recibe gratis una guía en PDF con equivalencias orientativas para punto de cruz,
          pensada para tener una referencia rápida cuando prepares tus proyectos.
        </p>

        <div className="thread-download-list">
          <p>• Equivalencias DMC ↔ Anchor.</p>
          <p>• Equivalencias Kreinik ↔ Petite Treasure Braid.</p>
          <p>• Consejos para sustituir hilos.</p>
          <p>• Checklist antes de cambiar una marca por otra.</p>
        </div>

        {state === "success" ? (
          <div className="thread-download-message success">
            <strong>¡Listo!</strong> Tu descarga se ha iniciado automáticamente.
            <br />
            Si la descarga no empieza, pulsa aquí.
            <br />
            <a
                href={downloadUrl}
                className="thread-download-direct-link"
            >
                Descargar guía en PDF →
            </a>
            </div>
        ) : (
          <form className="thread-download-form" onSubmit={handleSubmit}>
            <div className="thread-download-field">
              <label htmlFor="thread-download-name">
                Nombre, opcional
              </label>
              <input
                id="thread-download-name"
                name="name"
                type="text"
                className="thread-download-input"
                placeholder="Tu nombre"
              />
            </div>

            <div className="thread-download-field">
              <label htmlFor="thread-download-email">
                Email
              </label>
              <input
                id="thread-download-email"
                name="email"
                type="email"
                className="thread-download-input"
                placeholder="tuemail@ejemplo.com"
                required
              />
            </div>

            <label className="thread-download-checkbox">
              <input name="marketingAccepted" type="checkbox" />
              <span>
                Quiero recibir por email novedades, recursos gratuitos y nuevos contenidos de Bordando con Fru.
              </span>
            </label>

            <p className="thread-download-legal">
              Responsable: Bordando con Fru. Finalidad: enviarte el recurso solicitado y,
              si marcas la casilla, enviarte novedades y contenidos relacionados. Puedes ejercer tus derechos escribiendo a{" "}
              <a href="mailto:stitchingwithfru@gmail.com">
                stitchingwithfru@gmail.com
              </a>. Más información en la{" "}
              <Link href="/politica-privacidad">
                Política de privacidad
              </Link>.
            </p>

            <button
              className="thread-download-button"
              type="submit"
              disabled={state === "sending"}
            >
              {state === "sending" ? "Preparando descarga..." : "Descargar guía gratis"}
            </button>

            {state === "error" ? (
              <div className="thread-download-message error">
                {error}
              </div>
            ) : null}
          </form>
        )}
      </section>
    </>
  );
}