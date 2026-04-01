import { Card, InfoBadge, SecondaryLink, SectionTitle } from "@/components/UI";

export default function FAQPage() {
  const questions = [
    ["¿Cómo se realiza un pedido?", "Eliges la herramienta que te interesa, completas el formulario correspondiente desde la web y, al finalizar, verás las instrucciones de pago por Bizum o PayPal."],
    ["¿Cómo recibo mi pedido?", "La entrega es manual. Una vez comprobado el pago, recibirás por correo electrónico el acceso al sistema junto con el material de ayuda incluido."],
    ["¿Cuánto tarda la entrega?", "La entrega se realiza por email en un plazo aproximado de 24 a 48 horas tras comprobar el pago."],
    ["¿Qué necesito para usar las herramientas?", "Las herramientas están desarrolladas en el entorno Google, así que normalmente necesitarás disponer de una cuenta de Google para poder utilizarlas correctamente."],
    ["¿Se pueden usar desde el móvil?", "Sí, algunas partes se pueden usar también desde móvil mediante App Forms, según la herramienta o la versión adquirida."],
    ["¿Puedo mejorar mi versión más adelante?", "Sí. En el Sistema de Seguimiento de Punto de Cruz, el formulario permitirá indicar qué versión tienes actualmente para mostrarte solo las mejoras posibles."],
    ["¿Los complementos del inventario se pueden comprar más adelante?", "Sí. El Sistema de Inventario Profesional está pensado de forma modular, de modo que puedes empezar por la base y añadir complementos más adelante."],
    ["¿Las mejoras futuras están incluidas?", "Si se produce una mejora significativa de la versión que has adquirido, recibirás la nueva versión por correo electrónico junto con una opción para migrar tus datos desde la anterior. Los complementos o módulos nuevos que se desarrollen aparte se adquirirían por separado."],
    ["¿Se aceptan devoluciones?", "No. Al tratarse de un producto digital con entrega manual y acceso al archivo, una vez entregado no se aceptan devoluciones."],
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" description="Una página pensada para resolver de forma clara las dudas más habituales antes de hacer un pedido." />
          <div className="list">
            {questions.map(([q, a]) => (
              <Card key={q}>
                <h2 className="serif">{q}</h2>
                <p className="muted">{a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Card>
            <InfoBadge>¿Sigues teniendo dudas?</InfoBadge>
            <h2 className="serif">Puedes escribirme antes de hacer tu pedido</h2>
            <p className="muted">Si no encuentras aquí la respuesta que necesitas, puedes utilizar la página de contacto para escribirme antes de hacer tu pedido.</p>
            <SecondaryLink href="/contacto">Ir a contacto</SecondaryLink>
          </Card>
        </div>
      </section>
    </main>
  );
}
