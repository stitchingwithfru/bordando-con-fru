import type { Metadata } from "next";
import { Card, InfoBadge, PrimaryLink, SecondaryLink, SectionTitle } from "@/components/UI";

export const metadata: Metadata = {
  title: "Sistema de Seguimiento de Punto de Cruz | Bordando con Fru",
  description:
    "Herramienta digital en Google Sheets para registrar cruces bordadas, organizar tus proyectos de punto de cruz y consultar tus avances de forma clara.",
};

export default function SeguimientoPage() {
  const versions = [
    {
      name: "LITE",
      price: "4,99 €",
      text: "Incluye el sistema base en Google Sheets para registrar tus cruces bordadas y consultar tu progreso de forma sencilla.",
    },
    {
      name: "YOUTUBE LITE",
      price: "6,99 €",
      text: "Incluye el sistema base y un espacio de estadísticas y gráficos para consultar datos acumulados según el periodo elegido.",
    },
    {
      name: "PRO",
      price: "9,99 €",
      text: "Incluye App Forms para registrar las cruces desde el móvil sin necesidad de entrar en el Sheet.",
    },
    {
      name: "YOUTUBE PRO",
      price: "12,99 €",
      text: "Incluye el sistema más completo: App Forms, estadísticas y gráficos para llevar un seguimiento más visual y cómodo.",
    },
  ];

  const includes = [
    "Sistema digital en Google Sheets para llevar el seguimiento de tus cruces bordadas.",
    "Registro de avances para visualizar mejor tu progreso en cada proyecto.",
    "Distintas versiones según tu perfil y las funcionalidades que quieras utilizar.",
    "En algunas versiones, estadísticas y gráficos para analizar tu evolución.",
    "En algunas versiones, registro desde el móvil mediante App Forms, sin necesidad de entrar en el Sheet.",
    "Entrega con manual en PDF y vídeo tutorial para que puedas empezar paso a paso.",
  ];

  const faqs = [
    {
      q: "¿Qué diferencia hay entre las versiones del sistema de seguimiento?",
      a: "Cada versión está pensada para una necesidad distinta. Algunas incluyen solo el sistema base para registrar cruces bordadas, mientras que otras añaden estadísticas, gráficos o la posibilidad de registrar avances desde el móvil mediante App Forms.",
    },
    {
      q: "¿Puedo mejorar mi versión más adelante?",
      a: "Sí. Si más adelante quieres pasar a una versión superior, podrás hacerlo. El formulario de pedido te mostrará únicamente las mejoras compatibles con la versión que ya tengas.",
    },
    {
      q: "¿Se puede usar desde el móvil?",
      a: "Sí, en las versiones que incluyen App Forms podrás registrar tus cruces bordadas desde el móvil sin necesidad de entrar directamente en Google Sheets.",
    },
    {
      q: "¿Cómo recibo el sistema después de hacer el pedido?",
      a: "Una vez comprobado el pago, asignaré tu producto al email que hayas indicado en el pedido y recibirás una invitación para crear tu acceso a la zona privada de la web. Desde ahí podrás acceder fácilmente al sistema, al manual en PDF y al vídeo tutorial.",
    },
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Herramienta digital"
            title="Sistema de Seguimiento de Punto de Cruz"
            description="Una herramienta pensada para organizar tus proyectos de bordado, registrar tus cruces bordadas y consultar tus avances de forma clara, visual y sencilla."
          />

          <div style={{ marginBottom: 28 }}>
            <Card>
              <h2 className="serif">Una forma más clara de llevar el seguimiento de tus bordados</h2>
              <div className="list">
                <p>
                  Si te cuesta recordar cuánto has bordado, en qué proyecto has avanzado más o cómo llevar un control de tus cruces sin agobiarte, este sistema está pensado para ti.
                </p>
                <p>
                  El Sistema de Seguimiento de Punto de Cruz te permite registrar tus avances de bordado en un entorno sencillo de Google Sheets, para que puedas ver tu progreso de una forma mucho más organizada.
                </p>
                <p>
                  Está pensado para bordadoras que quieren tener una visión más clara de sus labores, mantener un registro útil de sus proyectos y disfrutar también de la parte bonita de ver cómo avanzan.
                </p>
              </div>
            </Card>
          </div>

          <div className="grid-2" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
            <Card>
              <h2 className="serif">Qué incluye</h2>
              <div className="list">
                {includes.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </Card>

            <Card soft>
              <InfoBadge>Entrega manual</InfoBadge>
              <h2 className="serif">Cómo lo recibirás</h2>
              <div className="list">
                <p>• Harás el pedido desde la web.</p>
                <p>• Verás los datos para pagar por Bizum o PayPal.</p>
                <p>• Tras comprobar el pago, asignaré tu producto al email que hayas indicado en el pedido.</p>
                <p>• Recibirás una invitación para crear tu acceso a la zona privada de la web.</p>
                <p>• Desde tu espacio personal podrás acceder al Sheet, al manual en PDF y al vídeo tutorial cuando quieras.</p>
              </div>

              <div className="button-row" style={{ marginTop: 24 }}>
                <PrimaryLink href="/pedidos/seguimiento">Hacer pedido</PrimaryLink>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Card>
            <InfoBadge tone="sage">Vídeos</InfoBadge>
            <h2 className="serif">Presentación y demo en YouTube</h2>
            <p className="muted">
              Si quieres ver cómo funciona la herramienta antes de hacer tu pedido, aquí puedes acceder al vídeo de presentación y a una demo más detallada.
            </p>

            <div className="button-row" style={{ marginTop: 24 }}>
              <SecondaryLink href="https://youtu.be/HrWpcgWmIWg" newTab>
                Vídeo de presentación
              </SecondaryLink>
              <SecondaryLink href="https://youtu.be/dOApose0eC0" newTab>
                Vídeo de demo
              </SecondaryLink>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Versiones"
            title="Elige la versión que mejor encaje contigo"
            description="Puedes escoger la opción que mejor se adapte a tu forma de bordar, al nivel de detalle que quieras registrar y a las funciones que te resulten más útiles."
          />

          <div className="grid-2">
            {versions.map((version) => (
              <Card key={version.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <h3 className="serif" style={{ margin: 0 }}>
                    {version.name}
                  </h3>
                  <span className="badge badge-sage price-pill">{version.price}</span>
                </div>

                <p className="muted">{version.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Card>
            <InfoBadge tone="sage">Actualizaciones</InfoBadge>
            <h2 className="serif">Las actualizaciones de tu versión estarán disponibles en tu zona privada</h2>
            <div className="list">
              <p>
                Si en el futuro realizo una mejora significativa de la versión que hayas adquirido, la actualización se añadirá a tu zona privada en la web.
              </p>
              <p>
                Además, recibirás un aviso por email para que sepas que tienes una nueva versión disponible y puedas entrar en tu espacio personal para consultarla.
              </p>
              <p>
                Incluiré también una opción para migrar tus datos desde la versión anterior, para que el cambio te resulte lo más sencillo posible.
              </p>
              <p>
                Esto puede aplicarse, por ejemplo, si incorporo nuevas funcionalidades o mejoras dentro de la misma versión a partir de sugerencias de las usuarias.
              </p>
              <p>
                Los complementos o módulos nuevos que se desarrollen aparte no estarían incluidos y, en ese caso, se adquirirían por separado.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="FAQ"
            title="Preguntas frecuentes sobre el sistema de seguimiento"
          />

          <div className="list">
            {faqs.map((item) => (
              <Card key={item.q}>
                <h3 className="serif">{item.q}</h3>
                <p className="muted">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}