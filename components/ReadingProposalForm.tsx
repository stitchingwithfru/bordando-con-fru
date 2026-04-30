"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ReadingProposalForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: String(formData.get("title") || "").trim(),
      author: String(formData.get("author") || "").trim(),
      genre: String(formData.get("genre") || "").trim(),
      reason: String(formData.get("reason") || "").trim(),
    };

    if (!payload.title || !payload.author || !payload.genre || !payload.reason) {
      setState("error");
      setError("Completa todos los campos antes de enviar la propuesta.");
      return;
    }

    setState("sending");
    setError("");

    try {
      const response = await fetch("/api/reading-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se pudo enviar la propuesta.");
      }

      form.reset();
      setState("success");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "No se pudo enviar la propuesta.");
    }
  }

  return (
    <>
      <style>
        {`
          .proposal-card {
            max-width: 980px;
            margin: 72px auto 56px auto;
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
          }

          .proposal-header {
            display: grid;
            grid-template-columns: 64px 1fr;
            gap: 18px;
            align-items: start;
            margin-bottom: 24px;
          }

          .proposal-icon {
            width: 64px;
            height: 64px;
            border-radius: 22px;
            background: #F3ECE7;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
          }

          .proposal-kicker {
            display: inline-flex;
            background: #E9F0E6;
            color: #5E755C;
            border-radius: 999px;
            padding: 7px 13px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .proposal-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1.12;
            color: #403A36;
          }

          .proposal-text {
            margin: 0;
            color: #6F655F;
            font-size: 16px;
            line-height: 1.7;
            max-width: 760px;
          }

          .proposal-form {
            display: grid;
            gap: 16px;
          }

          .proposal-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          .proposal-field label {
            display: block;
            margin-bottom: 7px;
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .proposal-field input,
          .proposal-field textarea {
            width: 100%;
            border: 1px solid #E8DED8;
            background: #F7F3EE;
            border-radius: 18px;
            padding: 13px 14px;
            color: #403A36;
            font-size: 15px;
            outline: none;
          }

          .proposal-field textarea {
            min-height: 130px;
            resize: vertical;
          }

          .proposal-field input:focus,
          .proposal-field textarea:focus {
            border-color: #D8B7B0;
            box-shadow: 0 0 0 3px rgba(216, 183, 176, 0.22);
          }

          .proposal-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            border: 0;
            background: #403A36;
            color: #FFFFFF;
            border-radius: 999px;
            padding: 13px 22px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          .proposal-button:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }

          .proposal-message {
            margin: 4px 0 0 0;
            border-radius: 18px;
            padding: 13px 15px;
            font-size: 14px;
            line-height: 1.5;
          }

          .proposal-message.success {
            background: #E9F0E6;
            color: #4D6249;
          }

          .proposal-message.error {
            background: #F7E7E3;
            color: #8A4F44;
          }

          @media (max-width: 700px) {
            .proposal-card {
              padding: 24px 20px;
              border-radius: 26px;
              margin-top: 56px;
              margin-bottom: 48px;
            }

            .proposal-header {
              grid-template-columns: 1fr;
              text-align: center;
            }

            .proposal-icon {
              margin: 0 auto;
              width: 58px;
              height: 58px;
              font-size: 28px;
            }

            .proposal-title {
              font-size: 29px;
            }

            .proposal-text {
              font-size: 15.5px;
            }

            .proposal-grid {
              grid-template-columns: 1fr;
            }

            .proposal-button {
              width: 100%;
            }
          }
        `}
      </style>

      <section className="proposal-card">
        <div className="proposal-header">
          <div className="proposal-icon">💡</div>

          <div>
            <div className="proposal-kicker">Propuestas de lectura</div>
            <h2 className="proposal-title">Propón una lectura para el Club</h2>
            <p className="proposal-text">
              Puedes sugerir libros para futuras lecturas conjuntas. Las propuestas podrán tenerse en cuenta para preparar próximas encuestas en Telegram.
            </p>
          </div>
        </div>

        <form className="proposal-form" onSubmit={handleSubmit}>
          <div className="proposal-grid">
            <div className="proposal-field">
              <label htmlFor="proposal-title">Título del libro</label>
              <input id="proposal-title" name="title" type="text" />
            </div>

            <div className="proposal-field">
              <label htmlFor="proposal-author">Autor/a</label>
              <input id="proposal-author" name="author" type="text" />
            </div>
          </div>

          <div className="proposal-field">
            <label htmlFor="proposal-genre">Género</label>
            <input id="proposal-genre" name="genre" type="text" placeholder="Ej. fantasía, romántica, thriller..." />
          </div>

          <div className="proposal-field">
            <label htmlFor="proposal-reason">¿Por qué propones esta lectura?</label>
            <textarea id="proposal-reason" name="reason" />
          </div>

          <button className="proposal-button" type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Enviando..." : "Enviar propuesta"}
          </button>

          {state === "success" ? (
            <p className="proposal-message success">
              Propuesta enviada correctamente. ¡Gracias por aportar ideas para el Club!
            </p>
          ) : null}

          {state === "error" ? (
            <p className="proposal-message error">{error}</p>
          ) : null}
        </form>
      </section>
    </>
  );
}