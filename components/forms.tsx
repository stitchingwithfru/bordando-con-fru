"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ConfirmationState = {
  manual: boolean;
  copy: boolean;
  refunds: boolean;
  waiver: boolean;
};

function Field({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder = "Selecciona una opción" }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function CheckRow({ checked, onChange, label, disabled = false }: { checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode; disabled?: boolean; }) {
  return (
    <label className="checkbox-row" style={disabled ? { opacity: 0.5 } : undefined}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function Conditions({ value, onChange }: { value: ConfirmationState; onChange: React.Dispatch<React.SetStateAction<ConfirmationState>>; }) {
  return (
    <div className="form-stack">
      <CheckRow checked={value.manual} onChange={(v) => onChange((p) => ({ ...p, manual: v }))} label="Entiendo que es un producto digital con entrega manual." />
      <CheckRow checked={value.copy} onChange={(v) => onChange((p) => ({ ...p, copy: v }))} label="Entiendo que recibiré el contenido en el correo electrónico facilitado en el pedido." />
      <CheckRow checked={value.refunds} onChange={(v) => onChange((p) => ({ ...p, refunds: v }))} label="Entiendo que, una vez entregado el acceso al contenido digital, no se aceptan devoluciones." />
      <CheckRow checked={value.waiver} onChange={(v) => onChange((p) => ({ ...p, waiver: v }))} label={<>Solicito la entrega del contenido digital y acepto estas <Link href="/condiciones-compra">Condiciones de compra</Link>.</>} />
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
      <p className="legal-text">Destinatarios: no cedemos tus datos a terceros.</p>
      <p className="legal-text">Derechos: puedes acceder, rectificar o suprimir tus datos escribiendo a <a href="mailto:stitchingwithfru@gmail.com">stitchingwithfru@gmail.com</a>.</p>
      <p className="legal-text">Más información en la <Link href="/politica-privacidad">Política de privacidad</Link>.</p>
    </div>
  );
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
  const ready = Boolean(name && email && paymentMethod && total > 0 && Object.values(confirmations).every(Boolean));

  return (
    <div className="form-grid">
      <div className="card">
        <div className="form-stack">
          <Field label="Nombre completo" value={name} onChange={setName} placeholder="Tu nombre" />
          <Field label="Email de contacto" value={email} onChange={setEmail} placeholder="tuemail@ejemplo.com" />
          <SelectField label="Tipo de pedido" value={requestType} onChange={(v) => { setRequestType(v); setNewVersion(""); setCurrentVersion(""); setUpgradeVersion(""); }} options={[{ value: "new", label: "Compra nueva" }, { value: "upgrade", label: "Ya adquirí el sistema y quiero una versión superior" }]} />
          {requestType === "new" ? <SelectField label="¿Qué versión quieres adquirir?" value={newVersion} onChange={setNewVersion} options={newOptions.map((i) => ({ value: i.value, label: i.label }))} /> : null}
          {requestType === "upgrade" ? (
            <>
              <SelectField label="¿Qué versión tienes?" value={currentVersion} onChange={(v) => { setCurrentVersion(v); setUpgradeVersion(""); }} options={[{ value: "lite", label: "LITE" }, { value: "youtube-lite", label: "YOUTUBE LITE" }, { value: "pro", label: "PRO" }]} />
              <SelectField label="¿Qué versión quieres adquirir?" value={upgradeVersion} onChange={setUpgradeVersion} options={safeUpgradeOptions.map((i) => ({ value: i.value, label: i.label }))} placeholder={currentVersion ? "Selecciona la mejora" : "Primero indica tu versión actual"} />
            </>
          ) : null}
          <SelectField label="Método de pago" value={paymentMethod} onChange={setPaymentMethod} options={[{ value: "bizum", label: "Bizum (España)" }, { value: "paypal", label: "PayPal (Internacional / Alternativa)" }]} />
        </div>
      </div>
      <div className="form-stack">
        <div className="card">
          <div className="badge badge-soft">Resumen automático</div>
          <h3 className="serif">Importe total del pedido</h3>
          <p className="total-amount serif">{total.toFixed(2).replace(".", ",")} €</p>
        </div>
        <div className="card">
          <div className="badge">Condiciones</div>
          <Conditions value={confirmations} onChange={setConfirmations} />
        </div>
        <div className="card">
          <div className="badge badge-sage">Privacidad</div>
          <OrderPrivacyNotice />
          <div style={{ marginTop: 16 }}>
            <CheckRow checked={marketingAccepted} onChange={setMarketingAccepted} label="Quiero recibir por email novedades, actualizaciones y nuevos lanzamientos de Bordando con Fru." />
          </div>
        </div>
        <div className="status-box">
          <div className="badge badge-sage">Estado</div>
          <p className="muted">Pedido listo para enviar: <strong style={{ color: "var(--text)" }}>{ready ? "sí" : "todavía no"}</strong></p>
          <button className="btn-primary" disabled={!ready}>Enviar pedido</button>
        </div>
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

  const complementOptions = [
    { value: "telas", label: "Complemento de Telas — +2,00 €" },
    { value: "kits", label: "Complemento de Kits/Proyectos — +2,00 €" },
    { value: "calculadora", label: "Complemento de Calculadora de Tela e Hilos — +2,00 €" },
  ];

  const toggleWanted = (value: string) => setWanted((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
  const toggleOwned = (value: string) => {
    setOwned((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
    setWanted((prev) => prev.filter((x) => x !== value));
  };

  const total = useMemo(() => {
    const addons = wanted.length * 2;
    if (requestType === "new") {
      if (newMode === "base-only") return 9.99;
      if (newMode === "with-addons") return 9.99 + addons;
      return 0;
    }
    if (requestType === "addons") return addons;
    return 0;
  }, [requestType, newMode, wanted]);

  const ready = Boolean(name && email && paymentMethod && total > 0 && Object.values(confirmations).every(Boolean));

  return (
    <div className="form-grid">
      <div className="card">
        <div className="form-stack">
          <Field label="Nombre completo" value={name} onChange={setName} placeholder="Tu nombre" />
          <Field label="Email de contacto" value={email} onChange={setEmail} placeholder="tuemail@ejemplo.com" />
          <SelectField label="Tipo de pedido" value={requestType} onChange={(v) => { setRequestType(v); setNewMode(""); setOwned([]); setWanted([]); }} options={[{ value: "new", label: "Compra nueva" }, { value: "addons", label: "Ya adquirí el sistema y quiero complemento(s)" }]} />
          {requestType === "new" ? <SelectField label="¿Qué quieres adquirir?" value={newMode} onChange={setNewMode} options={[{ value: "base-only", label: "Solo el sistema base — 9,99 €" }, { value: "with-addons", label: "Sistema base con complementos" }]} /> : null}
          {((requestType === "new" && newMode === "with-addons") || requestType === "addons") ? (
            <div className="status-box">
              {requestType === "addons" ? (
                <div style={{ marginBottom: 16 }}>
                  <div className="label">Complementos que ya tiene la clienta</div>
                  <div className="form-stack">
                    {complementOptions.map((item) => (
                      <CheckRow key={`owned-${item.value}`} checked={owned.includes(item.value)} onChange={() => toggleOwned(item.value)} label={item.label.replace(" — +2,00 €", "")} />
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="label">Complementos que quiere adquirir</div>
              <div className="form-stack">
                {complementOptions.map((item) => (
                  <CheckRow key={`wanted-${item.value}`} checked={wanted.includes(item.value)} disabled={owned.includes(item.value)} onChange={() => toggleWanted(item.value)} label={item.label} />
                ))}
              </div>
            </div>
          ) : null}
          <SelectField label="Método de pago" value={paymentMethod} onChange={setPaymentMethod} options={[{ value: "bizum", label: "Bizum (España)" }, { value: "paypal", label: "PayPal (Internacional / Alternativa)" }]} />
        </div>
      </div>
      <div className="form-stack">
        <div className="card">
          <div className="badge badge-soft">Resumen automático</div>
          <h3 className="serif">Importe total del pedido</h3>
          <p className="total-amount serif">{total.toFixed(2).replace(".", ",")} €</p>
        </div>
        <div className="card">
          <div className="badge">Condiciones</div>
          <Conditions value={confirmations} onChange={setConfirmations} />
        </div>
        <div className="card">
          <div className="badge badge-sage">Privacidad</div>
          <OrderPrivacyNotice />
          <div style={{ marginTop: 16 }}>
            <CheckRow checked={marketingAccepted} onChange={setMarketingAccepted} label="Quiero recibir por email novedades, actualizaciones y nuevos lanzamientos de Bordando con Fru." />
          </div>
        </div>
        <div className="status-box">
          <div className="badge badge-sage">Estado</div>
          <p className="muted">Pedido listo para enviar: <strong style={{ color: "var(--text)" }}>{ready ? "sí" : "todavía no"}</strong></p>
          <button className="btn-primary" disabled={!ready}>Enviar pedido</button>
        </div>
      </div>
    </div>
  );
}
