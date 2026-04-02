import { Card, InfoBadge, PrimaryLink, SecondaryLink, SectionTitle } from "@/components/UI";

export default function InventarioPage() {
  const items = [
    { name: "Inventario de Hilos + App Forms", price: "9,99 €", kind: "Sistema base", text: "La base del sistema para organizar tus hilos dentro del entorno Google." },
    { name: "Complemento de Telas", price: "+2,00 €", kind: "Complemento", text: "Para añadir al sistema la funcionalidad de gestión de telas y mantenerlo todo integrado." },
    { name: "Complemento de Kits/Proyectos", price: "+2,00 €", kind: "Complemento", text: "Para incorporar la funcionalidad de gestionar kits y proyectos dentro del inventario." },
    { name: "Complemento de Calculadora de Tela e Hilos", price: "+2,00 €", kind: "Complemento", text: "Para sumar la funcionalidad de cálculo de materiales dentro del mismo ecosistema." },
  ];

  const faqs = [
    {
      q: "¿Puedo comprar solo el sistema base?",
      a: "Sí. Puedes empezar solo con el sistema base y, más adelante, decidir si quieres añadir complementos.",
    },
    {
      q: "¿Los complementos se pueden adquirir más adelante?",
      a: "Sí. El sistema está pensado de forma modular, de modo que puedes ampliarlo poco a poco según lo necesites.",
    },
    {
      q: "¿Qué pasa si ya tengo el sistema y quiero ampliar?",
      a: "El formulario distinguirá entre compra nueva y compra de complementos, para que puedas pedir solo aquello que necesites en cada momento.",
    },
    {
      q: "¿Cómo recibo el inventario tras hacer el pedido?",
      a: "Tras comprobar el pago, recibirás por correo electrónico el acceso al sistema y el material de apoyo correspondiente.",
    },
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Página de producto" title="Sistema de Inventario Profesional" description="Un sistema modular pensado para organizar tus materiales, empezar con una base sólida y ampliarlo con complementos según lo que necesites." />
          <div className="grid-2" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
            <Card>
              <h2 className="serif">Cómo está planteado</h2>
              <div className="list">
                <p>• El sistema parte de una base principal: el inventario de hilos y App Forms.</p>
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
                <p>• Tras comprobar el pago, recibirás tu pedido por email en 24/48 horas.</p>
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
            <p className="muted">Si quieres ver cómo funciona el sistema antes de hacer tu pedido, puedes abrir este vídeo en YouTube en una ventana aparte.</p>
            <div className="button-row" style={{ marginTop: 24 }}>
              <SecondaryLink href="https://youtu.be/aILUk0xf-bY" newTab>Vídeo de presentación y demo</SecondaryLink>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle eyebrow="Sistema base y complementos" title="Una estructura modular y flexible" description="Puedes empezar con el sistema base y, si más adelante lo necesitas, añadir los complementos que mejor encajen contigo." />
          <div className="grid-2">
            {items.map((item) => (
              <Card key={item.name}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
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
              <p>La idea es que el sistema no se quede cerrado desde el principio.</p>
              <p>Podrás empezar con la parte base y, a medida que lo necesites, añadir nuevos módulos o complementos.</p>
              <p>Esto permite que el inventario se adapte mejor a cada persona y a su forma de organizarse.</p>
            </div>
          </Card>
          <Card>
            <InfoBadge tone="sage">Actualizaciones</InfoBadge>
            <h2 className="serif">Mejoras futuras incluidas en tu versión</h2>
            <div className="list">
              <p>Si en el futuro realizo una mejora significativa de la versión que hayas adquirido, te haré llegar esa nueva versión por correo electrónico.</p>
              <p>Además, incluiré una opción para migrar tus datos directamente desde la versión anterior, para que el cambio te resulte lo más sencillo posible.</p>
              <p>Esto puede aplicarse, por ejemplo, si incorporo funcionalidades nuevas a partir de sugerencias de las usuarias y esas mejoras pasan a formar parte de tu versión.</p>
              <p>Los complementos o módulos nuevos que se desarrollen aparte no estarían incluidos y, en ese caso, se adquirirían por separado.</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes del inventario" />
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
