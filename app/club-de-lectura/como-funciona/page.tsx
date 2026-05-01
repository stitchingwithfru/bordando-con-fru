import Link from "next/link";

const TELEGRAM_CLUB_URL = "https://t.me/+L60IJP_3STcwZTU0";

export default function ComoFuncionaClubPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 space-y-20">
        <style>
          {`
            .club-info-hero {
              max-width: 980px;
              margin: 0 auto 72px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .club-info-kicker {
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

            .club-info-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .club-info-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .club-info-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .club-info-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 13px 20px;
              font-size: 15px;
              font-weight: 700;
              text-decoration: none;
            }

            .club-info-button.primary {
              background: #403A36;
              color: #FFFFFF;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .club-info-button.secondary {
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
            }

            .club-info-section {
              max-width: 980px;
              margin: 72px auto 0 auto;
            }

            .club-info-section-title {
              margin: 0 0 22px 0;
              font-family: Georgia, serif;
              font-size: 34px;
              line-height: 1.1;
              color: #403A36;
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .club-info-section-title span {
              width: 36px;
              height: 2px;
              background: #D8B7B0;
              display: inline-block;
            }

            .club-info-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 18px;
            }

            .club-info-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 26px;
              padding: 24px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.055);
            }

            .club-info-card-icon {
              width: 50px;
              height: 50px;
              border-radius: 18px;
              background: #F3ECE7;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              margin-bottom: 14px;
            }

            .club-info-card-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              font-size: 23px;
              line-height: 1.15;
              color: #403A36;
            }

            .club-info-card-text {
              margin: 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            .club-cycle {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              padding: 28px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .club-cycle-grid {
              display: grid;
              grid-template-columns: repeat(6, minmax(0, 1fr));
              gap: 12px;
            }

            .club-cycle-step {
              position: relative;
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 16px 14px;
              text-align: center;
            }

            .club-cycle-number {
              width: 32px;
              height: 32px;
              border-radius: 999px;
              background: #403A36;
              color: #FFFFFF;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              font-weight: 700;
              margin-bottom: 10px;
            }

            .club-cycle-title {
              margin: 0 0 6px 0;
              font-weight: 700;
              color: #403A36;
              font-size: 14px;
              line-height: 1.25;
            }

            .club-cycle-text {
              margin: 0;
              color: #6F655F;
              font-size: 13px;
              line-height: 1.45;
            }

            .club-rules {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 18px;
            }

            .club-rule {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 24px;
              padding: 22px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.045);
            }

            .club-rule strong {
              display: block;
              font-family: Georgia, serif;
              font-size: 22px;
              color: #403A36;
              margin-bottom: 8px;
            }

            .club-rule p {
              margin: 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            .club-info-note {
              background: #E9F0E6;
              border: 1px solid rgba(94, 117, 92, 0.2);
              border-radius: 26px;
              padding: 24px;
              color: #4D6249;
              font-size: 15.5px;
              line-height: 1.7;
            }

            .club-info-note strong {
              color: #344532;
            }

                        .club-flexible-participation {
              display: grid;
              grid-template-columns: 74px 1fr;
              gap: 24px;
              align-items: start;
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              padding: 28px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .club-flexible-icon {
              width: 74px;
              height: 74px;
              border-radius: 24px;
              background: #F3ECE7;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 34px;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.08);
            }

            .club-flexible-kicker {
              display: inline-flex;
              align-items: center;
              background: #E9F0E6;
              color: #5E755C;
              border-radius: 999px;
              padding: 7px 13px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              margin-bottom: 12px;
            }

            .club-flexible-title {
              margin: 0 0 12px 0;
              font-family: Georgia, serif;
              font-size: 32px;
              line-height: 1.12;
              color: #403A36;
            }

            .club-flexible-text {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.7;
              max-width: 760px;
            }

            .club-flexible-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 12px;
              margin-top: 22px;
            }

            .club-flexible-point {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 18px;
              padding: 14px;
              color: #6F655F;
              font-size: 14px;
              line-height: 1.45;
            }

            .club-flexible-point strong {
              display: block;
              color: #403A36;
              margin-bottom: 4px;
            }

            .club-flexible-point span {
              display: block;
            }

            @media (max-width: 900px) {
              .club-info-grid {
                grid-template-columns: 1fr;
              }

              .club-cycle-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }

              .club-rules {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 600px) {
              .club-info-hero {
                border-radius: 28px;
                margin-bottom: 56px;
                padding: 32px 22px;
              }

              .club-info-title {
                font-size: 36px;
              }

              .club-info-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .club-info-actions {
                flex-direction: column;
              }

              .club-info-button {
                width: 100%;
              }

              .club-info-section-title {
                font-size: 29px;
                align-items: flex-start;
              }

              .club-cycle {
                padding: 20px;
                border-radius: 26px;
              }

              .club-cycle-grid {
                grid-template-columns: 1fr;
              }
            
              .club-flexible-participation {
                grid-template-columns: 1fr;
                text-align: center;
                border-radius: 26px;
                padding: 24px 20px;
                gap: 16px;
              }

              .club-flexible-icon {
                margin: 0 auto;
                width: 62px;
                height: 62px;
                border-radius: 22px;
                font-size: 30px;
              }

              .club-flexible-title {
                font-size: 28px;
              }

              .club-flexible-text {
                font-size: 15.5px;
                max-width: 100%;
              }

              .club-flexible-grid {
                grid-template-columns: 1fr;
                text-align: left;
              }

              .club-info-section {
                margin-top: 56px;
               }
            }
          `}
        </style>

        <section className="club-info-hero">
          <div className="club-info-kicker">📖 Club de Lectura</div>

          <h1 className="club-info-title">Cómo funciona el Club</h1>

          <p className="club-info-intro">
            El Club de Lectura de Bordando con Fru está pensado para disfrutar de los libros con calma,
            compartir impresiones cuando apetezca y participar sin presión en lecturas conjuntas.
          </p>

          <div className="club-info-actions">
            <Link href="/club-de-lectura" className="club-info-button secondary">
              ← Volver al Club
            </Link>

            <a
              href={TELEGRAM_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="club-info-button primary"
            >
              Unirme en Telegram →
            </a>
          </div>
        </section>

        <section className="club-info-section">
          <h2 className="club-info-section-title">
            <span />
            Lo esencial
          </h2>

          <div className="club-info-grid">
            <article className="club-info-card">
              <div className="club-info-card-icon">🌿</div>
              <h3 className="club-info-card-title">Ritmo flexible</h3>
              <p className="club-info-card-text">
                No hace falta leer al mismo ritmo que las demás personas. Puedes comentar cuando puedas,
                avanzar a tu manera y participar sin presión.
              </p>
            </article>

            <article className="club-info-card">
              <div className="club-info-card-icon">💬</div>
              <h3 className="club-info-card-title">Participación en Telegram</h3>
              <p className="club-info-card-text">
                Las lecturas se comentan en Telegram mediante topics específicos, para que cada lectura
                tenga su propio espacio ordenado.
              </p>
            </article>

            <article className="club-info-card">
              <div className="club-info-card-icon">🗳️</div>
              <h3 className="club-info-card-title">Lecturas elegidas en comunidad</h3>
              <p className="club-info-card-text">
                Las próximas lecturas pueden elegirse mediante encuestas en Telegram, teniendo en cuenta
                propuestas y variedad de géneros.
              </p>
            </article>
          </div>
        </section>

                <section className="club-info-section">
          <h2 className="club-info-section-title">
            <span />
            Participación flexible
          </h2>

          <div className="club-flexible-participation">
            <div className="club-flexible-icon">🌿</div>

            <div>
              <div className="club-flexible-kicker">
                Sin presión
              </div>

              <h3 className="club-flexible-title">
                Lee y participa a tu ritmo
              </h3>

              <p className="club-flexible-text">
                Puedes unirte aunque no hayas participado en las lecturas anteriores, comentar cuando puedas y participar mientras el topic esté abierto. Una semana después de finalizar la lectura, el topic queda cerrado para nuevos mensajes y disponible solo para consulta.
              </p>

              <div className="club-flexible-grid">
                <div className="club-flexible-point">
                  <strong>Sin presión</strong>
                  <span>No hace falta leer al mismo ritmo ni comentar siempre.</span>
                </div>

                <div className="club-flexible-point">
                  <strong>Topic abierto</strong>
                  <span>Puedes participar mientras dure la lectura y durante la semana posterior.</span>
                </div>

                <div className="club-flexible-point">
                  <strong>Consulta posterior</strong>
                  <span>Cuando se cierre, el topic seguirá disponible para consultarlo.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="club-info-section">
          <h2 className="club-info-section-title">
            <span />
            Ciclo de una lectura
          </h2>

          <div className="club-cycle">
            <div className="club-cycle-grid">
              <div className="club-cycle-step">
                <div className="club-cycle-number">1</div>
                <h3 className="club-cycle-title">Propuestas</h3>
                <p className="club-cycle-text">Se recogen ideas de libros para futuras lecturas.</p>
              </div>

              <div className="club-cycle-step">
                <div className="club-cycle-number">2</div>
                <h3 className="club-cycle-title">Encuesta</h3>
                <p className="club-cycle-text">Se vota en Telegram cuando toca elegir nueva lectura.</p>
              </div>

              <div className="club-cycle-step">
                <div className="club-cycle-number">3</div>
                <h3 className="club-cycle-title">Anuncio</h3>
                <p className="club-cycle-text">Se anuncia el libro elegido y la fecha de inicio.</p>
              </div>

              <div className="club-cycle-step">
                <div className="club-cycle-number">4</div>
                <h3 className="club-cycle-title">Lectura</h3>
                <p className="club-cycle-text">Leemos y comentamos durante el período propuesto.</p>
              </div>

              <div className="club-cycle-step">
                <div className="club-cycle-number">5</div>
                <h3 className="club-cycle-title">Semana extra</h3>
                <p className="club-cycle-text">El topic sigue abierto una semana tras finalizar.</p>
              </div>

              <div className="club-cycle-step">
                <div className="club-cycle-number">6</div>
                <h3 className="club-cycle-title">Consulta</h3>
                <p className="club-cycle-text">Después queda cerrado para escribir, pero visible.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="club-info-section">
          <h2 className="club-info-section-title">
            <span />
            Normas suaves del Club
          </h2>

          <div className="club-rules">
            <div className="club-rule">
              <strong>Respeto y calma</strong>
              <p>
                Cada persona lee a su ritmo y tiene su propia experiencia con el libro. Las opiniones distintas
                son bienvenidas siempre que se compartan con respeto.
              </p>
            </div>

            <div className="club-rule">
              <strong>Cuidado con spoilers</strong>
              <p>
                Si vas a comentar algo importante de la trama, avisa antes para que quien no haya llegado a esa
                parte pueda decidir si leerlo o no.
              </p>
            </div>

            <div className="club-rule">
              <strong>Participación sin obligación</strong>
              <p>
                Puedes leer sin comentar, comentar mucho o incorporarte a mitad de lectura. La idea es disfrutar,
                no convertirlo en una tarea.
              </p>
            </div>

            <div className="club-rule">
              <strong>Topics ordenados</strong>
              <p>
                Cada lectura tendrá su propio espacio en Telegram para que las conversaciones no se mezclen y
                puedan consultarse más adelante.
              </p>
            </div>
          </div>
        </section>

        <section className="club-info-section">
          <h2 className="club-info-section-title">
            <span />
            Cómo se eligen las lecturas
          </h2>

          <div className="club-info-card">
            <div className="club-info-card-icon">📚</div>
            <h3 className="club-info-card-title">Propuestas, encuestas y variedad</h3>
            <p className="club-info-card-text">
              Las lecturas pueden salir de propuestas de la comunidad, recomendaciones o libros que encajen bien
              con el ritmo del Club. Cuando haya que elegir, se podrán lanzar encuestas en Telegram. Además, se
              intentará mantener una variedad de géneros a lo largo del año para que el Club no se quede siempre
              en el mismo tipo de lectura.
            </p>
          </div>
        </section>

        <section className="club-info-section">
          <div className="club-info-note">
            <strong>Nota:</strong> una semana después de finalizar una lectura conjunta, el topic correspondiente
            se cierra para nuevos mensajes y queda disponible solo para consulta. Así se mantiene el Club ordenado
            sin perder las conversaciones anteriores.
          </div>
        </section>
      </div>
    </main>
  );
}