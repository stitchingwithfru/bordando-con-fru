import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qué necesitas para empezar en punto de cruz | Bordando con Fru",
  description:
    "Guía básica para empezar en punto de cruz: materiales necesarios, tela, hilos, aguja, bastidor, patrones y consejos para tus primeras labores.",
  openGraph: {
    title: "Qué necesitas para empezar en punto de cruz | Bordando con Fru",
    description:
      "Una guía sencilla para saber qué materiales necesitas para empezar en punto de cruz y cómo preparar tus primeras labores.",
    url: "https://stitchingwithfru.com/punto-de-cruz/empezar-punto-de-cruz",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "article",
  },
};

export default function EmpezarPuntoDeCruzPage() {
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
          <div className="article-kicker">🧵 Primeros pasos</div>

          <h1 className="article-title">
            Qué necesitas para empezar en punto de cruz
          </h1>

          <p className="article-intro">
            Empezar en punto de cruz puede parecer complicado al principio, pero en realidad necesitas pocos materiales básicos y un poco de calma para dar las primeras puntadas.
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
              Materiales básicos para empezar
            </h2>

            <p className="article-text">
              Para empezar en punto de cruz no necesitas tener un montón de accesorios. Lo más importante es elegir un proyecto sencillo y preparar los materiales básicos antes de ponerte a bordar.
            </p>

            <div className="article-list">
              <p>• Tela para punto de cruz, como Aida, lino o Evenweave (lugana).</p>
              <p>• Hilos de bordar, normalmente mouliné de algodón (DMC, Anchor, CXC…).</p>
              <p>• Aguja de punta redondeada, adecuada para la tela elegida.</p>
              <p>• Tijeras pequeñas para cortar hilo.</p>
              <p>• Patrón de punto de cruz, impreso o digital.</p>
              <p>• Bastidor o aro, si te resulta cómodo trabajar con la tela tensada.</p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Elige una tela sencilla para tus primeras labores
            </h2>

            <p className="article-text">
              Si estás empezando, una tela Aida suele ser una opción muy cómoda porque los agujeros se ven con claridad y resulta más fácil contar las puntadas. Esto ayuda mucho cuando todavía estás aprendiendo a seguir un patrón.
            </p>

            <p className="article-text">
              Las telas como lino o Evenweave (lugana) también se usan mucho en punto de cruz, pero pueden resultar un poco más exigentes al principio porque requieren más atención al contar los hilos.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Consejo para empezar
              </h3>

              <p className="article-callout-text">
                Para una primera labor, busca una tela fácil de ver, un diseño pequeño y pocos colores. Así podrás concentrarte en aprender la técnica sin agobiarte.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Cómo elegir tu primer patrón de punto de cruz
            </h2>

            <p className="article-text">
              El primer patrón debería ser sencillo, claro y no demasiado grande. Un diseño pequeño te permite terminar antes, entender cómo se lee el esquema y ganar confianza.
            </p>

            <div className="article-list">
              <p>• Mejor un diseño pequeño que uno muy grande.</p>
              <p>• Evita patrones con demasiados colores para empezar.</p>
              <p>• Busca símbolos fáciles de distinguir.</p>
              <p>• Comprueba que el patrón indique los colores necesarios.</p>
              <p>• Elige un motivo que te apetezca bordar, aunque sea sencillo.</p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Primeros pasos antes de bordar
            </h2>

            <p className="article-text">
              Antes de empezar, merece la pena preparar un poco la labor. No hace falta hacerlo perfecto, pero sí tener claro por dónde vas a empezar y cómo vas a seguir el patrón.
            </p>

            <div className="article-steps">
              <div className="article-step">
                <div className="article-step-number">1</div>
                <h3 className="article-step-title">Prepara la tela</h3>
                <p className="article-step-text">
                  Corta la tela dejando margen suficiente alrededor del diseño y, si quieres, remata los bordes para que no se deshilache.
                </p>
              </div>

              <div className="article-step">
                <div className="article-step-number">2</div>
                <h3 className="article-step-title">Revisa el patrón</h3>
                <p className="article-step-text">
                  Mira los símbolos, los colores y el tamaño final antes de dar la primera puntada.
                </p>
              </div>

              <div className="article-step">
                <div className="article-step-number">3</div>
                <h3 className="article-step-title">Empieza con calma</h3>
                <p className="article-step-text">
                  Puedes empezar por el centro o por una zona fácil de localizar. Lo importante es contar bien y avanzar sin prisa.
                </p>
              </div>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Errores habituales al empezar
            </h2>

            <p className="article-text">
              Al principio es normal equivocarse. Forma parte del aprendizaje. Lo importante es que esos errores no te quiten las ganas de seguir bordando.
            </p>

            <div className="article-list">
              <p>• Elegir un proyecto demasiado grande para empezar.</p>
              <p>• No dejar margen suficiente de tela alrededor del diseño.</p>
              <p>• Usar demasiadas hebras de hilo y que la puntada quede abultada.</p>
              <p>• No comprobar bien el centro o el punto de inicio.</p>
              <p>• Perderse en el patrón por no marcar lo ya bordado.</p>
              <p>• Agobiarse por querer que la primera labor quede perfecta.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Recuerda esto
              </h3>

              <p className="article-callout-text">
                Tu primera labor no tiene que ser perfecta. Tiene que ayudarte a aprender, disfrutar y descubrir si esta forma de bordar encaja contigo.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Cómo mantener la motivación en tus primeras labores
            </h2>

            <p className="article-text">
              Una de las mejores formas de mantener la motivación es elegir proyectos que te hagan ilusión y que puedas ver avanzar poco a poco. No pasa nada si bordas solo un ratito algunos días.
            </p>

            <p className="article-text">
              También puede ayudarte hacer fotos del proceso, guardar tus avances o anotar cuándo empiezas y terminas cada proyecto. Ver el progreso acumulado suele animar mucho, sobre todo en labores que llevan más tiempo.
            </p>
          </article>

                    <article className="article-card soft">
            <h2 className="article-section-title">
              Cuando ya tengas varios proyectos empezados
            </h2>

            <p className="article-text">
              Al principio quizá tengas una sola labor, pero con el tiempo es muy fácil acumular varios proyectos, hilos, telas y patrones. En ese momento puede ayudarte crear una pequeña rutina de organización.
            </p>

            <p className="article-text">
              Puedes empezar de forma sencilla: una lista de proyectos, una caja para materiales, una carpeta para patrones o un registro básico de avances.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                También te puede interesar
              </h3>

              <div className="article-list">
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/telas-punto-de-cruz">
                    Qué tela elegir para empezar en punto de cruz
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
                  <Link href="/punto-de-cruz/organizar-proyectos">
                    Cómo organizar tus proyectos de punto de cruz
                  </Link>
                </p>
              </div>
            </div>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/punto-de-cruz/organizar-proyectos" className="article-button">
                Cómo organizar tus proyectos
              </Link>

              <Link href="/punto-de-cruz" className="article-button secondary">
                Ver más contenidos
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}