"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type ConfirmationState = {
  manual: boolean;
  copy: boolean;
  refunds: boolean;
  waiver: boolean;
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  reference?: string | null;
};

type TrackingPayload = {
  name: string;
  email: string;
  requestType: string;
  newVersion: string;
  currentVersion: string;
  upgradeVersion: string;
  paymentMethod: string;
  confirmations: ConfirmationState;
  marketingAccepted: boolean;
  total: number;
};

type InventoryPayload = {
  name: string;
  email: string;
  requestType: string;
  newMode: string;
  owned: string[];
  wanted: string[];
  paymentMethod: string;
  confirmations: ConfirmationState;
  marketingAccepted: boolean;
  total: number;
};

const PAYPAL_FALLBACK_EMAIL = "frnt24@hotmail.com";
const BIZUM_PHONE = "624009129";
const PAYPAL_IMAGE = "/payment/pago-paypal.png";
const BIZUM_IMAGE = "/payment/pago-bizum.png";

function formatEuro(amount: number) {
  return `${amount.toFixed(2).replace(".", ",")} €`;
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <select className="select" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function CheckRow({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; disabled?: boolean; }) {
  return (
    <label className="checkbox-row" style={disabled ? { opacity: 0.5 } : undefined}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function Conditions({
  value,
  onChange,
  disabled = false,
  variant = "tracking",
}: {
  value: ConfirmationState;
  onChange: Dispatch<SetStateAction<ConfirmationState>>;
  disabled?: boolean;
  variant?: "tracking" | "inventory";
}) {
  const isInventory = variant === "inventory";

  return (
    <div className="form-stack">
      <CheckRow
        checked={value.manual}
        disabled={disabled}
        onChange={(v) => onChange((p) => ({ ...p, manual: v }))}
        label={
          isInventory
            ? "Entiendo que Inventario Profesional es un servicio digital prestado mediante una aplicación web privada y que su activación se prepara manualmente tras la comprobación del pago."
            : "Entiendo que el Sistema de Seguimiento de Punto de Cruz es contenido digital con entrega manual tras la comprobación del pago."
        }
      />

      <CheckRow
        checked={value.copy}
        disabled={disabled}
        onChange={(v) => onChange((p) => ({ ...p, copy: v }))}
        label={
          isInventory
            ? "Entiendo que el email indicado en este pedido se utilizará para gestionar mi compra y mi acceso a la zona privada, y que Inventario Profesional se activará mediante un código de activación de un solo uso."
            : "Entiendo que el producto se asociará al email indicado en este pedido y que recibiré una invitación para acceder a mi zona privada."
        }
      />

      <CheckRow
        checked={value.refunds}
        disabled={disabled}
        onChange={(v) => onChange((p) => ({ ...p, refunds: v }))}
        label={
          isInventory
            ? "Solicito expresamente que la prestación de Inventario Profesional pueda comenzar durante el plazo legal de desistimiento."
            : "Consiento expresamente que el suministro del contenido digital pueda comenzar durante el plazo legal de desistimiento."
        }
      />

      <CheckRow
        checked={value.waiver}
        disabled={disabled}
        onChange={(v) => onChange((p) => ({ ...p, waiver: v }))}
        label={
          isInventory ? (
            <>
              Declaro conocer que, una vez que el servicio haya sido completamente ejecutado, perderé mi derecho de desistimiento, y acepto estas{" "}
              <Link href="/condiciones-compra">Condiciones de compra</Link>.
            </>
          ) : (
            <>
              Reconozco que, al comenzar el suministro del contenido digital con mi consentimiento, perderé mi derecho de desistimiento, y acepto estas{" "}
              <Link href="/condiciones-compra">Condiciones de compra</Link>.
            </>
          )
        }
      />
    </div>
  );
}

function OrderPrivacyNotice() {
  return (
    <div className="legal-box">
      <p className="legal-text"><strong style={{ color: "var(--text)" }}>Información básica sobre protección de datos</strong></p>
      <p className="legal-text">Responsable: <strong style={{ color: "var(--text)" }}>Bordando con Fru</strong>.</p>
      <p className="legal-text">Finalidad: gestionar tu pedido, comunicarnos contigo y realizar la entrega del producto digital adquirido. Si lo autorizas expresamente, también podremos enviarte información sobre novedades y nuevos lanzamientos.</p>
      <p className="legal-text">Legitimación: ejecución de la relación derivada del pedido y, en su caso, consentimiento.</p>
      <p className="legal-text">
        Destinatarios: podrán tratar tus datos los proveedores técnicos necesarios
        para prestar el servicio. No vendemos tus datos ni los cedemos a terceros
        para fines comerciales.
      </p>
      <p className="legal-text">Derechos: puedes acceder, rectificar o suprimir tus datos escribiendo a <a href="mailto:soporte@stitchingwithfru.com">soporte@stitchingwithfru.com</a>.</p>
      <p className="legal-text">Más información en la <Link href="/politica-privacidad">Política de privacidad</Link>.</p>
    </div>
  );
}

async function submitForm<T>(type: "tracking_order" | "inventory_order", data: T) {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data }),
  });

  const result = await response.json().catch(() => ({ ok: false, error: "Respuesta no válida del servidor." }));

  if (!response.ok || !result.ok) {
    throw new Error(result.error || "No se ha podido enviar el formulario.");
  }

  return result as { ok: true; reference?: string | null; message?: string };
}

