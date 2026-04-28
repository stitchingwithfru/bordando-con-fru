import { Card, InfoBadge, PrimaryLink, SecondaryLink, SectionTitle } from "@/components/UI";
import HomeNewsSection from "@/components/HomeNewsSection";

export default function HomePage() {
  const purchaseSteps = [
    { num: "1", title: "Elige tu herramienta", text: "Consulta la información del producto y decide qué versión o complemento necesitas." },
    { num: "2", title: "Rellena el pedido", text: "Completa el formulario correspondiente desde la propia web, de forma cómoda." },
    { num: "3", title: "Realiza el pago", text: "Verás el importe total y las instrucciones de pago por PayPal o Bizum al finalizar el pedido." },
    { num: "4", title: "Recibe tu compra", text: "Tras comprobar el pago, recibirás por email el acceso al contenido y el material de ayuda." },
  ];

  return (
    <main>
      <section className="section">
        <div className="container hero">
          <div>
            <div className="eyebrow-pill">Punto de cruz · YouTube · Herramientas digitales</div>
            <h1 className="serif">Un espacio de punto de cruz, inspiración y herramientas para organizar tus proyectos</h1>
            <p>
              Aquí encontrarás mi contenido sobre punto de cruz y una selección de herramientas digitales pensadas para ayudarte a seguir, organizar y disfrutar tus proyectos de bordado.
            </p>
            <div className="button-row">
              <PrimaryLink href="/#herramientas">Ver herramientas</PrimaryLink>
              <SecondaryLink href="https://www.youtube.com/@stitchingwithfru" newTab>Ir al canal</SecondaryLink>
            </div>
          </div>
          <Card soft>
            <div className="feature-grid">
              <div className="feature-panel">
                <div className="feature-icon" style={{ color: "#C7866A" }}>✦</div>
                <div>
                  <h3 className="serif">Borda conmigo</h3>
                  <p className="muted">Contenido cercano y creativo para disfrutar del proceso.</p>
                </div>
              </div>
              <div className="feature-panel">
                <div className="feature-icon" style={{ color: "#A8B8A3" }}>▣</div>
                <div>
                  <h3 className="serif">Herramientas</h3>
                  <p className="muted">Sistemas digitales para organizar materiales y avances.</p>
                </div>
              </div>
              <div className="card" style={{ background: "var(--soft)" }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Experiencia de compra</div>
                <h3 className="serif" style={{ fontSize: 32, margin: "0 0 8px" }}>Pedidos claros, bonitos y sencillos</h3>
                <p className="muted">Descubre cada herramienta, elige la opción que necesites y realiza tu pedido de forma clara y sencilla.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <HomeNewsSection />

      <section className="section section-soft">
        <div className="container">
          <SectionTitle eyebrow="Sobre mí" title="Bienvenida a Bordando con Fru" description="Comparto contenido sobre punto de cruz y desarrollo herramientas digitales pensadas para hacer más fácil la organización de tus proyectos, materiales y avances." />
        </div>
      </section>

      <section className="section section-soft" id="herramientas">
        <div className="container">
          <SectionTitle eyebrow="Herramientas destacadas" title="Dos herramientas principales para empezar" description="Una vista rápida de los sistemas principales, con acceso al detalle completo desde sus páginas de producto." />
          <div className="grid-2">
            <Card>
              <InfoBadge tone="sage">Disponible</InfoBadge>
              <h3 className="serif">Sistema de Seguimiento de Punto de Cruz</h3>
              <p className="muted">Para registrar tus cruces bordadas y consultar tu progreso por periodos.</p>
              <PrimaryLink href="/herramientas/seguimiento">Ver producto</PrimaryLink>
            </Card>
            <Card>
              <InfoBadge>Disponible</InfoBadge>
              <h3 className="serif">Sistema de Inventario Profesional</h3>
              <p className="muted">Un sistema base de inventario de hilos al que puedes añadir complementos para ampliar sus funcionalidades.</p>
              <PrimaryLink href="/herramientas/inventario">Ver producto</PrimaryLink>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Cómo funciona" title="Un proceso de compra sencillo y claro" />
          <div className="grid-4">
            {purchaseSteps.map((step) => (
              <Card key={step.num}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "#efe6e2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{step.num}</div>
                <h3 className="serif">{step.title}</h3>
                <p className="muted">{step.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
