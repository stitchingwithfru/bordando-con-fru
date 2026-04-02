"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, InfoBadge, SecondaryLink, SectionTitle } from "@/components/UI";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const ready = useMemo(() => Boolean(name && email && subject && message && privacyAccepted), [name, email, subject, message, privacyAccepted]);

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Página aparte" title="Contacto" description="Una página pensada para resolver dudas antes del pedido o para consultas relacionadas con el contenido y las herramientas." />
          <div className="form-grid">
            <Card>
              <h2 className="serif">Escríbeme</h2>
              <div className="form-stack">
                <div className="field"><label>Nombre</label><input className="input" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="field"><label>Correo electrónico</label><input className="input" placeholder="tuemail@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="field"><label>Asunto</label><input className="input" placeholder="Motivo de tu consulta" value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
                <div className="field"><label>Mensaje</label><textarea className="textarea" placeholder="Escribe aquí tu consulta" value={message} onChange={(e) => setMessage(e.target.value)} /></div>

                <div className="legal-box">
                  <p className="legal-text"><strong style={{ color: "var(--text)" }}>Información básica sobre protección de datos</strong></p>
                  <p className="legal-text">Responsable: <strong style={{ color: "var(--text)" }}>Bordando con Fru</strong>.</p>
                  <p className="legal-text">Finalidad: atender tu consulta y comunicarnos contigo en relación con ella. Si lo autorizas expresamente, también podremos enviarte información sobre novedades y nuevos lanzamientos.</p>
                  <p className="legal-text">Legitimación: consentimiento de la persona interesada.</p>
                  <p className="legal-text">Destinatarios: no cedemos tus datos a terceros.</p>
                  <p className="legal-text">Derechos: puedes acceder, rectificar o suprimir tus datos escribiendo a <a href="mailto:stitchingwithfru@gmail.com">stitchingwithfru@gmail.com</a>.</p>
                  <p className="legal-text">Más información en la <Link href="/politica-privacidad">Política de privacidad</Link>.</p>
                </div>

                <label className="checkbox-row">
                  <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />
                  <span>He leído y acepto la <Link href="/politica-privacidad">Política de privacidad</Link>.</span>
                </label>

                <label className="checkbox-row">
                  <input type="checkbox" checked={marketingAccepted} onChange={(e) => setMarketingAccepted(e.target.checked)} />
                  <span>Quiero recibir por email novedades, actualizaciones y nuevos lanzamientos de Bordando con Fru.</span>
                </label>

                <button className="btn-primary" disabled={!ready}>Enviar mensaje</button>
              </div>
            </Card>
            <div className="form-stack">
              <Card>
                <InfoBadge>Antes de comprar</InfoBadge>
                <h2 className="serif">Consultas previas al pedido</h2>
                <p className="muted">Si tienes dudas sobre una herramienta, una versión o un complemento, desde esta página puedes escribirme antes de hacer tu pedido.</p>
              </Card>
              <Card>
                <InfoBadge tone="sage">Otras vías</InfoBadge>
                <h2 className="serif">También podrás encontrarme aquí</h2>
                <div className="list">
                  <p>• <a href="https://www.youtube.com/@stitchingwithfru" target="_blank" rel="noopener noreferrer">Canal de YouTube</a></p>
                  <p>• <a href="https://www.instagram.com/stitchingwithfru/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                  <p>• <a href="https://www.facebook.com/stitchingwithfru" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                  <p>• <a href="mailto:stitchingwithfru@gmail.com">stitchingwithfru@gmail.com</a></p>
                  <p>• <a href="https://chat.whatsapp.com/HMuWzrMjxyxJbV1piAQpDc" target="_blank" rel="noopener noreferrer">Comunidad de WhatsApp</a></p>
                  <p>• <a href="https://ko-fi.com/stitchingwithfru" target="_blank" rel="noopener noreferrer">☕️ Ko-fi / Cómprame un café</a></p>
                </div>
                <div className="button-row" style={{ marginTop: 24 }}>
                  <SecondaryLink href="/faq">Ver FAQ</SecondaryLink>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