function SubmitFeedback({ state }: { state: SubmitState }) {
  if (state.status === "idle") return null;

  const className = state.status === "success" ? "feedback-box feedback-success" : state.status === "error" ? "feedback-box feedback-error" : "feedback-box";

  return (
    <div className={className}>
      <p className="legal-text" style={{ color: "var(--text)" }}><strong>{state.status === "success" ? "Envío correcto" : state.status === "submitting" ? "Enviando" : "No se ha podido enviar"}</strong></p>
      <p className="legal-text">{state.message}</p>
      {state.reference ? <p className="legal-text">Referencia: <strong style={{ color: "var(--text)" }}>{state.reference}</strong></p> : null}
    </div>
  );
}

function PaymentInstructions({
  paymentMethod,
  total,
  reference,
  afterPaymentText,
}: {
  paymentMethod: string;
  total: number;
  reference?: string | null;
  afterPaymentText?: ReactNode;
}) {
  if (!paymentMethod) return null;

  const isPaypal = paymentMethod === "paypal";

  return (
    <div className="card card-soft">
      <div className="badge badge-soft">Datos de pago</div>
      <h3 className="serif">Completa ahora el pago</h3>
      <div className="list" style={{ marginBottom: 20 }}>
        <p>• Método seleccionado: <strong style={{ color: "var(--text)" }}>{isPaypal ? "PayPal" : "Bizum"}</strong></p>
        <p>• Importe total: <strong style={{ color: "var(--text)" }}>{formatEuro(total)}</strong></p>
        {reference ? <p>• Referencia del pedido: <strong style={{ color: "var(--text)" }}>{reference}</strong></p> : null}
      </div>

      {isPaypal ? (
        <div className="payment-stack">
          <img src={PAYPAL_IMAGE} alt="Instrucciones de pago por PayPal" className="payment-image" />
          <div className="status-box">
            <p className="legal-text"><strong style={{ color: "var(--text)" }}>⚠️ Si el QR no te funciona correctamente</strong>, haz el envío del pago a este email: <strong style={{ color: "var(--text)" }}>{PAYPAL_FALLBACK_EMAIL}</strong>, y sigue los PASOS 2 y 3 de la imagen.</p>
          </div>
        </div>
      ) : (
        <div className="payment-stack">
          <img src={BIZUM_IMAGE} alt="Instrucciones de pago por Bizum" className="payment-image" />
          <div className="status-box">
            <p className="legal-text">Número Bizum: <strong style={{ color: "var(--text)" }}>{BIZUM_PHONE}</strong></p>
          </div>
        </div>
      )}

      <div className="status-box" style={{ marginTop: 20 }}>
        <p className="legal-text">
          {afterPaymentText ??
            "Una vez comprobado el pago, asignaré el producto al email indicado en el pedido y recibirás una invitación para crear tu acceso a la zona privada de la web."}
        </p>
      </div>
    </div>
  );
}

