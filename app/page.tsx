import type { Metadata } from "next";
import { Card, InfoBadge, PrimaryLink, SecondaryLink, SectionTitle } from "@/components/UI";
import HomeNewsSection from "@/components/HomeNewsSection";
import ThreadEquivalenceDownloadForm from "@/components/ThreadEquivalenceDownloadForm";

export const metadata: Metadata = {
  title: "Bordando con Fru | Punto de cruz, herramientas digitales y organización",
  description:
    "Contenido de punto de cruz, herramientas digitales para organizar proyectos de bordado, inventario de hilos y materiales, seguimiento de avances y Club de Lectura.",
};

export default function HomePage() {
  const purchaseSteps = [
    {
      num: "1",
      title: "Elige tu herramienta",
      text: "Consulta la información del producto y decide qué versión o complemento encaja mejor con tu forma de organizarte.",
    },
    {
      num: "2",
      title: "Rellena el pedido",
      text: "Completa el formulario correspondiente desde la web indicando el email al que quieres asociar tu compra.",
    },
    {
      num: "3",
      title: "Realiza el pago",
      text: "Al finalizar el pedido verás el importe total y las instrucciones para pagar por PayPal o Bizum.",
    },
    {
      num: "4",
      title: "Accede a tu zona privada",
      text: "Tras comprobar el pago, asignaré el producto a tu email y recibirás una invitación para acceder a tus recursos desde la web.",
    },
  ];

  return (
    <main>
      <section className="section">
        <div className="container hero">
          <div>
            <div className="eyebrow-pill">
              Punto de cruz · YouTube · Herramientas digitales
            </div>

            <h1 className="serif">
              Punto de cruz, inspiración y herramientas para organizar tus proyectos de bordado
            </h1>

            <p>
              Bienvenida a Bordando con Fru, un espacio para disfrutar del punto de cruz con calma,
              inspiración y sistemas digitales pensados para ayudarte a organizar tus materiales,
              registrar tus avances y seguir tus proyectos de bordado de una forma más clara.
            </p>

            <div className="button-row">
              <PrimaryLink href="/#herramientas">
                Ver herramientas
              </PrimaryLink>

              <SecondaryLink href="https://www.youtube.com/@stitchingwithfru" newTab>
                Ir al canal de YouTube
              </SecondaryLink>
            </div>
          </div>

          <Card soft>
            <div className="feature-grid">
              <div className="feature-panel">
                <div className="feature-icon" style={{ color: "#C7866A" }}>
                  ✦
                </div>

                <div>
                  <div className="serif feature-panel-title">
                    Borda conmigo
                  </div>

                  <p className="muted">
                    Vídeos, charlas y contenido cercano para disfrutar más del proceso creativo.
                  </p>
                </div>
              </div>

              <div className="feature-panel">
                <div className="feature-icon" style={{ color: "#A8B8A3" }}>
                  ▣
                </div>

                <div>
                  <div className="serif feature-panel-title">
                    Herramientas digitales
                  </div>

                  <p className="muted">
                    Sistemas en Google Sheets para organizar tus avances, hilos, telas, kits y proyectos.
                  </p>
                </div>
              </div>

              <div className="card" style={{ background: "var(--soft)" }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>
                  Zona privada
                </div>

                <div
                  className="serif feature-panel-title"
                  style={{ fontSize: 32, margin: "0 0 8px" }}
                >
                  Tus recursos siempre a mano
                </div>

                <p className="muted">
                  Si ya has comprado una herramienta, podrás acceder a tus plantillas,
                  manuales y vídeos desde tu espacio privado.
                </p>

                <div className="button-row" style={{ marginTop: 18 }}>
                  <SecondaryLink href="/acceso-clientes">
                    Ir a Mi espacio
                  </SecondaryLink>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <HomeNewsSection />

      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Sobre mí"
            title="Bienvenida a Bordando con Fru"
            description="Comparto contenido sobre punto de cruz y desarrollo herramientas digitales pensadas para hacer más sencilla la organización de tus proyectos, materiales y avances."
          />

          <Card>
            <div className="list">
              <p>
                Bordando con Fru nace de una mezcla entre creatividad, organización y amor por el punto de cruz.
              </p>

              <p>
                Aquí encontrarás contenido para acompañarte mientras bordas, pero también herramientas prácticas para que puedas tener tus proyectos más claros, tus materiales mejor organizados y tus avances más visibles.
              </p>

              <p>
                La idea es ayudarte a disfrutar más del proceso, sin que la organización se convierta en una carga.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft" id="herramientas">
        <div className="container">
          <SectionTitle
            eyebrow="Herramientas destacadas"
            title="Herramientas digitales para organizar tu punto de cruz"
            description="Dos sistemas principales para ayudarte a llevar el seguimiento de tus bordados y organizar tus materiales dentro del entorno Google."
          />

          <div className="grid-2">
            <Card>
              <InfoBadge tone="sage">Disponible</InfoBadge>

              <div className="serif feature-panel-title">
                Sistema de Seguimiento de Punto de Cruz
              </div>

              <p className="muted">
                Para registrar tus cruces bordadas, consultar tu progreso y llevar un seguimiento más claro de tus proyectos de bordado.
              </p>

              <PrimaryLink href="/herramientas/seguimiento">
                Ver Sistema de Seguimiento
              </PrimaryLink>
            </Card>

            <Card>
              <InfoBadge>Disponible</InfoBadge>

              <div className="serif feature-panel-title">
                Sistema de Inventario Profesional
              </div>

              <p className="muted">
                Para organizar tus hilos, telas, kits, proyectos y materiales de punto de cruz con un sistema modular que puedes ampliar poco a poco.
              </p>

              <PrimaryLink href="/herramientas/inventario">
                Ver Sistema de Inventario
              </PrimaryLink>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: "grid", gap: 20 }}>
            <ThreadEquivalenceDownloadForm />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Cómo funciona"
            title="Un proceso de compra sencillo y con acceso privado"
            description="Después de hacer tu pedido, tus recursos quedarán asociados a tu email para que puedas acceder a ellos desde la web."
          />

          <div className="grid-4">
            {purchaseSteps.map((step) => (
              <Card key={step.num}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    background: "#efe6e2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>

                <div className="serif step-card-title">
                  {step.title}
                </div>

                <p className="muted">
                  {step.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}