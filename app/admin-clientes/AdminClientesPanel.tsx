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

type UpdateProductDraft = {
  productId: string;
  productName: string;
  enabled: boolean;
  updatedTemplateUrl: string;
  updatedPdfFilePath: string;
  updatedVideoUrl: string;
  notes: string;
};

type ProductUpdateSummary = {
  id: string;
  title: string;
  version: string | null;
  published_at: string;
  created_at: string;
};

type UpdateNotificationPreview = {
  totalRecipients: number;
  alreadySentCount: number;
  pendingCount: number;
  recipients: string[];
  pendingRecipients: string[];
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
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateVersion, setUpdateVersion] = useState("");
  const [updatePublishedAt, setUpdatePublishedAt] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [updateProducts, setUpdateProducts] = useState<UpdateProductDraft[]>([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateIsError, setUpdateIsError] = useState(false);
  const [isCreatingUpdate, setIsCreatingUpdate] = useState(false);
  const [availableUpdates, setAvailableUpdates] = useState<ProductUpdateSummary[]>([]);
  const [selectedUpdateId, setSelectedUpdateId] = useState("");
  const [notificationPreview, setNotificationPreview] =
    useState<UpdateNotificationPreview | null>(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationIsError, setNotificationIsError] = useState(false);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(false);
  const [isPreviewingNotification, setIsPreviewingNotification] = useState(false);
  const [isSendingNotification, setIsSendingNotification] = useState(false);

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

      if (result.products) {
        setProducts(result.products);
        syncUpdateProducts(result.products);
      }

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

function syncUpdateProducts(productList: Product[]) {
  setUpdateProducts(
    productList.map((product) => ({
      productId: product.id,
      productName: product.name,
      enabled: false,
      updatedTemplateUrl: "",
      updatedPdfFilePath: "",
      updatedVideoUrl: "",
      notes: "",
    }))
  );
}

function updateDraftProduct(
  productId: string,
  changes: Partial<UpdateProductDraft>
) {
  setUpdateProducts((current) =>
    current.map((item) =>
      item.productId === productId ? { ...item, ...changes } : item
    )
  );
}

function resetUpdateForm() {
  setUpdateTitle("");
  setUpdateDescription("");
  setUpdateVersion("");
  setUpdatePublishedAt(new Date().toISOString().slice(0, 10));
  setUpdateProducts((current) =>
    current.map((item) => ({
      ...item,
      enabled: false,
      updatedTemplateUrl: "",
      updatedPdfFilePath: "",
      updatedVideoUrl: "",
      notes: "",
    }))
  );
}

async function createProductUpdate() {
  setUpdateMessage("");
  setUpdateIsError(false);

  const selectedItems = updateProducts.filter((item) => item.enabled);

  if (!updateTitle.trim()) {
    setUpdateIsError(true);
    setUpdateMessage("Añade un título para la actualización.");
    return;
  }

  if (!selectedItems.length) {
    setUpdateIsError(true);
    setUpdateMessage("Selecciona al menos un producto afectado.");
    return;
  }

  setIsCreatingUpdate(true);

  try {
    const response = await fetch("/api/admin/product-updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminPassword,
        title: updateTitle,
        description: updateDescription,
        version: updateVersion,
        publishedAt: updatePublishedAt,
        items: selectedItems.map((item) => ({
          productId: item.productId,
          updatedTemplateUrl: item.updatedTemplateUrl,
          updatedPdfFilePath: item.updatedPdfFilePath,
          updatedVideoUrl: item.updatedVideoUrl,
          notes: item.notes,
        })),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setUpdateIsError(true);
      setUpdateMessage(result.error || "No se ha podido crear la actualización.");
      return;
    }

    setUpdateMessage(result.message || "Actualización creada correctamente.");
    resetUpdateForm();
  } catch {
    setUpdateIsError(true);
    setUpdateMessage("No se ha podido conectar con el servidor.");
  } finally {
    setIsCreatingUpdate(false);
  }
}

async function loadProductUpdates() {
  setIsLoadingUpdates(true);
  setNotificationMessage("");
  setNotificationIsError(false);

  try {
    const response = await fetch(
      `/api/admin/product-updates?adminPassword=${encodeURIComponent(adminPassword)}`
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setNotificationIsError(true);
      setNotificationMessage(
        result.error || "No se han podido cargar las actualizaciones."
      );
      return;
    }

    setAvailableUpdates(result.updates || []);
    setNotificationPreview(null);

    if (!selectedUpdateId && result.updates?.length) {
      setSelectedUpdateId(result.updates[0].id);
    }
  } catch {
    setNotificationIsError(true);
    setNotificationMessage("No se ha podido conectar con el servidor.");
  } finally {
    setIsLoadingUpdates(false);
  }
}

async function runUpdateNotification(action: "preview" | "send") {
  setNotificationMessage("");
  setNotificationIsError(false);

  if (!selectedUpdateId) {
    setNotificationIsError(true);
    setNotificationMessage("Selecciona una actualización.");
    return;
  }

  if (action === "preview") {
    setIsPreviewingNotification(true);
  } else {
    setIsSendingNotification(true);
  }

  try {
    const response = await fetch("/api/admin/product-updates/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminPassword,
        updateId: selectedUpdateId,
        action,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setNotificationIsError(true);
      setNotificationMessage(
        result.error || "No se ha podido procesar el aviso."
      );
      return;
    }

    if (action === "preview") {
      setNotificationPreview({
        totalRecipients: result.totalRecipients || 0,
        alreadySentCount: result.alreadySentCount || 0,
        pendingCount: result.pendingCount || 0,
        recipients: result.recipients || [],
        pendingRecipients: result.pendingRecipients || [],
      });

      setNotificationMessage("Previsualización cargada correctamente.");
    } else {
      setNotificationMessage(result.message || "Aviso enviado correctamente.");
      await runUpdateNotification("preview");
    }
  } catch {
    setNotificationIsError(true);
    setNotificationMessage("No se ha podido conectar con el servidor.");
  } finally {
    setIsPreviewingNotification(false);
    setIsSendingNotification(false);
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

          .admin-update-intro {
            margin: 0 0 16px 0;
            color: #6F655F;
            font-size: 14px;
            line-height: 1.55;
          }

          .admin-update-product-list {
            display: grid;
            gap: 14px;
          }

          .admin-update-product-card {
            background: #FFFFFF;
            border: 1px solid #E8DED8;
            border-radius: 20px;
            padding: 16px;
          }

          .admin-update-product-head {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 12px;
          }

          .admin-update-product-checkbox {
            margin-top: 4px;
          }

          .admin-update-product-title {
            margin: 0;
            color: #403A36;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.35;
          }

          .admin-update-product-fields {
            display: grid;
            gap: 12px;
            margin-top: 12px;
          }

          .admin-update-help {
            margin: 6px 0 0 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.45;
          }

          .admin-textarea {
            width: 100%;
            min-height: 90px;
            border: 1px solid #E8DED8;
            border-radius: 16px;
            background: #FFFFFF;
            color: #403A36;
            padding: 12px 13px;
            font-size: 15px;
            outline: none;
            resize: vertical;
          }

          .admin-notification-summary {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          .admin-notification-stat {
            background: #FFFFFF;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
          }

          .admin-notification-stat-label {
            margin: 0 0 6px 0;
            color: #6F655F;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .admin-notification-stat-value {
            margin: 0;
            color: #403A36;
            font-family: Georgia, serif;
            font-size: 28px;
            line-height: 1;
          }

          .admin-recipient-list {
            display: grid;
            gap: 8px;
            max-height: 180px;
            overflow: auto;
            background: #FFFFFF;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 12px;
          }

          .admin-recipient-item {
            color: #403A36;
            font-size: 13.5px;
            line-height: 1.4;
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

            .admin-notification-summary {
              grid-template-columns: 1fr;
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

          <div className="admin-section full">
            <h2 className="admin-section-title">
              Crear actualización de producto
            </h2>

            <p className="admin-update-intro">
              Crea un aviso de actualización para uno o varios productos. Si añades nuevos enlaces
              de plantilla, PDF o vídeo, también se sustituirán los recursos principales que ve la
              clienta en “Mi cuenta”.
            </p>

            <div className="admin-form">
              <div className="admin-field">
                <label className="admin-label" htmlFor="updateTitle">
                  Título de la actualización
                </label>
                <input
                  id="updateTitle"
                  className="admin-input"
                  type="text"
                  value={updateTitle}
                  onChange={(event) => setUpdateTitle(event.target.value)}
                  placeholder="Ej. Nueva versión 1.1 del Sistema de Seguimiento"
                  disabled={!isReady}
                />
              </div>

              <div className="admin-field">
                <label className="admin-label" htmlFor="updateDescription">
                  Descripción general
                </label>
                <textarea
                  id="updateDescription"
                  className="admin-textarea"
                  value={updateDescription}
                  onChange={(event) => setUpdateDescription(event.target.value)}
                  placeholder="Explica brevemente qué ha cambiado."
                  disabled={!isReady}
                />
              </div>

              <div className="admin-grid">
                <div className="admin-field">
                  <label className="admin-label" htmlFor="updateVersion">
                    Nueva versión
                  </label>
                  <input
                    id="updateVersion"
                    className="admin-input"
                    type="text"
                    value={updateVersion}
                    onChange={(event) => setUpdateVersion(event.target.value)}
                    placeholder="Ej. 1.1"
                    disabled={!isReady}
                  />
                </div>

                <div className="admin-field">
                  <label className="admin-label" htmlFor="updatePublishedAt">
                    Fecha de publicación
                  </label>
                  <input
                    id="updatePublishedAt"
                    className="admin-input"
                    type="date"
                    value={updatePublishedAt}
                    onChange={(event) => setUpdatePublishedAt(event.target.value)}
                    disabled={!isReady}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">
                  Productos afectados
                </label>

                {updateProducts.length > 0 ? (
                  <div className="admin-update-product-list">
                    {updateProducts.map((item) => (
                      <div key={item.productId} className="admin-update-product-card">
                        <label className="admin-update-product-head">
                          <input
                            className="admin-update-product-checkbox"
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(event) =>
                              updateDraftProduct(item.productId, {
                                enabled: event.target.checked,
                              })
                            }
                            disabled={!isReady}
                          />

                          <span className="admin-update-product-title">
                            {item.productName}
                          </span>
                        </label>

                        {item.enabled ? (
                          <div className="admin-update-product-fields">
                            <div className="admin-field">
                              <label className="admin-label">
                                Nuevo enlace de plantilla /copy
                              </label>
                              <input
                                className="admin-input"
                                type="url"
                                value={item.updatedTemplateUrl}
                                onChange={(event) =>
                                  updateDraftProduct(item.productId, {
                                    updatedTemplateUrl: event.target.value,
                                  })
                                }
                                placeholder="https://docs.google.com/spreadsheets/d/.../copy"
                              />
                              <p className="admin-update-help">
                                Déjalo vacío si la plantilla no cambia.
                              </p>
                            </div>

                            <div className="admin-field">
                              <label className="admin-label">
                                Nuevo PDF privado
                              </label>
                              <input
                                className="admin-input"
                                type="text"
                                value={item.updatedPdfFilePath}
                                onChange={(event) =>
                                  updateDraftProduct(item.productId, {
                                    updatedPdfFilePath: event.target.value,
                                  })
                                }
                                placeholder="seguimiento-pro/manual-seguimiento-pro-v1-1.pdf"
                              />
                              <p className="admin-update-help">
                                Solo para productos que tengan PDF. Déjalo vacío si no cambia.
                              </p>
                            </div>

                            <div className="admin-field">
                              <label className="admin-label">
                                Nuevo enlace de vídeo
                              </label>
                              <input
                                className="admin-input"
                                type="url"
                                value={item.updatedVideoUrl}
                                onChange={(event) =>
                                  updateDraftProduct(item.productId, {
                                    updatedVideoUrl: event.target.value,
                                  })
                                }
                                placeholder="https://drive.google.com/file/d/..."
                              />
                              <p className="admin-update-help">
                                Déjalo vacío si el vídeo no cambia.
                              </p>
                            </div>

                            <div className="admin-field">
                              <label className="admin-label">
                                Nota específica para este producto
                              </label>
                              <textarea
                                className="admin-textarea"
                                value={item.notes}
                                onChange={(event) =>
                                  updateDraftProduct(item.productId, {
                                    notes: event.target.value,
                                  })
                                }
                                placeholder="Ej. Esta versión incluye una mejora específica para PRO."
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-empty">
                    Primero pulsa “Entrar al panel” para cargar los productos disponibles.
                  </div>
                )}
              </div>

              <div className="admin-actions">
                <button
                  type="button"
                  className="admin-button"
                  disabled={
                    !isReady ||
                    isCreatingUpdate ||
                    !adminPassword ||
                    !updateTitle.trim() ||
                    !updateProducts.some((item) => item.enabled)
                  }
                  onClick={createProductUpdate}
                >
                  {isCreatingUpdate ? "Creando actualización..." : "Crear actualización"}
                </button>

                <button
                  type="button"
                  className="admin-button secondary"
                  disabled={isCreatingUpdate}
                  onClick={resetUpdateForm}
                >
                  Limpiar actualización
                </button>
              </div>

              {updateMessage ? (
                <div className={`admin-message ${updateIsError ? "error" : ""}`}>
                  {updateMessage}
                </div>
              ) : null}
            </div>

            <div className="admin-section full">
              <h2 className="admin-section-title">
                Avisar actualización por email
              </h2>

              <p className="admin-update-intro">
                Selecciona una actualización ya creada, revisa qué clientas recibirían el aviso
                y envía el email solo a las pendientes. El sistema evita reenvíos duplicados.
              </p>

              <div className="admin-form">
                <div className="admin-actions">
                  <button
                    type="button"
                    className="admin-button secondary"
                    disabled={!isReady || !adminPassword || isLoadingUpdates}
                    onClick={loadProductUpdates}
                  >
                    {isLoadingUpdates ? "Cargando..." : "Cargar actualizaciones"}
                  </button>
                </div>

                <div className="admin-field">
                  <label className="admin-label" htmlFor="selectedUpdate">
                    Actualización
                  </label>

                  <select
                    id="selectedUpdate"
                    className="admin-select"
                    value={selectedUpdateId}
                    onChange={(event) => {
                      setSelectedUpdateId(event.target.value);
                      setNotificationPreview(null);
                      setNotificationMessage("");
                      setNotificationIsError(false);
                    }}
                    disabled={!isReady || !availableUpdates.length}
                  >
                    <option value="">Selecciona una actualización</option>
                    {availableUpdates.map((update) => (
                      <option key={update.id} value={update.id}>
                        {update.title}
                        {update.version ? ` · v${update.version}` : ""} ·{" "}
                        {new Date(update.published_at).toLocaleDateString("es-ES")}
                      </option>
                    ))}
                  </select>

                  {!availableUpdates.length ? (
                    <p className="admin-update-help">
                      Pulsa “Cargar actualizaciones” para ver las actualizaciones disponibles.
                    </p>
                  ) : null}
                </div>

                <div className="admin-actions">
                  <button
                    type="button"
                    className="admin-button secondary"
                    disabled={
                      !isReady ||
                      !selectedUpdateId ||
                      isPreviewingNotification ||
                      isSendingNotification
                    }
                    onClick={() => runUpdateNotification("preview")}
                  >
                    {isPreviewingNotification
                      ? "Revisando..."
                      : "Previsualizar destinatarias"}
                  </button>

                  <button
                    type="button"
                    className="admin-button"
                    disabled={
                      !isReady ||
                      !selectedUpdateId ||
                      isPreviewingNotification ||
                      isSendingNotification ||
                      !notificationPreview ||
                      notificationPreview.pendingCount === 0
                    }
                    onClick={() => runUpdateNotification("send")}
                  >
                    {isSendingNotification ? "Enviando..." : "Enviar aviso"}
                  </button>
                </div>

                {notificationPreview ? (
                  <>
                    <div className="admin-notification-summary">
                      <div className="admin-notification-stat">
                        <p className="admin-notification-stat-label">
                          Destinatarias
                        </p>
                        <p className="admin-notification-stat-value">
                          {notificationPreview.totalRecipients}
                        </p>
                      </div>

                      <div className="admin-notification-stat">
                        <p className="admin-notification-stat-label">
                          Ya avisadas
                        </p>
                        <p className="admin-notification-stat-value">
                          {notificationPreview.alreadySentCount}
                        </p>
                      </div>

                      <div className="admin-notification-stat">
                        <p className="admin-notification-stat-label">
                          Pendientes
                        </p>
                        <p className="admin-notification-stat-value">
                          {notificationPreview.pendingCount}
                        </p>
                      </div>
                    </div>

                    <div className="admin-field">
                      <label className="admin-label">
                        Emails pendientes de aviso
                      </label>

                      {notificationPreview.pendingRecipients.length > 0 ? (
                        <div className="admin-recipient-list">
                          {notificationPreview.pendingRecipients.map((recipient) => (
                            <div key={recipient} className="admin-recipient-item">
                              {recipient}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="admin-empty">
                          No hay destinatarias pendientes para esta actualización.
                        </div>
                      )}
                    </div>
                  </>
                ) : null}

                {notificationMessage ? (
                  <div className={`admin-message ${notificationIsError ? "error" : ""}`}>
                    {notificationMessage}
                  </div>
                ) : null}
              </div>
            </div>
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