function useScrollToPaymentOnSuccess(isLocked: boolean, reference?: string | null) {
  const paymentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLocked || !paymentRef.current) return;

    const timer = window.setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isLocked, reference]);

  return paymentRef;
}

export function TrackingOrderForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [currentVersion, setCurrentVersion] = useState("");
  const [upgradeVersion, setUpgradeVersion] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [confirmations, setConfirmations] = useState<ConfirmationState>({ manual: false, copy: false, refunds: false, waiver: false });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });

  const newOptions = [
    { value: "lite", label: "LITE — 4,99 €", price: 4.99 },
    { value: "youtube-lite", label: "YOUTUBE LITE — 6,99 €", price: 6.99 },
    { value: "pro", label: "PRO — 9,99 €", price: 9.99 },
    { value: "youtube-pro", label: "YOUTUBE PRO — 12,99 €", price: 12.99 },
  ];

  const upgradeMap: Record<string, { value: string; label: string; price: number }[]> = {
    lite: [
      { value: "youtube-lite", label: "YOUTUBE LITE — 2,00 €", price: 2 },
      { value: "pro", label: "PRO — 5,00 €", price: 5 },
      { value: "youtube-pro", label: "YOUTUBE PRO — 8,00 €", price: 8 },
    ],
    "youtube-lite": [
      { value: "pro", label: "PRO — 3,00 €", price: 3 },
      { value: "youtube-pro", label: "YOUTUBE PRO — 6,00 €", price: 6 },
    ],
    pro: [{ value: "youtube-pro", label: "YOUTUBE PRO — 3,00 €", price: 3 }],
  };

  const safeUpgradeOptions = currentVersion ? upgradeMap[currentVersion] ?? [] : [];
  const total = useMemo(() => {
    if (requestType === "new") return newOptions.find((i) => i.value === newVersion)?.price ?? 0;
    if (requestType === "upgrade") return safeUpgradeOptions.find((i) => i.value === upgradeVersion)?.price ?? 0;
    return 0;
  }, [requestType, newVersion, safeUpgradeOptions, upgradeVersion]);

  const ready = Boolean(name.trim() && email.trim() && paymentMethod && total > 0 && Object.values(confirmations).every(Boolean));
  const isLocked = submitState.status === "success";
  const isBusy = submitState.status === "submitting";
  const paymentRef = useScrollToPaymentOnSuccess(isLocked, submitState.reference);

  const resetForm = () => {
    setName("");
    setEmail("");
    setRequestType("");
    setNewVersion("");
    setCurrentVersion("");
    setUpgradeVersion("");
    setPaymentMethod("");
    setMarketingAccepted(false);
    setConfirmations({ manual: false, copy: false, refunds: false, waiver: false });
    setSubmitState({ status: "idle", message: "" });
  };

  const handleSubmit = async () => {
    if (isLocked || isBusy) return;

    if (!name.trim() || !email.trim()) {
      setSubmitState({ status: "error", message: "Completa nombre y correo electrónico antes de enviar el pedido." });
      return;
    }

    if (!paymentMethod || total <= 0) {
      setSubmitState({ status: "error", message: "Revisa la versión o complemento elegido y el método de pago antes de enviar el pedido." });
      return;
    }

    if (!Object.values(confirmations).every(Boolean)) {
      setSubmitState({ status: "error", message: "Debes aceptar todas las condiciones obligatorias antes de enviar el pedido." });
      return;
    }

    const payload: TrackingPayload = {
      name,
      email,
      requestType,
      newVersion,
      currentVersion,
      upgradeVersion,
      paymentMethod,
      confirmations,
      marketingAccepted,
      total,
    };

    try {
      setSubmitState({ status: "submitting", message: "Estoy enviando tu pedido. Un momento, por favor." });
      const result = await submitForm("tracking_order", payload);
      setSubmitState({
        status: "success",
        message: "Tu pedido se ha enviado correctamente. A continuación tienes los datos de pago según el método elegido. Cuando compruebe el pago, asignaré el producto al email indicado y recibirás una invitación para acceder a tu zona privada.",
        reference: result.reference ?? null,
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "No se ha podido enviar el pedido. Inténtalo de nuevo en unos minutos.",
      });
    }
  };

  return (
    <div className="form-grid">
      <div className="card">
        <div className="form-stack">
          <Field label="Nombre completo" value={name} onChange={setName} placeholder="Tu nombre" disabled={isLocked || isBusy} />
          <Field
            label="Email para asociar tu compra"
            value={email}
            onChange={setEmail}
            placeholder="tuemail@ejemplo.com"
            disabled={isLocked || isBusy}
          />
          <SelectField label="Tipo de pedido" value={requestType} onChange={(v) => { setRequestType(v); setNewVersion(""); setCurrentVersion(""); setUpgradeVersion(""); setSubmitState({ status: "idle", message: "" }); }} options={[{ value: "new", label: "Compra nueva" }, { value: "upgrade", label: "Ya adquirí el sistema y quiero una versión superior" }]} disabled={isLocked || isBusy} />
          {requestType === "new" ? <SelectField label="¿Qué versión quieres adquirir?" value={newVersion} onChange={setNewVersion} options={newOptions.map((i) => ({ value: i.value, label: i.label }))} disabled={isLocked || isBusy} /> : null}
          {requestType === "upgrade" ? (
            <>
              <SelectField label="¿Qué versión tienes?" value={currentVersion} onChange={(v) => { setCurrentVersion(v); setUpgradeVersion(""); }} options={[{ value: "lite", label: "LITE" }, { value: "youtube-lite", label: "YOUTUBE LITE" }, { value: "pro", label: "PRO" }]} disabled={isLocked || isBusy} />
              <SelectField label="¿Qué versión quieres adquirir?" value={upgradeVersion} onChange={setUpgradeVersion} options={safeUpgradeOptions.map((i) => ({ value: i.value, label: i.label }))} placeholder={currentVersion ? "Selecciona la mejora" : "Primero indica tu versión actual"} disabled={isLocked || isBusy} />
            </>
          ) : null}
          <SelectField label="Método de pago" value={paymentMethod} onChange={setPaymentMethod} options={[{ value: "bizum", label: "Bizum (España)" }, { value: "paypal", label: "PayPal (Internacional / Alternativa)" }]} disabled={isLocked || isBusy} />
        </div>
      </div>
      <div className="form-stack">
        <div className="card">
          <div className="badge badge-soft">Resumen automático</div>
          <h3 className="serif">Importe total del pedido</h3>
          <p className="total-amount serif">{formatEuro(total)}</p>
        </div>
        <div className="card">
          <div className="badge">Condiciones</div>
          <Conditions value={confirmations} onChange={setConfirmations} disabled={isLocked || isBusy} />
        </div>
        <div className="card">
          <div className="badge badge-sage">Privacidad</div>
          <OrderPrivacyNotice />
          <div style={{ marginTop: 16 }}>
            <CheckRow checked={marketingAccepted} disabled={isLocked || isBusy} onChange={setMarketingAccepted} label="Quiero recibir por email novedades, actualizaciones y nuevos lanzamientos de Bordando con Fru." />
          </div>
        </div>
        <div className="status-box">
          <div className="badge badge-sage">Estado</div>
          <p className="muted">Pedido listo para enviar: <strong style={{ color: "var(--text)" }}>{ready ? "sí" : "todavía no"}</strong></p>
          {isLocked ? (
            <div className="button-row">
              <button className="btn-secondary" type="button" onClick={resetForm}>Enviar otro pedido</button>
            </div>
          ) : (
            <button className="btn-primary" disabled={isBusy} onClick={handleSubmit}>{isBusy ? "Enviando…" : "Pedido con obligación de pago"}</button>
          )}
          <div style={{ marginTop: 16 }}>
            <SubmitFeedback state={submitState} />
          </div>
        </div>
        {isLocked ? <div ref={paymentRef}><PaymentInstructions paymentMethod={paymentMethod} total={total} reference={submitState.reference} /></div> : null}
      </div>
    </div>
  );
}

