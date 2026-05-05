"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanelGate() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/panel-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setMessage(result.error || "No se ha podido acceder.");
        return;
      }

      router.refresh();
    } catch {
      setMessage("No se ha podido conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <style>
        {`
          .admin-gate {
            max-width: 520px;
            margin: 0 auto;
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
          }

          .admin-gate-header {
            text-align: center;
            margin-bottom: 24px;
          }

          .admin-gate-kicker {
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

          .admin-gate-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 36px;
            line-height: 1.1;
            color: #403A36;
          }

          .admin-gate-text {
            margin: 0;
            color: #6F655F;
            font-size: 15.5px;
            line-height: 1.6;
          }

          .admin-gate-form {
            display: grid;
            gap: 16px;
          }

          .admin-gate-field {
            display: grid;
            gap: 7px;
          }

          .admin-gate-label {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .admin-gate-input {
            width: 100%;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            background: #FFFFFF;
            color: #403A36;
            padding: 13px 14px;
            font-size: 16px;
            outline: none;
          }

          .admin-gate-button {
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

          .admin-gate-message {
            background: #F7E4E1;
            color: #8A3C35;
            border-radius: 18px;
            padding: 12px 14px;
            font-size: 14px;
            line-height: 1.45;
          }
        `}
      </style>

      <section className="admin-gate">
        <div className="admin-gate-header">
          <div className="admin-gate-kicker">🔐 Acceso restringido</div>

          <h1 className="admin-gate-title">
            Gestión
          </h1>

          <p className="admin-gate-text">
            Introduce la clave para acceder al panel de gestión.
          </p>
        </div>

        <form className="admin-gate-form" onSubmit={handleSubmit}>
          <div className="admin-gate-field">
            <label className="admin-gate-label" htmlFor="password">
              Clave de acceso
            </label>

            <input
              id="password"
              className="admin-gate-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {message ? <div className="admin-gate-message">{message}</div> : null}

          <button className="admin-gate-button" type="submit" disabled={isLoading}>
            {isLoading ? "Comprobando..." : "Entrar"}
          </button>
        </form>
      </section>
    </>
  );
}