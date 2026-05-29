"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreatePasswordForm() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setHasSession(false);
        setMessage(
          "El enlace no es válido, ha caducado o ya se ha utilizado. Solicita un nuevo enlace desde Mi espacio."
        );
        setIsReady(true);
        return;
      }

      setHasSession(true);
      setIsReady(true);
    }

    checkSession();
  }, [supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasSession) return;

    setMessage("");

    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== repeatPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(`No se ha podido guardar la contraseña: ${error.message}`);
      setIsLoading(false);
      return;
    }

    await fetch("/api/admin/customer-password-created", {
      method: "POST",
    }).catch(() => {
      // La contraseña ya está creada. Si falla el aviso interno, no bloqueamos a la clienta.
    });

    router.push("/mi-cuenta");
    router.refresh();
  }

  return (
    <>
      <style>
        {`
          .create-password-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
          }

          .create-password-header {
            text-align: center;
            margin-bottom: 24px;
          }

          .create-password-kicker {
            display: inline-flex;
            align-items: center;
            background: #F3ECE7;
            color: #5f544f;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 14px;
          }

          .create-password-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 36px;
            line-height: 1.1;
            color: #403A36;
          }

          .create-password-text {
            margin: 0;
            color: #6F655F;
            font-size: 15.5px;
            line-height: 1.6;
          }

          .create-password-form {
            display: grid;
            gap: 16px;
          }

          .create-password-field {
            display: grid;
            gap: 7px;
          }

          .create-password-label {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .create-password-input {
            width: 100%;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            background: #FFFFFF;
            color: #403A36;
            padding: 13px 14px;
            font-size: 16px;
            outline: none;
          }

          .create-password-button {
            border: 0;
            border-radius: 999px;
            background: #403A36;
            color: #FFFFFF;
            padding: 14px 20px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          .create-password-button:disabled {
            opacity: 0.55;
            cursor: not-allowed;
          }

          .create-password-message {
            background: #F7E4E1;
            color: #8A3C35;
            border-radius: 18px;
            padding: 12px 14px;
            font-size: 14px;
            line-height: 1.45;
          }

          .create-password-help {
            margin-top: 18px;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
            color: #6F655F;
            font-size: 13.5px;
            line-height: 1.55;
          }

          .create-password-help p {
            margin: 0;
          }

          .create-password-help p + p {
            margin-top: 8px;
          }

          .create-password-help a {
            color: #403A36;
            font-weight: 700;
          }

          @media (max-width: 600px) {
            .create-password-card {
              border-radius: 26px;
              padding: 24px 20px;
            }

            .create-password-title {
              font-size: 31px;
            }
          }
        `}
      </style>

      <section className="create-password-card">
        <div className="create-password-header">
          <div className="create-password-kicker">🔐 Acceso seguro</div>

          <h1 className="create-password-title">
            Crea tu contraseña
          </h1>

          <p className="create-password-text">
            Define una contraseña para entrar a tu espacio privado y consultar tus recursos digitales siempre que lo necesites.
          </p>
        </div>

        {!isReady ? (
          <p className="create-password-text">Comprobando enlace...</p>
        ) : hasSession ? (
          <form className="create-password-form" onSubmit={handleSubmit}>
            <div className="create-password-field">
              <label className="create-password-label" htmlFor="password">
                Nueva contraseña
              </label>
              <input
                id="password"
                className="create-password-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="create-password-field">
              <label className="create-password-label" htmlFor="repeatPassword">
                Repetir nueva contraseña
              </label>
              <input
                id="repeatPassword"
                className="create-password-input"
                type="password"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {message ? <div className="create-password-message">{message}</div> : null}

            <button className="create-password-button" type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar contraseña"}
            </button>
          </form>
        ) : (
          <>
            {message ? <div className="create-password-message">{message}</div> : null}

            <div className="create-password-help">
              <p>
                Si necesitas recuperar el acceso, vuelve a <Link href="/acceso-clientes">Mi espacio</Link>, escribe tu email y pulsa “He olvidado la contraseña”.
              </p>

              <p>
                Si acabas de comprar una herramienta, utiliza siempre el email de invitación más reciente.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}