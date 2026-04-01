import { Card, InfoBadge, PrimaryLink, SectionTitle } from "@/components/UI";

export default function SeguimientoPage() {
  const versions = [
    { name: "LITE", price: "4,99 €", text: "Incluye el sistema en Google Sheets, sin App Forms." },
    { name: "YOUTUBE LITE", price: "6,99 €", text: "Incluye un espacio de estadísticas y gráficos para disponer de datos acumulados según el periodo elegido. Sin App Forms." },
    { name: "PRO", price: "9,99 €", text: "Incluye App Forms para registrar las cruces sin necesidad de entrar en el Sheet." },
    { name: "YOUTUBE PRO", price: "12,99 €", text: "Incluye el sistema completo: App Forms, estadísticas y gráficos." },
  ];

  const includes = [
    "Sistema digital en Google Sheets para llevar el seguimiento de tus cruces bordadas.",
    "Registro de avances para visualizar mejor tu progreso.",
    "Distintas versiones según tu perfil y las funcionalidades que quieras.",
    "En algunas versiones, estadísticas y funciones adicionales.",
    "En algunas versiones, posibilidad de registrar las cruces desde el móvil sin necesidad de entrar en el Sheet.",
    "Entrega con manual en PDF y vídeo tutorial.",
  ];

  const faqs = [
    {
      q: "¿Qué diferencia hay entre las versiones?",
      a: "Cada versión está pensada para un perfil distinto. Algunas incluyen solo el sistema base, otras añaden estadísticas, gráficos o la posibilidad de registrar desde el móvil mediante App Forms.",
    },
    {
      q: "¿Puedo mejorar mi versión más adelante?",
      a: "Sí. El formulario permitirá indicar qué versión tienes actualmente para mostrarte solo las mejoras posibles desde esa versión concreta.",
    },
    {
      q: "¿Se puede usar desde el móvil?",
      a: "En algunas versiones podrás registrar las cruces desde el móvil mediante App Forms, sin necesidad de entrar en el Sheet.",
    },
    {
      q: "¿Cómo recibo el sistema tras hacer el pedido?",
      a: "Tras comprobar el pago, recibirás por correo electrónico el acceso al sistema y el material de apoyo correspondiente.",
    },
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Página de producto" title="Sistema de Seguimiento de Punto de Cruz" description="Una herramienta pensada para registrar tus cruces bordadas y consultar tus avances de forma clara." />
          <div className="grid-2" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
            <Card>
              <h2 className="serif">Qué incluye</h2>
              <div className="list">{includes.map((item) => <p key={item}>• {item}</p>)}</div>
            </Card>
            <Card soft>
              <InfoBadge>Entrega manual</InfoBadge>
              <h2 className="serif">Cómo lo recibirás</h2>
              <div className="list">
                <p>• Harás el pedido desde la web.</p>
                <p>• Verás los datos para pagar por Bizum o PayPal.</p>
                <p>• Tras comprobar el pago, recibirás tu pedido por email en 24/48 horas.</p>
                <p>• Se entrega enlace al Sheet, manual en PDF y vídeo tutorial.</p>
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
          <SectionTitle eyebrow="Versiones" title="Elige la opción que mejor encaje con lo que necesitas" description="Podrás escoger la versión que mejor se ajuste a tu perfil y a las funcionalidades que quieras utilizar." />
          <div className="grid-2">
            {versions.map((version) => (
              <Card key={version.name}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
                  <h3 className="serif" style={{ margin: 0 }}>{version.name}</h3>
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
          <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes del sistema" />
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
