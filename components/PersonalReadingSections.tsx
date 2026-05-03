import type { MyReadingItem } from "@/lib/phase1-data";

function getDaysLeftInYear(year: number) {
  const today = new Date();
  const endOfYear = new Date(year, 11, 31);
  const diff = endOfYear.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getChallengeMessage(completed: number, goal: number) {
  const remaining = Math.max(goal - completed, 0);

  if (!goal || goal <= 0) return "Define tu objetivo lector para empezar.";
  if (remaining === 0) return "¡Reto completado! Qué maravilla.";
  if (completed === 0) return "Todo reto empieza con una primera lectura.";
  if (remaining <= 3) return `¡Estás a punto de conseguirlo! Solo faltan ${remaining} libros.`;

  return `Llevas ${completed} lecturas completadas. Te quedan ${remaining} para alcanzar tu objetivo.`;
}

export function ReadingChallengeCard({
  challenge,
}: {
  challenge: {
    year: number;
    goal: number;
    completed: number;
    progressPercent: number;
  };
}) {
  const completed = challenge?.completed || 0;
  const goal = challenge?.goal || 0;
  const year = challenge?.year || new Date().getFullYear();
  const progress = Math.min(Math.max(challenge?.progressPercent || 0, 0), 100);
  const daysLeft = getDaysLeftInYear(year);
  const message = getChallengeMessage(completed, goal);

  return (
    <>
      <style>
        {`
          .reading-challenge-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 28px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
            width: 100%;
            max-width: 980px;
            margin: 0 auto;
          }

          .reading-challenge-inner {
            display: flex;
            gap: 28px;
            align-items: flex-start;
          }

          .reading-challenge-icon {
            width: 112px;
            height: 112px;
            min-width: 112px;
            border-radius: 26px;
            background: linear-gradient(145deg, #A8B8A3 0%, #7F9679 100%);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 22px rgba(64, 58, 54, 0.14);
            position: relative;
            overflow: hidden;
          }

          .reading-challenge-icon-glow {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            right: -22px;
            top: -22px;
          }

          .reading-challenge-year {
            font-size: 28px;
            line-height: 1;
            font-weight: 700;
            margin-bottom: 12px;
            position: relative;
            z-index: 1;
          }

          .reading-challenge-book {
            width: 62px;
            height: 36px;
            position: relative;
            z-index: 1;
          }

          .reading-challenge-book-left {
            position: absolute;
            left: 3px;
            top: 5px;
            width: 28px;
            height: 25px;
            border-radius: 16px 4px 4px 16px;
            background: #FFF7EF;
            transform: rotate(-8deg);
            box-shadow: inset -4px 0 0 rgba(64,58,54,0.08);
          }

          .reading-challenge-book-right {
            position: absolute;
            right: 3px;
            top: 5px;
            width: 28px;
            height: 25px;
            border-radius: 4px 16px 16px 4px;
            background: #FFF7EF;
            transform: rotate(8deg);
            box-shadow: inset 4px 0 0 rgba(64,58,54,0.08);
          }

          .reading-challenge-book-line {
            position: absolute;
            left: 30px;
            top: 7px;
            width: 2px;
            height: 27px;
            background: rgba(64,58,54,0.18);
          }

          .reading-challenge-book-shadow {
            position: absolute;
            left: 12px;
            bottom: 0;
            width: 38px;
            height: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,0.35);
          }

          .reading-challenge-content {
            flex: 1;
            min-width: 0;
          }

          .reading-challenge-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
            padding: 6px 12px;
            border-radius: 999px;
            background: #F3ECE7;
            color: #8A7C74;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
          }

          .reading-challenge-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 38px;
            line-height: 1.05;
            color: #2F2926;
          }

          .reading-challenge-message {
            margin: 0 0 24px 0;
            font-size: 18px;
            line-height: 1.45;
            color: #403A36;
          }

          .reading-challenge-count {
            margin-bottom: 18px;
            font-size: 20px;
            line-height: 1.35;
            color: #2F2926;
          }

          .reading-challenge-count span {
            color: #8A7C74;
            font-weight: 400;
          }

          .reading-challenge-progress-row {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .reading-challenge-progress-outer {
            flex: 1;
            height: 32px;
            border: 2px solid #D8B7B0;
            border-radius: 999px;
            background: #FFFFFF;
            padding: 5px;
            overflow: hidden;
          }

          .reading-challenge-progress-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
            transition: width 0.7s ease;
          }

          .reading-challenge-percent {
            min-width: 58px;
            text-align: right;
            font-size: 24px;
            font-weight: 600;
            color: #6F655F;
          }

          @media (max-width: 700px) {
            .reading-challenge-card {
              border-radius: 26px;
              padding: 24px 20px;
            }

            .reading-challenge-inner {
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 20px;
            }

            .reading-challenge-icon {
              width: 100px;
              height: 100px;
              min-width: 100px;
              border-radius: 24px;
            }

            .reading-challenge-year {
              font-size: 26px;
              margin-bottom: 10px;
            }

            .reading-challenge-label {
              font-size: 11px;
              letter-spacing: 0.1em;
            }

            .reading-challenge-title {
              font-size: 31px;
              line-height: 1.08;
            }

            .reading-challenge-message {
              font-size: 16px;
              line-height: 1.55;
              margin-bottom: 22px;
            }

            .reading-challenge-count {
              font-size: 17px;
              line-height: 1.45;
            }

            .reading-challenge-count strong {
              display: block;
              margin-bottom: 4px;
            }

            .reading-challenge-count span {
              display: block;
            }

            .reading-challenge-progress-row {
              gap: 10px;
            }

            .reading-challenge-progress-outer {
              height: 28px;
              padding: 4px;
            }

            .reading-challenge-percent {
              min-width: 48px;
              font-size: 20px;
            }
          }

          @media (max-width: 430px) {
            .reading-challenge-title {
              font-size: 28px;
            }

            .reading-challenge-message {
              font-size: 15.5px;
            }

            .reading-challenge-icon {
              width: 92px;
              height: 92px;
              min-width: 92px;
            }

            .reading-challenge-year {
              font-size: 24px;
            }
          }
        `}
      </style>

      <div className="reading-challenge-card">
        <div className="reading-challenge-inner">
          <div className="reading-challenge-icon">
            <div className="reading-challenge-icon-glow" />

            <div className="reading-challenge-year">
              {year}
            </div>

            <div className="reading-challenge-book">
              <div className="reading-challenge-book-left" />
              <div className="reading-challenge-book-right" />
              <div className="reading-challenge-book-line" />
              <div className="reading-challenge-book-shadow" />
            </div>
          </div>

          <div className="reading-challenge-content">
            <div className="reading-challenge-label">
              📚 Objetivo lector
            </div>

            <h3 className="reading-challenge-title">
              Reto de lectura {year}
            </h3>

            <p className="reading-challenge-message">
              {message}
            </p>

            <div className="reading-challenge-count">
              <strong>{completed} de {goal} libros leídos</strong>
              <span> · {daysLeft} días restantes</span>
            </div>

            <div className="reading-challenge-progress-row">
              <div className="reading-challenge-progress-outer">
                <div
                  className="reading-challenge-progress-inner"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="reading-challenge-percent">
                {progress}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function formatMyReadingDateTime(value?: string) {
  if (!value) return "";

  // Formato nuevo: 2026-05-02 13:47:40
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)) {
    const [datePart, timePart] = value.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");

    const monthName = new Intl.DateTimeFormat("es-ES", {
      month: "long",
    }).format(new Date(Number(year), Number(month) - 1, Number(day)));

    return `${Number(day)} de ${monthName} de ${year}, ${hour}:${minute} h`;
  }

  // Formato antiguo ISO: 2026-05-02T11:47:40.376Z
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(",", " ·")
    .replace(/\s(\d{2}:\d{2})$/, " $1 h");
}

function formatMyReadingShortDate(value?: string) {
  if (!value) return "";

  // Formato: 2026-05-02 13:47:40
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const datePart = value.split(" ")[0];
    const [year, month, day] = datePart.split("-");

    const monthName = new Intl.DateTimeFormat("es-ES", {
      month: "long",
    }).format(new Date(Number(year), Number(month) - 1, Number(day)));

    return `${Number(day)} de ${monthName} de ${year}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function MyCurrentReadingsBlock({ readings }: { readings: MyReadingItem[] }) {
  const visibleReadings = readings.filter((reading) =>
    ["leyendo", "pausado"].includes(String(reading.estado || "").toLowerCase())
  );

  if (!visibleReadings.length) return null;

  return (
    <>
      <style>
        {`
          .my-readings-block {
            max-width: 980px;
            margin: 56px auto 0 auto;
          }

          .my-readings-header {
            text-align: center;
            margin-bottom: 24px;
          }

          .my-readings-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #F3ECE7;
            color: #8A7C74;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .my-readings-title {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 36px;
            line-height: 1.1;
            color: #403A36;
          }

          .my-readings-subtitle {
            max-width: 640px;
            margin: 12px auto 0 auto;
            color: #8A7C74;
            font-size: 16px;
            line-height: 1.65;
          }

          .my-readings-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 22px;
          }

          .my-reading-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 24px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
          }

          .my-reading-card-inner {
            display: grid;
            grid-template-columns: 96px 1fr;
            gap: 18px;
            align-items: start;
          }

          .my-reading-cover {
            width: 96px;
            max-width: 96px;
            height: auto;
            border-radius: 13px;
            border: 1px solid #E8DED8;
            box-shadow: 0 10px 22px rgba(64, 58, 54, 0.13);
            display: block;
          }

          .my-reading-content {
            min-width: 0;
          }

          .my-reading-status-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-bottom: 10px;
          }

          .my-reading-pill {
            display: inline-flex;
            width: fit-content;
            border-radius: 999px;
            padding: 5px 9px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background: #E9F0E6;
            color: #5E755C;
            border: 1px solid rgba(94, 117, 92, 0.18);
          }

          .my-reading-pill.paused {
            background: #F7F3EE;
            color: #8A7C74;
            border-color: #E8DED8;
          }

          .my-reading-format {
            display: inline-flex;
            width: fit-content;
            border-radius: 999px;
            padding: 5px 9px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background: #F7F3EE;
            color: #8A7C74;
            border: 1px solid #E8DED8;
          }

          .my-reading-title {
            margin: 0 0 5px 0;
            font-family: Georgia, serif;
            font-size: 23px;
            line-height: 1.15;
            color: #403A36;
          }

          .my-reading-author {
            margin: 0 0 14px 0;
            color: #8A7C74;
            font-size: 14px;
            font-style: italic;
          }

          .my-reading-page-info {
            margin: 0 0 9px 0;
            color: #6F655F;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 700;
          }

          .my-reading-progress-row {
            display: grid;
            grid-template-columns: 1fr 46px;
            gap: 10px;
            align-items: center;
            margin-bottom: 10px;
          }

          .my-reading-progress-outer {
            height: 17px;
            border-radius: 999px;
            border: 1px solid #D8B7B0;
            background: #FFFFFF;
            padding: 3px;
            overflow: hidden;
          }

          .my-reading-progress-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
          }

          .my-reading-progress-percent {
            color: #6F655F;
            font-size: 14px;
            font-weight: 700;
            text-align: right;
          }

          .my-reading-last {
            margin: 0;
            color: #8A7C74;
            font-size: 12.5px;
            line-height: 1.45;
          }

          .my-reading-link {
            display: inline-flex;
            margin-top: 12px;
            color: #403A36;
            font-size: 13px;
            font-weight: 700;
            text-decoration: underline;
            text-underline-offset: 4px;
            text-decoration-color: #D8B7B0;
          }

          @media (max-width: 700px) {
            .my-readings-block {
              margin-top: 48px;
            }

            .my-readings-title {
              font-size: 30px;
            }

            .my-readings-subtitle {
              font-size: 15.5px;
            }

            .my-reading-card {
              border-radius: 26px;
              padding: 20px;
            }

            .my-reading-card-inner {
              grid-template-columns: 78px 1fr;
              gap: 15px;
            }

            .my-reading-cover {
              width: 78px;
              max-width: 78px;
              border-radius: 11px;
            }

            .my-reading-title {
              font-size: 20px;
            }

            .my-reading-progress-row {
              grid-template-columns: 1fr 42px;
            }
          }

          @media (max-width: 430px) {
            .my-reading-card-inner {
              grid-template-columns: 70px 1fr;
              gap: 13px;
            }

            .my-reading-cover {
              width: 70px;
              max-width: 70px;
            }

            .my-reading-title {
              font-size: 19px;
            }
          }
        `}
      </style>

      <section className="my-readings-block">
        <div className="my-readings-header">
          <div className="my-readings-kicker">📖 Mi rincón lector</div>
          <h2 className="my-readings-title">Mis lecturas actuales</h2>
          <p className="my-readings-subtitle">
            Un pequeño seguimiento visual de los libros que estoy leyendo ahora mismo.
          </p>
        </div>

        <div className="my-readings-grid">
          {visibleReadings.map((reading) => {
            const estado = String(reading.estado || "").toLowerCase();
            const formato = String(reading.formato || "").toLowerCase();
            const progress = Math.min(Math.max(reading.progressPercent || 0, 0), 100);

            return (
              <article key={reading.id} className="my-reading-card">
                <div className="my-reading-card-inner">
                  <img
                    src={reading.portada_local || reading.portada_url}
                    alt={reading.titulo}
                    className="my-reading-cover"
                    width={220}
                    height={330}
                  />

                  <div className="my-reading-content">
                    <div className="my-reading-status-row">
                      <span className={`my-reading-pill ${estado === "pausado" ? "paused" : ""}`}>
                        {estado === "pausado" ? "Pausado" : "Leyendo"}
                      </span>

                      <span className="my-reading-format">
                        {formato === "fisico" ? "Físico" : "Digital"}
                      </span>
                    </div>

                    <h3 className="my-reading-title">{reading.titulo}</h3>

                    <p className="my-reading-author">por {reading.autor}</p>

                    {formato === "fisico" ? (
                      <p className="my-reading-page-info">
                        Página {reading.pagina_actual || 0} de {reading.paginas_totales || 0}
                      </p>
                    ) : null}

                    <div className="my-reading-progress-row">
                      <div className="my-reading-progress-outer">
                        <div
                          className="my-reading-progress-inner"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="my-reading-progress-percent">
                        {progress}%
                      </div>
                    </div>

                    {reading.ultimo_progreso ? (
                      <p className="my-reading-last">
                        Último avance: {formatMyReadingDateTime(reading.ultimo_progreso)}
                      </p>
                    ) : null}

                    {reading.goodreads_url ? (
                      <a
                        href={reading.goodreads_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-reading-link"
                      >
                        Ver en Goodreads →
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function MyFinishedReadingsBlock({ readings }: { readings: MyReadingItem[] }) {
  const finishedReadings = readings
    .filter((reading) => String(reading.estado || "").toLowerCase() === "terminado")
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.fecha_fin || a.ultimo_progreso || 0).getTime();
      const dateB = new Date(b.fecha_fin || b.ultimo_progreso || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 3);

  if (!finishedReadings.length) return null;

  return (
    <>
      <style>
        {`
          .finished-readings-block {
            max-width: 980px;
            margin: 56px auto 0 auto;
          }

          .finished-readings-header {
            text-align: center;
            margin-bottom: 24px;
          }

          .finished-readings-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #F3ECE7;
            color: #8A7C74;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .finished-readings-title {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 36px;
            line-height: 1.1;
            color: #403A36;
          }

          .finished-readings-subtitle {
            max-width: 640px;
            margin: 12px auto 0 auto;
            color: #8A7C74;
            font-size: 16px;
            line-height: 1.65;
          }

          .finished-readings-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .finished-reading-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 28px;
            padding: 22px;
            box-shadow: 0 10px 26px rgba(64, 58, 54, 0.06);
            text-align: center;
          }

          .finished-reading-cover-wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
          }

          .finished-reading-cover {
            width: 92px;
            max-width: 92px;
            height: auto;
            border-radius: 12px;
            border: 1px solid #E8DED8;
            box-shadow: 0 9px 20px rgba(64, 58, 54, 0.13);
            display: block;
          }

          .finished-reading-pill {
            display: inline-flex;
            width: fit-content;
            border-radius: 999px;
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background: #E9F0E6;
            color: #5E755C;
            border: 1px solid rgba(94, 117, 92, 0.18);
            margin-bottom: 12px;
          }

          .finished-reading-title {
            margin: 0 0 6px 0;
            font-family: Georgia, serif;
            font-size: 21px;
            line-height: 1.15;
            color: #403A36;
          }

          .finished-reading-author {
            margin: 0 0 12px 0;
            color: #8A7C74;
            font-size: 14px;
            font-style: italic;
          }

          .finished-reading-date {
            margin: 0;
            color: #6F655F;
            font-size: 13.5px;
            line-height: 1.45;
            font-weight: 700;
          }

          .finished-reading-link {
            display: inline-flex;
            margin-top: 14px;
            color: #403A36;
            font-size: 13px;
            font-weight: 700;
            text-decoration: underline;
            text-underline-offset: 4px;
            text-decoration-color: #D8B7B0;
          }

          @media (max-width: 900px) {
            .finished-readings-grid {
              grid-template-columns: 1fr;
            }

            .finished-reading-card {
              display: grid;
              grid-template-columns: 76px 1fr;
              gap: 16px;
              align-items: start;
              text-align: left;
              padding: 18px;
            }

            .finished-reading-cover-wrap {
              margin-bottom: 0;
            }

            .finished-reading-cover {
              width: 76px;
              max-width: 76px;
              border-radius: 11px;
            }
          }

          @media (max-width: 700px) {
            .finished-readings-block {
              margin-top: 48px;
            }

            .finished-readings-title {
              font-size: 30px;
            }

            .finished-readings-subtitle {
              font-size: 15.5px;
            }
          }

          @media (max-width: 430px) {
            .finished-reading-card {
              grid-template-columns: 68px 1fr;
              gap: 13px;
              border-radius: 24px;
            }

            .finished-reading-cover {
              width: 68px;
              max-width: 68px;
            }

            .finished-reading-title {
              font-size: 19px;
            }
          }
        `}
      </style>

      <section className="finished-readings-block">
        <div className="finished-readings-header">
          <div className="finished-readings-kicker">✅ Lecturas terminadas</div>

          <h2 className="finished-readings-title">
            Mis últimas lecturas terminadas
          </h2>

          <p className="finished-readings-subtitle">
            Un pequeño resumen de los libros que he terminado recientemente.
          </p>
        </div>

        <div className="finished-readings-grid">
          {finishedReadings.map((reading) => {
            const finishDate = reading.fecha_fin || reading.ultimo_progreso;

            return (
              <article key={reading.id} className="finished-reading-card">
                <div className="finished-reading-cover-wrap">
                  <img
                    src={reading.portada_local || reading.portada_url}
                    alt={reading.titulo}
                    className="finished-reading-cover"
                    width={220}
                    height={330}
                  />
                </div>

                <div>
                  <div className="finished-reading-pill">
                    Terminado
                  </div>

                  <h3 className="finished-reading-title">
                    {reading.titulo}
                  </h3>

                  <p className="finished-reading-author">
                    por {reading.autor}
                  </p>

                  {finishDate ? (
                    <p className="finished-reading-date">
                      Finalizado el {formatMyReadingShortDate(finishDate)}
                    </p>
                  ) : null}

                  {reading.goodreads_url ? (
                    <a
                      href={reading.goodreads_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="finished-reading-link"
                    >
                      Ver en Goodreads →
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}