export function InventoryOrderForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [newMode, setNewMode] = useState("");
  const [owned, setOwned] = useState<string[]>([]);
  const [wanted, setWanted] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [confirmations, setConfirmations] = useState<ConfirmationState>({ manual: false, copy: false, refunds: false, waiver: false });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });

  const complementOptions = [
    { value: "telas", label: "Módulo de Telas — +4,00 €" },
    { value: "kits", label: "Módulo de Kits y gráficos — +4,00 €" },
    {
      value: "calculadora",
      label: "Módulo de Calculadora y carrito de proyectos — +4,00 €",
    },
  ];

  const toggleWanted = (value: string) => setWanted((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
  const toggleOwned = (value: string) => {
    setOwned((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
    setWanted((prev) => prev.filter((x) => x !== value));
  };

  const total = useMemo(() => {
    const addons = wanted.length * 4;

    if (requestType === "new") {
      if (newMode === "base-only") return 16;
      if (newMode === "with-addons") return 16 + addons;
      return 0;
    }

    if (requestType === "addons") return addons;

    return 0;
  }, [requestType, newMode, wanted]);

  const ready = Boolean(name.trim() && email.trim() && paymentMethod && total > 0 && Object.values(confirmations).every(Boolean));
  const isLocked = submitState.status === "success";
  const isBusy = submitState.status === "submitting";
  const paymentRef = useScrollToPaymentOnSuccess(isLocked, submitState.reference);

  const resetForm = () => {
    setName("");
    setEmail("");
    setRequestType("");
    setNewMode("");
    setOwned([]);
    setWanted([]);
    setPaymentMethod("");
    setMarketingAccepted(false);
    setConfirmations({ manual: false, copy: false, refunds: false, waiver: false });
    setSubmitState({ status: "idle", message: "" });
  };

  const handleSubmit = async () => {
    if (isLocked || isBusy) return;

    if (!name.trim() || !email.trim()) {
      setSubmitState({ status: "error", message: "Completa nombre y correo electrónico antes de enviar el pedido." });
      return;
    }

    if (!paymentMethod || total <= 0) {
      setSubmitState({
        status: "error",
        message: "Revisa la edición o los módulos elegidos y el método de pago antes de enviar el pedido.",
      });
      return;
    }

    if (!Object.values(confirmations).every(Boolean)) {
      setSubmitState({ status: "error", message: "Debes aceptar todas las condiciones obligatorias antes de enviar el pedido." });
      return;
    }

    const payload: InventoryPayload = {
      name,
      email,
      requestType,
      newMode,
      owned,
      wanted,
      paymentMethod,
      confirmations,
      marketingAccepted,
      total,
    };

    try {
      setSubmitState({ status: "submitting", message: "Estoy enviando tu pedido. Un momento, por favor." });
      const result = await submitForm("inventory_order", payload);
      setSubmitState({
        status: "success",
        message: "Tu pedido se ha enviado correctamente. A continuación tienes los datos de pago según el método elegido. Cuando compruebe el pago, generaré el código de activación de un solo uso y prepararé en tu zona privada la información y los recursos asociados a tu compra.",
        reference: result.reference ?? null,
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "No se ha podido enviar el pedido. Inténtalo de nuevo en unos minutos.",
      });
    }
  };

  return (
    <div className="form-grid">
      <div className="card">
        <div className="form-stack">
          <Field label="Nombre completo" value={name} onChange={setName} placeholder="Tu nombre" disabled={isLocked || isBusy} />
          <Field
            label="Email para gestionar tu pedido y zona privada"
            value={email}
            onChange={setEmail}
            placeholder="tuemail@ejemplo.com"
            disabled={isLocked || isBusy}
          />
          <SelectField label="Tipo de pedido" value={requestType} onChange={(v) => { setRequestType(v); setNewMode(""); setOwned([]); setWanted([]); setSubmitState({ status: "idle", message: "" }); }} options={[ { value: "new", label: "Compra nueva" }, { value: "addons", label: "Ya tengo Inventario Profesional y quiero añadir módulo(s)" }, ]} disabled={isLocked || isBusy} />
          {requestType === "new" ? <SelectField label="¿Qué quieres adquirir?" value={newMode} onChange={setNewMode} options={[ { value: "base-only", label: "Inventario Profesional — edición base — 16,00 €" }, { value: "with-addons", label: "Edición base con módulos opcionales" }, ]} disabled={isLocked || isBusy} /> : null}
          {((requestType === "new" && newMode === "with-addons") || requestType === "addons") ? (
            <div className="status-box">
              {requestType === "addons" ? (
                <div style={{ marginBottom: 16 }}>
                  <div className="label">Módulos que ya tienes</div>
                  <div className="form-stack">
                    {complementOptions.map((item) => (
                      <CheckRow key={`owned-${item.value}`} checked={owned.includes(item.value)} disabled={isLocked || isBusy} onChange={() => toggleOwned(item.value)} label={item.label.replace(" — +4,00 €", "")} />
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="label">Módulos que quieres adquirir</div>
              <div className="form-stack">
                {complementOptions.map((item) => (
                  <CheckRow key={`wanted-${item.value}`} checked={wanted.includes(item.value)} disabled={owned.includes(item.value) || isLocked || isBusy} onChange={() => toggleWanted(item.value)} label={item.label} />
                ))}
              </div>
            </div>
          ) : null}
          <SelectField label="Método de pago" value={paymentMethod} onChange={setPaymentMethod} options={[{ value: "bizum", label: "Bizum (España)" }, { value: "paypal", label: "PayPal (Internacional / Alternativa)" }]} disabled={isLocked || isBusy} />
        </div>
      </div>
      <div className="form-stack">
        <div className="card">
          <div className="badge badge-soft">Resumen automático</div>
          <h3 className="serif">Importe total del pedido</h3>
          <p className="total-amount serif">{formatEuro(total)}</p>
        </div>
        <div className="card">
          <div className="badge">Condiciones</div>
          <Conditions
            value={confirmations}
            onChange={setConfirmations}
            disabled={isLocked || isBusy}
            variant="inventory"
          />
        </div>
        <div className="card">
          <div className="badge badge-sage">Privacidad</div>
          <OrderPrivacyNotice />
          <div style={{ marginTop: 16 }}>
            <CheckRow checked={marketingAccepted} disabled={isLocked || isBusy} onChange={setMarketingAccepted} label="Quiero recibir por email novedades, actualizaciones y nuevos lanzamientos de Bordando con Fru." />
          </div>
        </div>
        <div className="status-box">
          <div className="badge badge-sage">Estado</div>
          <p className="muted">Pedido listo para enviar: <strong style={{ color: "var(--text)" }}>{ready ? "sí" : "todavía no"}</strong></p>
          {isLocked ? (
            <div className="button-row">
              <button className="btn-secondary" type="button" onClick={resetForm}>Enviar otro pedido</button>
            </div>
          ) : (
            <button className="btn-primary" disabled={isBusy} onClick={handleSubmit}>{isBusy ? "Enviando…" : "Pedido con obligación de pago"}</button>
          )}
          <div style={{ marginTop: 16 }}>
            <SubmitFeedback state={submitState} />
          </div>
        </div>
        {isLocked ? (
          <div ref={paymentRef}>
            <PaymentInstructions
              paymentMethod={paymentMethod}
              total={total}
              reference={submitState.reference}
              afterPaymentText="Cuando compruebe el pago, generaré el código de activación de un solo uso y prepararé en tu zona privada los datos de la licencia, los módulos adquiridos y los recursos necesarios para realizar la primera activación de Inventario Profesional."
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
