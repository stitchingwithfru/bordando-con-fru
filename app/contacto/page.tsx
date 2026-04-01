import { Card, InfoBadge, SecondaryLink, SectionTitle } from "@/components/UI";

export default function ContactPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Página aparte" title="Contacto" description="Una página pensada para resolver dudas antes del pedido o para consultas relacionadas con el contenido y las herramientas." />
          <div className="form-grid">
            <Card>
              <h2 className="serif">Escríbeme</h2>
              <div className="form-stack">
                <div className="field"><label>Nombre</label><input className="input" placeholder="Tu nombre" /></div>
                <div className="field"><label>Correo electrónico</label><input className="input" placeholder="tuemail@ejemplo.com" /></div>
                <div className="field"><label>Asunto</label><input className="input" placeholder="Motivo de tu consulta" /></div>
                <div className="field"><label>Mensaje</label><textarea className="textarea" placeholder="Escribe aquí tu consulta" /></div>
                <button className="btn-primary">Enviar mensaje</button>
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
