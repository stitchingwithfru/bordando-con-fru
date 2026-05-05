"use client";

import { useState } from "react";

type Product = {
  id: string;
  slug: string;
  name: string;
  current_version: string | null;
  is_active: boolean;
};

type AccessRow = {
  id: string;
  customer_email: string;
  product_id: string;
  granted_at: string;
  notes: string | null;
  products: {
    id: string;
    slug: string;
    name: string;
    current_version: string | null;
  } | null;
};

type AuthUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
} | null;

type ApiResponse = {
  ok: boolean;
  error?: string;
  message?: string;
  products?: Product[];
  accesses?: AccessRow[];
  authUser?: AuthUser;
};

export default function AdminClientesPanel() {
  const [adminPassword, setAdminPassword] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [accesses, setAccesses] = useState<AccessRow[]>([]);
  const [authUser, setAuthUser] = useState<AuthUser>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function runAction(action: string, extra?: { productId?: string }) {
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          adminPassword,
          email,
          productId: extra?.productId ?? productId,
        }),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.ok) {
        setIsError(true);
        setMessage(result.error || "No se ha podido completar la acción.");
        return;
      }

      if (result.products) setProducts(result.products);

      if ("accesses" in result) {
       setAccesses(result.accesses || []);
      }

      if ("authUser" in result) {
       setAuthUser(result.authUser || null);
      }

      setIsReady(true);
      setMessage(result.message || "Acción completada correctamente.");
    } catch {
      setIsError(true);
      setMessage("No se ha podido conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  const canUseEmailActions = Boolean(email.trim());

  return (
    <>
      <style>
        {`
          .admin-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 28px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
          }

          .admin-header {
            text-align: center;
            margin-bottom: 28px;
          }

          .admin-kicker {
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

          .admin-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 42px;
            line-height: 1.08;
            color: #403A36;
          }

          .admin-text {
            margin: 0 auto;
            max-width: 760px;
            color: #6F655F;
            font-size: 16px;
            line-height: 1.65;
          }

          .admin-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }

          .admin-section {
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 24px;
            padding: 20px;
          }

          .admin-section.full {
            grid-column: 1 / -1;
          }

          .admin-section-title {
            margin: 0 0 16px 0;
            font-family: Georgia, serif;
            font-size: 24px;
            line-height: 1.15;
            color: #403A36;
          }

          .admin-form {
            display: grid;
            gap: 14px;
          }

          .admin-field {
            display: grid;
            gap: 7px;
          }

          .admin-label {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .admin-input,
          .admin-select {
            width: 100%;
            border: 1px solid #E8DED8;
            border-radius: 16px;
            background: #FFFFFF;
            color: #403A36;
            padding: 12px 13px;
            font-size: 15px;
            outline: none;
          }

          .admin-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 4px;
          }

          .admin-button {
            border: 0;
            border-radius: 999px;
            background: #403A36;
            color: #FFFFFF;
            padding: 12px 17px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.12);
          }

          .admin-button.secondary {
            background: #FFFFFF;
            color: #403A36;
            border: 1px solid #E8DED8;
            box-shadow: none;
          }

          .admin-button.danger {
            background: #8A3C35;
          }

          .admin-button:disabled {
            opacity: 0.55;
            cursor: not-allowed;
          }

          .admin-message {
            margin-top: 18px;
            border-radius: 18px;
            padding: 13px 14px;
            font-size: 14px;
            line-height: 1.45;
            background: #E9F0E6;
            color: #4D6249;
          }

          .admin-message.error {
            background: #F7E4E1;
            color: #8A3C35;
          }

          .admin-access-list {
            display: grid;
            gap: 12px;
          }

          .admin-access-item {
            background: #FFFFFF;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 15px;
          }

          .admin-access-title {
            margin: 0 0 6px 0;
            font-size: 15px;
            font-weight: 700;
            color: #403A36;
            line-height: 1.35;
          }

          .admin-access-meta {
            margin: 0 0 12px 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.45;
          }

          .admin-empty {
            background: #FFFFFF;
            border: 1px dashed #D8B7B0;
            border-radius: 18px;
            padding: 16px;
            color: #6F655F;
            font-size: 14px;
            line-height: 1.55;
          }

          .admin-user-status {
            margin-top: 12px;
            background: #FFFFFF;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
            color: #5f544f;
            font-size: 13.5px;
            line-height: 1.55;
          }

          @media (max-width: 800px) {
            .admin-grid {
              grid-template-columns: 1fr;
            }

            .admin-title {
              font-size: 34px;
            }

            .admin-card {
              border-radius: 26px;
              padding: 22px 18px;
            }
          }
        `}
      </style>

      <section className="admin-card">
        <div className="admin-header">
          <div className="admin-kicker">🔐 Gestión privada</div>

          <h1 className="admin-title">
            Admin clientes
          </h1>

          <p className="admin-text">
            Gestiona accesos, invitaciones y recuperación de contraseña de la zona privada.
          </p>
        </div>

        <div className="admin-grid">
          <div className="admin-section">
            <h2 className="admin-section-title">Acceso admin</h2>

            <div className="admin-form">
              <div className="admin-field">
                <label className="admin-label" htmlFor="adminPassword">
                  Clave admin
                </label>
                <input
                  id="adminPassword"
                  className="admin-input"
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  autoComplete="off"
                />
              </div>

              <button
                type="button"
                className="admin-button"
                disabled={isLoading || !adminPassword}
                onClick={() => runAction("load")}
              >
                {isLoading ? "Cargando..." : "Entrar al panel"}
              </button>
            </div>
          </div>

          <div className="admin-section">
            <h2 className="admin-section-title">Clienta</h2>

            <div className="admin-form">
              <div className="admin-field">
                <label className="admin-label" htmlFor="email">
                  Email de clienta
                </label>
                <input
                    id="email"
                    className="admin-input"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setAccesses([]);
                        setAuthUser(null);
                        setProductId("");
                        setMessage("");
                        setIsError(false);
                    }}
                    placeholder="email@ejemplo.com"
                    />
              </div>

              <div className="admin-actions">
                <button
                  type="button"
                  className="admin-button secondary"
                  disabled={!isReady || isLoading || !canUseEmailActions}
                  onClick={() => runAction("lookup")}
                >
                  Ver accesos
                </button>

                <button
                  type="button"
                  className="admin-button secondary"
                  disabled={!isReady || isLoading || !canUseEmailActions}
                  onClick={() => runAction("send_invitation")}
                >
                  Enviar invitación
                </button>

                <button
                  type="button"
                  className="admin-button secondary"
                  disabled={!isReady || isLoading || !canUseEmailActions}
                  onClick={() => runAction("send_password_recovery")}
                >
                  Recuperar contraseña
                </button>
              </div>

              {canUseEmailActions ? (
                <div className="admin-user-status">
                  {authUser ? (
                    <>
                      <strong>Cuenta creada:</strong> sí
                      <br />
                      <strong>Email:</strong> {authUser.email}
                      <br />
                      <strong>Último acceso:</strong>{" "}
                      {authUser.last_sign_in_at
                        ? new Date(authUser.last_sign_in_at).toLocaleString("es-ES")
                        : "sin datos"}
                    </>
                  ) : (
                    <>
                      <strong>Cuenta creada:</strong>{" "}
                      {isReady ? "no detectada o todavía no consultada" : "pendiente"}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="admin-section full">
            <h2 className="admin-section-title">Asignar producto</h2>

            <div className="admin-form">
              <div className="admin-field">
                <label className="admin-label" htmlFor="product">
                  Producto comprado
                </label>
                <select
                  id="product"
                  className="admin-select"
                  value={productId}
                  onChange={(event) => setProductId(event.target.value)}
                  disabled={!isReady}
                >
                  <option value="">Selecciona un producto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                      {product.current_version ? ` · v${product.current_version}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-actions">
                <button
                  type="button"
                  className="admin-button"
                  disabled={
                    !isReady ||
                    isLoading ||
                    !canUseEmailActions ||
                    !productId
                  }
                  onClick={() => runAction("grant_access")}
                >
                  Asignar acceso
                </button>
              </div>
            </div>
          </div>

          <div className="admin-section full">
            <h2 className="admin-section-title">
              Productos asignados a la clienta
            </h2>

            {accesses.length > 0 ? (
              <div className="admin-access-list">
                {accesses.map((access) => (
                  <div key={access.id} className="admin-access-item">
                    <p className="admin-access-title">
                      {access.products?.name || "Producto sin datos"}
                    </p>

                    <p className="admin-access-meta">
                      Email: {access.customer_email}
                      <br />
                      Asignado:{" "}
                      {access.granted_at
                        ? new Date(access.granted_at).toLocaleString("es-ES")
                        : "sin fecha"}
                    </p>

                    <button
                      type="button"
                      className="admin-button danger"
                      disabled={isLoading}
                      onClick={() =>
                        runAction("revoke_access", {
                          productId: access.product_id,
                        })
                      }
                    >
                      Revocar acceso
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="admin-empty">
                No hay productos asignados a esta clienta o todavía no has buscado su email.
              </div>
            )}
          </div>
        </div>

        {message ? (
          <div className={`admin-message ${isError ? "error" : ""}`}>
            {message}
          </div>
        ) : null}
      </section>
    </>
  );
}