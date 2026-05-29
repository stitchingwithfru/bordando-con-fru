import type { Metadata } from "next";
import { Card, InfoBadge, PrimaryLink, SecondaryLink, SectionTitle } from "@/components/UI";

export const metadata: Metadata = {
  title: "Sistema de Inventario de Hilos y Materiales | Bordando con Fru",
  description:
    "Sistema digital en Google Sheets para organizar hilos, telas, kits, proyectos y materiales de punto de cruz con una estructura modular y flexible.",
};

export default function InventarioPage() {
  const items = [
    {
      name: "Inventario de Hilos + App Forms",
      price: "9,99 €",
      kind: "Sistema base",
      text: "La base del sistema para organizar tus hilos dentro del entorno Google y registrar tu inventario de forma cómoda.",
    },
    {
      name: "Complemento de Telas",
      price: "+2,00 €",
      kind: "Complemento",
      text: "Para añadir al sistema la gestión de telas y mantener toda la información integrada en el mismo inventario.",
    },
    {
      name: "Complemento de Kits/Proyectos",
      price: "+2,00 €",
      kind: "Complemento",
      text: "Para incorporar la gestión de kits y proyectos dentro del inventario, junto con el resto de tus materiales.",
    },
    {
      name: "Complemento de Calculadora de Tela e Hilos",
      price: "+2,00 €",
      kind: "Complemento",
      text: "Para sumar una calculadora de materiales y estimar necesidades de tela e hilos dentro del mismo ecosistema.",
    },
  ];

  const faqs = [
    {
      q: "¿Puedo comprar solo el sistema base?",
      a: "Sí. Puedes empezar solo con el sistema base de inventario de hilos y, más adelante, añadir complementos si los necesitas.",
    },
    {
      q: "¿Los complementos se pueden adquirir más adelante?",
      a: "Sí. El sistema está planteado de forma modular, así que puedes ampliarlo poco a poco según tu forma de organizarte.",
    },
    {
      q: "¿Qué pasa si ya tengo el sistema y quiero ampliar?",
      a: "El formulario distingue entre compra nueva y compra de complementos, para que puedas pedir solo aquello que necesitas en cada momento.",
    },
    {
      q: "¿Cómo recibo el inventario después de hacer el pedido?",
      a: "Una vez comprobado el pago, asignaré tu producto al email que hayas indicado en el pedido y recibirás una invitación para crear tu acceso a la zona privada de la web. Desde ahí podrás acceder al sistema y al vídeo tutorial.",
    },
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Herramienta digital"
            title="Sistema de Inventario Profesional"
            description="Un sistema digital y modular para organizar tus hilos, telas, kits, proyectos y materiales de punto de cruz dentro del entorno Google."
          />

          <div style={{ marginBottom: 28 }}>
            <Card>
              <h2 className="serif">Organiza tus materiales de bordado sin perderte</h2>
              <div className="list">
                <p>
                  Si tienes hilos repartidos, telas guardadas, kits pendientes o proyectos empezados, es fácil perder la visión general de todo lo que tienes.
                </p>
                <p>
                  El Sistema de Inventario Profesional está pensado para ayudarte a organizar tus materiales de punto de cruz de una forma más clara, práctica y flexible.
                </p>
                <p>
                  Puedes empezar con el inventario base de hilos y ampliar el sistema con complementos según lo que realmente necesites.
                </p>
              </div>
            </Card>
          </div>

          <div className="grid-2" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
            <Card>
              <h2 className="serif">Cómo está planteado</h2>
              <div className="list">
                <p>• El sistema parte de una base principal: inventario de hilos con App Forms.</p>
                <p>• A partir de ahí, puedes añadir complementos según lo que realmente necesites.</p>
                <p>• La idea es que puedas crecer poco a poco sin tener que adquirirlo todo de golpe.</p>
                <p>• Todo está pensado para mantenerse claro, práctico y dentro del entorno Google.</p>
                <p>• La entrega incluye acceso al sistema y vídeo tutorial.</p>
              </div>
            </Card>

            <Card soft>
              <InfoBadge tone="sage">Entrega manual</InfoBadge>
              <h2 className="serif">Cómo lo recibirás</h2>
              <div className="list">
                <p>• Harás el pedido desde la web.</p>
                <p>• Verás los datos para pagar por Bizum o PayPal.</p>
                <p>• Tras comprobar el pago, asignaré tu producto al email que hayas indicado en el pedido.</p>
                <p>• Recibirás una invitación para crear tu acceso a la zona privada de la web.</p>
                <p>• Desde tu espacio personal podrás acceder al Sheet y al vídeo tutorial cuando quieras.</p>
              </div>

              <div className="button-row" style={{ marginTop: 24 }}>
                <PrimaryLink href="/pedidos/inventario">Hacer pedido</PrimaryLink>
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
              Si quieres ver cómo funciona el sistema antes de hacer tu pedido, puedes abrir la presentación y demo en YouTube en una ventana aparte.
            </p>

            <div className="button-row" style={{ marginTop: 24 }}>
              <SecondaryLink href="https://youtu.be/aILUk0xf-bY" newTab>
                Vídeo de presentación y demo
              </SecondaryLink>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Sistema base y complementos"
            title="Una estructura modular y flexible"
            description="Puedes empezar con el inventario base y, si más adelante lo necesitas, añadir los complementos que mejor encajen contigo."
          />

          <div className="grid-2">
            {items.map((item) => (
              <Card key={item.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <InfoBadge>{item.kind}</InfoBadge>
                    <h3 className="serif">{item.name}</h3>
                  </div>
                  <span className="badge badge-sage price-pill">{item.price}</span>
                </div>

                <p className="muted">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <Card>
            <InfoBadge tone="soft">Ampliación del sistema</InfoBadge>
            <h2 className="serif">Pensado para crecer contigo</h2>
            <div className="list">
              <p>
                La idea es que el sistema no se quede cerrado desde el principio.
              </p>
              <p>
                Puedes empezar con la parte base y, a medida que lo necesites, añadir nuevos módulos o complementos.
              </p>
              <p>
                Esto permite que el inventario se adapte mejor a cada persona y a su forma de organizar hilos, telas, kits y proyectos.
              </p>
            </div>
          </Card>

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
            title="Preguntas frecuentes sobre el inventario"
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