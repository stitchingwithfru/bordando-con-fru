import type { Metadata } from "next";
import Link from "next/link";

const TELEGRAM_CLUB_URL = "https://t.me/+L60IJP_3STcwZTU0";

export const metadata: Metadata = {
  title: "Cómo funciona el Club de Lectura | Bordando con Fru",
  description:
    "Descubre cómo funciona el Club de Lectura de Bordando con Fru: lecturas conjuntas, propuestas de libros, encuestas, avisos en Telegram y archivo de lecturas.",
  openGraph: {
    title: "Cómo funciona el Club de Lectura | Bordando con Fru",
    description:
      "Una guía sencilla para saber cómo participar en el Club de Lectura de Bordando con Fru y seguir las lecturas conjuntas.",
    url: "https://stitchingwithfru.com/club-de-lectura/como-funciona",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "article",
  },
};

export default function ComoFuncionaClubPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <style>
          {`
            .club-guide-hero {
              max-width: 920px;
              margin: 0 auto 56px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .club-guide-kicker {
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

            .club-guide-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .club-guide-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .club-guide-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .club-guide-button {
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

            .club-guide-button.secondary {
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
              box-shadow: none;
            }

            .club-guide-content {
              max-width: 920px;
              margin: 0 auto;
              display: grid;
              gap: 24px;
            }

            .club-guide-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              padding: 30px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .club-guide-card.soft {
              background: #FFF7EF;
            }

            .club-guide-section-title {
              margin: 0 0 14px 0;
              font-family: Georgia, serif;
              font-size: 30px;
              line-height: 1.12;
              color: #403A36;
            }

            .club-guide-text {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.75;
            }

            .club-guide-text + .club-guide-text {
              margin-top: 12px;
            }

            .club-guide-list {
              display: grid;
              gap: 12px;
              margin-top: 16px;
            }

            .club-guide-list p {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.65;
            }

            .club-guide-steps {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 16px;
              margin-top: 18px;
            }

            .club-guide-step {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 18px;
            }

            .club-guide-step-number {
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

            .club-guide-step-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              font-size: 21px;
              line-height: 1.15;
              color: #403A36;
            }

            .club-guide-step-text {
              margin: 0;
              color: #6F655F;
              font-size: 14.5px;
              line-height: 1.55;
            }

            .club-guide-faq {
              display: grid;
              gap: 14px;
              margin-top: 18px;
            }

            .club-guide-faq-item {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 20px;
              padding: 18px;
            }

            .club-guide-faq-question {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              color: #403A36;
              font-size: 21px;
              line-height: 1.18;
            }

            .club-guide-faq-answer {
              margin: 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            @media (max-width: 800px) {
              .club-guide-steps {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 600px) {
              .club-guide-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 46px;
              }

              .club-guide-title {
                font-size: 36px;
              }

              .club-guide-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .club-guide-actions {
                flex-direction: column;
              }

              .club-guide-button {
                width: 100%;
              }

              .club-guide-card {
                border-radius: 26px;
                padding: 24px 20px;
              }

              .club-guide-section-title {
                font-size: 27px;
              }
            }
          `}
        </style>

        <section className="club-guide-hero">
          <div className="club-guide-kicker">📚 Guía del Club</div>

          <h1 className="club-guide-title">
            Cómo funciona el Club de Lectura
          </h1>

          <p className="club-guide-intro">
            El Club de Lectura de Bordando con Fru es un espacio para compartir lecturas conjuntas,
            descubrir nuevos libros y disfrutar de la lectura con calma, sin presión y a nuestro ritmo.
          </p>

          <div className="club-guide-actions">
            <a
              href={TELEGRAM_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="club-guide-button"
            >
              Unirme al Club en Telegram →
            </a>

            <Link href="/club-de-lectura" className="club-guide-button secondary">
              Ver página principal del Club
            </Link>
          </div>
        </section>

        <section className="club-guide-content">
          <article className="club-guide-card">
            <h2 className="club-guide-section-title">
              Qué es el Club de Lectura de Bordando con Fru
            </h2>

            <p className="club-guide-text">
              Es un rincón lector pensado para quienes disfrutan descubriendo historias y compartiendo
              la experiencia con otras personas. La idea no es leer con prisas, sino acompañarnos durante
              una lectura común, comentar impresiones y tener siempre a mano la información principal del Club.
            </p>

            <p className="club-guide-text">
              En la web puedes consultar la lectura actual, la próxima lectura, el archivo de libros leídos,
              las estadísticas del Club y el formulario para proponer nuevas lecturas.
            </p>
          </article>

          <article className="club-guide-card">
            <h2 className="club-guide-section-title">
              Cómo participar en las lecturas conjuntas
            </h2>

            <p className="club-guide-text">
              La participación es sencilla: puedes unirte a la comunidad en Telegram para recibir avisos,
              seguir las novedades y estar al tanto de las próximas lecturas conjuntas.
            </p>

            <div className="club-guide-steps">
              <div className="club-guide-step">
                <div className="club-guide-step-number">1</div>
                <h3 className="club-guide-step-title">Únete al grupo</h3>
                <p className="club-guide-step-text">
                  Entra en la comunidad de Telegram para recibir avisos y novedades del Club.
                </p>
              </div>

              <div className="club-guide-step">
                <div className="club-guide-step-number">2</div>
                <h3 className="club-guide-step-title">Consulta la lectura</h3>
                <p className="club-guide-step-text">
                  Revisa en la web cuál es la lectura actual o la próxima lectura programada.
                </p>
              </div>

              <div className="club-guide-step">
                <div className="club-guide-step-number">3</div>
                <h3 className="club-guide-step-title">Lee a tu ritmo</h3>
                <p className="club-guide-step-text">
                  La lectura se comparte de forma tranquila, sin obligación de ir exactamente al mismo ritmo.
                </p>
              </div>
            </div>
          </article>

          <article className="club-guide-card">
            <h2 className="club-guide-section-title">
              Cómo se eligen los libros
            </h2>

            <p className="club-guide-text">
              Las lecturas pueden salir de propuestas, recomendaciones o encuestas. En algunos momentos se abre
              una encuesta para votar entre varias opciones, y también puedes proponer libros desde la página principal
              del Club de Lectura.
            </p>

            <div className="club-guide-list">
              <p>• Puedes sugerir libros para futuras lecturas conjuntas.</p>
              <p>• Las encuestas y avisos importantes se comunican en Telegram.</p>
              <p>• El archivo permite consultar qué libros ya se han leído en el Club.</p>
              <p>• Las estadísticas muestran géneros, duración media y evolución de las lecturas conjuntas.</p>
            </div>
          </article>

          <article className="club-guide-card soft">
            <h2 className="club-guide-section-title">
              Dónde ver la lectura actual, el archivo y las estadísticas
            </h2>

            <p className="club-guide-text">
              La página principal del Club reúne la información más importante: lectura actual, próxima lectura,
              estado de encuestas, enlace a Telegram, archivo de lecturas y estadísticas.
            </p>

            <div className="club-guide-actions" style={{ marginTop: 22 }}>
              <Link href="/club-de-lectura/archivo" className="club-guide-button secondary">
                Ver archivo de lecturas
              </Link>

              <Link href="/club-de-lectura/estadisticas" className="club-guide-button secondary">
                Ver estadísticas del Club
              </Link>
            </div>
          </article>

          <article className="club-guide-card">
            <h2 className="club-guide-section-title">
              Preguntas frecuentes
            </h2>

            <div className="club-guide-faq">
              <div className="club-guide-faq-item">
                <h3 className="club-guide-faq-question">
                  ¿Tengo que leer al mismo ritmo que el resto?
                </h3>
                <p className="club-guide-faq-answer">
                  No necesariamente. La idea es disfrutar de la lectura conjunta sin presión. Puedes seguir el ritmo del grupo o adaptarlo a tus ratitos de lectura.
                </p>
              </div>

              <div className="club-guide-faq-item">
                <h3 className="club-guide-faq-question">
                  ¿Dónde se anuncian las próximas lecturas?
                </h3>
                <p className="club-guide-faq-answer">
                  Las novedades importantes se comparten en Telegram y también se actualizan en la página del Club de Lectura.
                </p>
              </div>

              <div className="club-guide-faq-item">
                <h3 className="club-guide-faq-question">
                  ¿Puedo proponer libros?
                </h3>
                <p className="club-guide-faq-answer">
                  Sí. En la página principal del Club hay un formulario para enviar propuestas de libros que podrán tenerse en cuenta en futuras lecturas conjuntas.
                </p>
              </div>

              <div className="club-guide-faq-item">
                <h3 className="club-guide-faq-question">
                  ¿Dónde puedo ver los libros que ya se han leído?
                </h3>
                <p className="club-guide-faq-answer">
                  Puedes consultarlos en el archivo del Club, organizados por año y con enlaces a Goodreads cuando están disponibles.
                </p>
              </div>
            </div>
          </article>

          <article className="club-guide-card soft">
            <h2 className="club-guide-section-title">
              Únete al Club de Lectura
            </h2>

            <p className="club-guide-text">
              Si te apetece descubrir nuevas historias y compartir lecturas con una comunidad tranquila y lectora,
              puedes unirte al Club en Telegram y consultar esta página siempre que quieras ver las novedades.
            </p>

            <div className="club-guide-actions" style={{ marginTop: 22 }}>
              <a
                href={TELEGRAM_CLUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="club-guide-button"
              >
                Unirme al Club en Telegram →
              </a>

              <Link href="/club-de-lectura" className="club-guide-button secondary">
                Volver al Club de Lectura
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}