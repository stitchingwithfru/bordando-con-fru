"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginClientForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("No se ha podido iniciar sesión. Revisa el email y la contraseña.");
      setIsLoading(false);
      return;
    }

    router.push("/mi-cuenta");
    router.refresh();
  }

  async function handlePasswordRecovery() {
    if (!email.trim()) {
      setMessage("Escribe primero el email asociado a tu compra.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const redirectTo = `${window.location.origin}/auth/confirm?next=/crear-contrasena`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("Password recovery error:", error);

      setMessage(`No se ha podido enviar el email de recuperación. Detalle: ${error.message}`);
      setIsLoading(false);
      return;
    }

    setMessage("Te he enviado un email para crear una nueva contraseña. Revisa también spam o promociones.");
    setIsLoading(false);
  }

  return (
    <>
      <style>
        {`
          .client-login-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
          }

          .client-login-header {
            text-align: center;
            margin-bottom: 24px;
          }

          .client-login-kicker {
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

          .client-login-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 36px;
            line-height: 1.1;
            color: #403A36;
          }

          .client-login-text {
            margin: 0;
            color: #6F655F;
            font-size: 15.5px;
            line-height: 1.6;
          }

          .client-login-form {
            display: grid;
            gap: 16px;
          }

          .client-login-field {
            display: grid;
            gap: 7px;
          }

          .client-login-label {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .client-login-input {
            width: 100%;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            background: #FFFFFF;
            color: #403A36;
            padding: 13px 14px;
            font-size: 16px;
            outline: none;
          }

          .client-login-button {
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

          .client-login-message {
            background: #F7E4E1;
            color: #8A3C35;
            border-radius: 18px;
            padding: 12px 14px;
            font-size: 14px;
            line-height: 1.45;
          }

          .client-login-help {
            margin-top: 18px;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
            color: #6F655F;
            font-size: 13.5px;
            line-height: 1.55;
          }

          .client-login-help p {
            margin: 0;
          }

          .client-login-help p + p {
            margin-top: 8px;
          }

          .client-login-help a {
            color: #403A36;
            font-weight: 700;
          }

          .client-login-secondary-button {
            border: 0;
            background: transparent;
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
            text-decoration: underline;
            cursor: pointer;
            padding: 4px;
          }

          .client-login-secondary-button:disabled {
            opacity: 0.55;
            cursor: not-allowed;
          }

          @media (max-width: 600px) {
            .client-login-card {
              border-radius: 26px;
              padding: 24px 20px;
            }

            .client-login-title {
              font-size: 31px;
            }
          }
        `}
      </style>

      <section className="client-login-card">
        <div className="client-login-header">
          <div className="client-login-kicker">🔐 Zona privada</div>

          <h1 className="client-login-title">
              Mi espacio
            </h1>

            <p className="client-login-text">
              Entra con el email asociado a tu compra y tu contraseña para consultar tus recursos digitales.
            </p>
        </div>

        <form className="client-login-form" onSubmit={handleLogin}>
          <div className="client-login-field">
            <label className="client-login-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="client-login-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="client-login-field">
            <label className="client-login-label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              className="client-login-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {message ? <div className="client-login-message">{message}</div> : null}

          <button className="client-login-button" type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar a mi espacio"}
          </button>

          <button
            className="client-login-secondary-button"
            type="button"
            disabled={isLoading}
            onClick={handlePasswordRecovery}
          >
            He olvidado la contraseña
          </button>
        </form>

        <div className="client-login-help">
          <p>
            Si acabas de comprar una herramienta, primero recibirás una invitación por email para crear tu contraseña.
          </p>

          <p>
            Si ya tienes cuenta pero no recuerdas la contraseña, escribe tu email y pulsa “He olvidado la contraseña”.
          </p>
        </div>
      </section>
    </>
  );
}