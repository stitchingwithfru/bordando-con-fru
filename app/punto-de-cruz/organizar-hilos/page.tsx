import type { Metadata } from "next";
import Link from "next/link";
import ThreadEquivalenceDownloadForm from "@/components/ThreadEquivalenceDownloadForm";

export const metadata: Metadata = {
  title: "Cómo organizar tus hilos de punto de cruz | Bordando con Fru",
  description:
    "Guía práctica para organizar tus hilos de punto de cruz, evitar compras repetidas, controlar madejas empezadas y preparar mejor tus proyectos.",
  openGraph: {
    title: "Cómo organizar tus hilos de punto de cruz | Bordando con Fru",
    description:
      "Ideas para ordenar hilos de punto de cruz, llevar un inventario sencillo y preparar tus proyectos sin perder tiempo.",
    url: "https://stitchingwithfru.com/punto-de-cruz/organizar-hilos",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "article",
  },
};

export default function OrganizarHilosPuntoDeCruzPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <style>
          {`
            .article-hero {
              max-width: 920px;
              margin: 0 auto 56px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .article-kicker {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(255,255,255,0.75);
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 7px 14px;
              margin-bottom: 16px;
              color: #8A7C74;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
            }

            .article-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .article-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .article-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .article-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 13px 20px;
              font-size: 15px;
              font-weight: 700;
              text-decoration: none;
              background: #403A36;
              color: #FFFFFF;
              border: 1px solid #403A36;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .article-button.secondary {
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
              box-shadow: none;
            }

            .article-content {
              max-width: 920px;
              margin: 0 auto;
              display: grid;
              gap: 24px;
            }

            .article-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              padding: 30px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .article-card.soft {
              background: #FFF7EF;
            }

            .article-section-title {
              margin: 0 0 14px 0;
              font-family: Georgia, serif;
              font-size: 30px;
              line-height: 1.12;
              color: #403A36;
            }

            .article-text {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.75;
            }

            .article-text + .article-text {
              margin-top: 12px;
            }

            .article-list {
              display: grid;
              gap: 12px;
              margin-top: 16px;
            }

            .article-list p {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.65;
            }

            .article-steps {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 16px;
              margin-top: 18px;
            }

            .article-step {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 18px;
            }

            .article-step-number {
              width: 38px;
              height: 38px;
              border-radius: 999px;
              background: #403A36;
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 15px;
              font-weight: 700;
              margin-bottom: 12px;
            }

            .article-step-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              font-size: 21px;
              line-height: 1.15;
              color: #403A36;
            }

            .article-step-text {
              margin: 0;
              color: #6F655F;
              font-size: 14.5px;
              line-height: 1.55;
            }

            .article-callout {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 18px;
              margin-top: 18px;
            }

            .article-callout-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              font-size: 22px;
              line-height: 1.15;
              color: #403A36;
            }

            .article-callout-text {
              margin: 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            @media (max-width: 800px) {
              .article-steps {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 600px) {
              .article-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 46px;
              }

              .article-title {
                font-size: 36px;
              }

              .article-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .article-actions {
                flex-direction: column;
              }

              .article-button {
                width: 100%;
              }

              .article-card {
                border-radius: 26px;
                padding: 24px 20px;
              }

              .article-section-title {
                font-size: 27px;
              }
            }
          `}
        </style>

        <section className="article-hero">
          <div className="article-kicker">🧵 Organización de hilos</div>

          <h1 className="article-title">
            Cómo organizar tus hilos de punto de cruz sin complicarte
          </h1>

          <p className="article-intro">
            Los hilos de punto de cruz se acumulan casi sin darte cuenta: madejas enteras,
            restos de proyectos, bobinas empezadas, colores repetidos y referencias que no sabes
            si ya tienes. Organizar tus hilos puede ayudarte a preparar mejor tus labores y evitar compras innecesarias.
          </p>

          <div className="article-actions">
            <Link href="/punto-de-cruz" className="article-button secondary">
              ← Volver a Punto de cruz
            </Link>
          </div>
        </section>

        <section className="article-content">
          <article className="article-card">
            <h2 className="article-section-title">
              Por qué los hilos se descontrolan tan rápido
            </h2>

            <p className="article-text">
              En punto de cruz es muy habitual comprar hilos para un proyecto concreto y, con el tiempo,
              terminar con una mezcla de madejas nuevas, hilos empezados, restos guardados y colores que no recuerdas
              si pertenecen a una labor concreta.
            </p>

            <p className="article-text">
              El problema no suele ser tener muchos hilos, sino no saber exactamente qué tienes, dónde está cada color
              y si una madeja está completa, empezada o reservada para un proyecto.
            </p>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Qué información conviene guardar de cada hilo
            </h2>

            <p className="article-text">
              Para llevar un control útil no necesitas apuntarlo absolutamente todo. Lo importante es guardar la información
              que de verdad te ayuda cuando vas a preparar una nueva labor o revisar tus materiales.
            </p>

            <div className="article-list">
              <p>• Marca del hilo, por ejemplo DMC, Anchor, Kreinik o Petite Treasure Braid.</p>
              <p>• Número o referencia del color.</p>
              <p>• Cantidad disponible: madeja completa, empezada, bobina o resto.</p>
              <p>• Ubicación física: caja, archivador, anilla, carpeta o bolsa de proyecto.</p>
              <p>• Si está reservado para un proyecto concreto.</p>
              <p>• Notas especiales: tintada, sustitución de color o equivalencia aproximada.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Empieza por lo mínimo
              </h3>

              <p className="article-callout-text">
                Si ahora mismo tienes muchos hilos sin registrar, no intentes hacerlo todo en una tarde.
                Empieza por los colores que más usas o por los hilos de tu próximo proyecto.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Formas sencillas de organizar hilos físicamente
            </h2>

            <p className="article-text">
              La organización física depende mucho de cómo bordas y del espacio que tienes. Lo importante es que el sistema
              sea fácil de mantener, porque si cuesta demasiado devolver cada hilo a su sitio, acabará desordenándose otra vez.
            </p>

            <div className="article-steps">
              <div className="article-step">
                <div className="article-step-number">1</div>
                <h3 className="article-step-title">Por número</h3>
                <p className="article-step-text">
                  Ordenar por referencia facilita encontrar un color cuando el patrón indica el número exacto.
                </p>
              </div>

              <div className="article-step">
                <div className="article-step-number">2</div>
                <h3 className="article-step-title">Por proyecto</h3>
                <p className="article-step-text">
                  Guardar juntos los hilos de una labor activa ayuda a retomar el proyecto sin buscar cada color.
                </p>
              </div>

              <div className="article-step">
                <div className="article-step-number">3</div>
                <h3 className="article-step-title">Por tipo</h3>
                <p className="article-step-text">
                  Separar mouliné, metalizados, sedas o hilos especiales evita mezclas y pérdidas.
                </p>
              </div>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Cómo evitar comprar hilos repetidos
            </h2>

            <p className="article-text">
              Una de las ventajas de organizar tus hilos es poder revisar lo que tienes antes de comprar materiales.
              Esto es especialmente útil cuando empiezas un proyecto nuevo y el patrón incluye una lista larga de colores.
            </p>

            <div className="article-list">
              <p>• Revisa primero tus madejas completas.</p>
              <p>• Comprueba si tienes restos suficientes para zonas pequeñas.</p>
              <p>• Marca los colores reservados para otros proyectos.</p>
              <p>• Anota si tienes una equivalencia de otra marca que pueda servir.</p>
              <p>• Lleva una lista de compra solo con los colores que realmente te faltan.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Consejo práctico
              </h3>

              <p className="article-callout-text">
                Antes de comprar hilos para un proyecto nuevo, compara la lista del patrón con tu inventario.
                Puede que ya tengas parte de los colores y solo necesites completar algunas referencias.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Qué hacer con madejas empezadas, bobinas y restos
            </h2>

            <p className="article-text">
              Los restos de hilo pueden ser muy útiles, pero también son una de las partes que más desorden genera.
              Si no sabes qué color es o cuánto queda, es fácil que terminen olvidados en una bolsa.
            </p>

            <div className="article-list">
              <p>• Guarda cada resto con su número de color siempre que puedas.</p>
              <p>• Separa restos pequeños de madejas completas.</p>
              <p>• Usa bobinas, tarjetas o bolsitas etiquetadas.</p>
              <p>• Reserva los sobrantes de un proyecto hasta asegurarte de que está terminado del todo.</p>
              <p>• Crea una zona específica para hilos sin identificar, pero revísala de vez en cuando.</p>
            </div>
          </article>

          <ThreadEquivalenceDownloadForm />

          <article className="article-card">
            <h2 className="article-section-title">
              Cuándo merece la pena usar un inventario digital
            </h2>

            <p className="article-text">
              Si tienes pocos hilos, quizá una caja ordenada y una lista sencilla sean suficientes. Pero cuando empiezas
              a acumular muchas referencias, proyectos activos, telas, kits o hilos especiales, un inventario digital puede ahorrarte tiempo.
            </p>

            <p className="article-text">
              Un inventario te permite consultar tus materiales antes de comprar, saber qué hilos tienes disponibles
              y preparar proyectos con más calma.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Señales de que te vendría bien un inventario
              </h3>

              <div className="article-list">
                <p>• Compras hilos y luego descubres que ya los tenías.</p>
                <p>• No recuerdas dónde guardaste una referencia concreta.</p>
                <p>• Tienes materiales repartidos en varias cajas o bolsas.</p>
                <p>• Preparar un proyecto nuevo te lleva demasiado tiempo.</p>
                <p>• Quieres controlar hilos, telas, kits y calculadora de materiales en un mismo sistema.</p>
              </div>
            </div>
          </article>

          <article className="article-card soft">
            <h2 className="article-section-title">
              Una herramienta para organizar tus hilos y materiales
            </h2>

            <p className="article-text">
              Si quieres llevar el control de tus hilos de forma más completa, el Sistema de Inventario Profesional
              está pensado para organizar tus materiales de punto de cruz dentro del entorno Google.
            </p>

            <p className="article-text">
              Puedes empezar con el inventario base de hilos y, si más adelante lo necesitas, añadir complementos
              como telas, kits/proyectos o calculadora de tela e hilos.
            </p>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/herramientas/inventario" className="article-button">
                Ver Sistema de Inventario
              </Link>

              <Link href="/pedidos/inventario" className="article-button secondary">
                Hacer pedido
              </Link>
            </div>
          </article>

                    <article className="article-card">
            <h2 className="article-section-title">
              También puedes organizar tus proyectos y avances
            </h2>

            <p className="article-text">
              Ordenar tus hilos es solo una parte de la organización. Si además quieres llevar el seguimiento de tus avances,
              registrar cruces bordadas o consultar tu progreso, puedes combinar la organización de materiales con un sistema
              de seguimiento de proyectos.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                También te puede interesar
              </h3>

              <div className="article-list">
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/errores-comunes-punto-de-cruz">
                    Errores comunes al hacer punto de cruz y cómo evitarlos
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/organizar-proyectos">
                    Cómo organizar tus proyectos de punto de cruz
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/herramientas/inventario">
                    Sistema de inventario para hilos, telas y materiales
                  </Link>
                </p>
              </div>
            </div>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/punto-de-cruz/organizar-proyectos" className="article-button secondary">
                Cómo organizar tus proyectos
              </Link>

              <Link href="/herramientas/seguimiento" className="article-button secondary">
                Ver Sistema de Seguimiento
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}