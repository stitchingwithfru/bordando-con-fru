import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo organizar tus proyectos de punto de cruz | Bordando con Fru",
  description:
    "Guía práctica para organizar tus proyectos de punto de cruz, controlar tus avances, registrar cruces bordadas y disfrutar más del proceso.",
  openGraph: {
    title: "Cómo organizar tus proyectos de punto de cruz | Bordando con Fru",
    description:
      "Ideas prácticas para ordenar tus proyectos de punto de cruz, registrar avances y no perder el control de tus labores.",
    url: "https://stitchingwithfru.com/punto-de-cruz/organizar-proyectos",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "article",
  },
};

export default function OrganizarProyectosPuntoDeCruzPage() {
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
          <div className="article-kicker">🧵 Organización de proyectos</div>

          <h1 className="article-title">
            Cómo organizar tus proyectos de punto de cruz y no perder el seguimiento de tus avances
          </h1>

          <p className="article-intro">
            Cuando tienes varios proyectos empezados, muchos colores, páginas de patrón y avances pequeños,
            es fácil perder la sensación de control. Organizar tus labores de punto de cruz puede ayudarte a
            disfrutar más del proceso y ver todo lo que ya has avanzado.
          </p>

          <div className="article-actions">
            <Link href="/herramientas/seguimiento" className="article-button">
              Ver Sistema de Seguimiento
            </Link>

            <Link href="/punto-de-cruz" className="article-button secondary">
              ← Volver a Punto de cruz
            </Link>
          </div>
        </section>

        <section className="article-content">
          <article className="article-card">
            <h2 className="article-section-title">
              Por qué cuesta seguir el avance en punto de cruz
            </h2>

            <p className="article-text">
              El punto de cruz es una labor muy visual, pero el progreso no siempre se percibe de forma clara.
              Hay días en los que bordas muchas cruces y parece que no has avanzado nada; otros días terminas
              una zona pequeña y sientes que el proyecto ha cambiado por completo.
            </p>

            <p className="article-text">
              Esto se nota todavía más en proyectos grandes, diseños con muchas páginas, labores con mucho confeti
              o cuando alternas varios bordados a la vez. Por eso, tener un sistema sencillo para organizar tus proyectos
              y registrar avances puede marcar una gran diferencia.
            </p>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Qué información conviene tener clara de cada proyecto
            </h2>

            <p className="article-text">
              No hace falta convertir el bordado en una tarea complicada. La idea es guardar solo la información que de
              verdad te ayuda a orientarte y tomar mejores decisiones cuando vuelves a coger una labor.
            </p>

            <div className="article-list">
              <p>• Nombre del proyecto o diseño que estás bordando.</p>
              <p>• Fecha de inicio y, si quieres, fecha de finalización.</p>
              <p>• Número aproximado de cruces totales o zonas del patrón.</p>
              <p>• Cruces bordadas, porcentaje de avance o páginas completadas.</p>
              <p>• Hilos, tela y materiales usados en el proyecto.</p>
              <p>• Notas importantes: cambios de color, errores corregidos o zonas pendientes.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                La clave no es apuntarlo todo
              </h3>

              <p className="article-callout-text">
                La clave es apuntar aquello que te ayude a retomar el proyecto sin perder tiempo pensando por dónde ibas.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Cómo dividir un proyecto grande en avances pequeños
            </h2>

            <p className="article-text">
              Un proyecto grande puede parecer interminable si solo miras el resultado final. Por eso ayuda mucho dividirlo
              en partes más pequeñas: páginas del patrón, zonas de color, bloques de cruces o sesiones de bordado.
            </p>

            <div className="article-steps">
              <div className="article-step">
                <div className="article-step-number">1</div>
                <h3 className="article-step-title">Divide el patrón</h3>
                <p className="article-step-text">
                  Puedes organizarlo por páginas, columnas, secciones o zonas visuales del diseño.
                </p>
              </div>

              <div className="article-step">
                <div className="article-step-number">2</div>
                <h3 className="article-step-title">Registra avances</h3>
                <p className="article-step-text">
                  Anota lo que has completado: cruces, porcentaje, página terminada o zona bordada.
                </p>
              </div>

              <div className="article-step">
                <div className="article-step-number">3</div>
                <h3 className="article-step-title">Revisa el progreso</h3>
                <p className="article-step-text">
                  Ver el avance acumulado ayuda a mantener la motivación, incluso cuando el proyecto es largo.
                </p>
              </div>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Formas sencillas de registrar tus avances
            </h2>

            <p className="article-text">
              Cada persona borda de una manera distinta, así que no hay una única forma correcta de llevar el seguimiento.
              Puedes escoger el método que encaje mejor contigo y con el tipo de proyecto que tengas entre manos.
            </p>

            <div className="article-list">
              <p>• Registrar el número de cruces bordadas en cada sesión.</p>
              <p>• Marcar páginas o zonas completas del patrón.</p>
              <p>• Anotar el porcentaje aproximado de avance.</p>
              <p>• Guardar una foto del antes y después de cada sesión.</p>
              <p>• Llevar un pequeño diario de bordado con notas y fechas.</p>
              <p>• Usar una hoja de cálculo o una herramienta digital para automatizar parte del seguimiento.</p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Cómo evitar que el seguimiento se convierta en una obligación
            </h2>

            <p className="article-text">
              El objetivo de organizar tus proyectos de punto de cruz no es añadir presión, sino quitar ruido mental.
              Si el sistema que usas es demasiado complicado, probablemente terminarás dejándolo.
            </p>

            <p className="article-text">
              Lo ideal es que puedas registrar el avance en muy poco tiempo, después de bordar o al final del día.
              Un sistema útil debería ayudarte a ver el progreso, no hacerte sentir que tienes otra tarea pendiente.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Consejo práctico
              </h3>

              <p className="article-callout-text">
                Elige una rutina mínima: por ejemplo, actualizar el avance solo cuando termines una sesión larga,
                una página del patrón o una zona concreta. No necesitas registrar cada puntada si eso te agobia.
              </p>
            </div>
          </article>

          <article className="article-card soft">
            <h2 className="article-section-title">
              Una herramienta para llevar el seguimiento de tus proyectos
            </h2>

            <p className="article-text">
              Si te apetece llevar este control de forma más visual y ordenada, el Sistema de Seguimiento de Punto de Cruz
              está pensado precisamente para eso: registrar tus cruces bordadas, consultar tus avances y tener tus proyectos
              organizados en un mismo lugar.
            </p>

            <p className="article-text">
              Puede ayudarte especialmente si tienes varios proyectos activos, si te gusta ver estadísticas o si quieres
              saber cuánto has avanzado en un periodo concreto.
            </p>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/herramientas/seguimiento" className="article-button">
                Ver Sistema de Seguimiento
              </Link>

              <Link href="/pedidos/seguimiento" className="article-button secondary">
                Hacer pedido
              </Link>
            </div>
          </article>

                    <article className="article-card">
            <h2 className="article-section-title">
              También puedes organizar tus materiales
            </h2>

            <p className="article-text">
              El seguimiento de avances es solo una parte de la organización. Si además quieres ordenar tus hilos,
              telas, kits o materiales, también puedes apoyarte en un sistema de inventario para saber qué tienes y
              qué necesitas antes de empezar un nuevo proyecto.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                También te puede interesar
              </h3>

              <div className="article-list">
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/organizar-hilos">
                    Cómo organizar tus hilos de punto de cruz
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/errores-comunes-punto-de-cruz">
                    Errores comunes al hacer punto de cruz y cómo evitarlos
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/herramientas/seguimiento">
                    Sistema de seguimiento para proyectos de punto de cruz
                  </Link>
                </p>
              </div>
            </div>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/herramientas/inventario" className="article-button secondary">
                Ver Sistema de Inventario
              </Link>

              <Link href="/punto-de-cruz" className="article-button secondary">
                Ver más contenidos de punto de cruz
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}