"use client";

import { useEffect, useMemo, useState } from "react";
import type { MyReadingItem } from "@/lib/phase1-data";

type Status = "leyendo" | "pausado" | "terminado" | "abandonado";

export default function ReadingProgressApp({ readings }: { readings: MyReadingItem[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem("reading-progress-auth") === "true");
    setIsMounted(true);
  }, []);

  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const availableReadings = useMemo(
    () =>
      readings.filter((reading) =>
        ["leyendo", "pausado"].includes(String(reading.estado || "").toLowerCase())
      ),
    [readings]
  );

  const [selectedId, setSelectedId] = useState(availableReadings[0]?.id || "");
  const selectedReading = availableReadings.find((reading) => reading.id === selectedId) || null;

  const [page, setPage] = useState("");
  const [percent, setPercent] = useState("");
  const [status, setStatus] = useState<Status>("leyendo");
  const [note, setNote] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await fetch("/api/reading-progress/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setAuthError(result.error || "No se pudo comprobar la clave.");
        return;
      }

      window.localStorage.setItem("reading-progress-auth", "true");
      setIsAuthenticated(true);
    } catch {
      setAuthError("No se pudo comprobar la clave.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedReading) {
      setSubmitError("Selecciona una lectura.");
      return;
    }

    setSubmitLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const response = await fetch("/api/reading-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lectura_id: selectedReading.id,
          pagina_actual: selectedReading.formato === "fisico" ? page : "",
          porcentaje_actual: selectedReading.formato === "digital" ? percent : "",
          estado: status,
          nota: note,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setSubmitError(result.error || "No se pudo guardar el progreso.");
        return;
      }

      setSubmitSuccess("Progreso guardado correctamente.");
      setPage("");
      setPercent("");
      setNote("");
    } catch {
      setSubmitError("No se pudo guardar el progreso.");
    } finally {
      setSubmitLoading(false);
    }
  }

  function logout() {
    window.localStorage.removeItem("reading-progress-auth");
    setIsAuthenticated(false);
    setPassword("");
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .progress-app {
            max-width: 560px;
            margin: 0 auto;
          }

          .progress-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 26px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
          }

          .progress-header {
            text-align: center;
            margin-bottom: 24px;
          }

          .progress-kicker {
            display: inline-flex;
            align-items: center;
            background: #F3ECE7;
            color: #8A7C74;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 13px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .progress-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1.1;
            color: #403A36;
          }

          .progress-text {
            margin: 0;
            color: #6F655F;
            font-size: 15.5px;
            line-height: 1.6;
          }

          .progress-form {
            display: grid;
            gap: 16px;
          }

          .progress-field {
            display: grid;
            gap: 7px;
          }

          .progress-label {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .progress-input,
          .progress-select,
          .progress-textarea {
            width: 100%;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            background: #FFFFFF;
            color: #403A36;
            padding: 13px 14px;
            font-size: 16px;
            outline: none;
          }

          .progress-textarea {
            min-height: 96px;
            resize: vertical;
          }

          .progress-selected-book {
            display: grid;
            grid-template-columns: 76px 1fr;
            gap: 14px;
            align-items: start;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 22px;
            padding: 14px;
          }

          .progress-cover {
            width: 76px;
            border-radius: 11px;
            border: 1px solid #E8DED8;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.12);
          }

          .progress-book-title {
            margin: 0 0 4px 0;
            font-family: Georgia, serif;
            font-size: 21px;
            line-height: 1.15;
            color: #403A36;
          }

          .progress-book-author {
            margin: 0 0 8px 0;
            color: #8A7C74;
            font-size: 14px;
            font-style: italic;
          }

          .progress-book-meta {
            margin: 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.45;
          }

          .progress-button {
            border: 0;
            border-radius: 999px;
            background: #403A36;
            color: #FFFFFF;
            padding: 14px 20px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          .progress-button.secondary {
            background: #FFFFFF;
            color: #403A36;
            border: 1px solid #E8DED8;
            box-shadow: none;
          }

          .progress-error {
            background: #F7E4E1;
            color: #8A3C35;
            border-radius: 18px;
            padding: 12px 14px;
            font-size: 14px;
            line-height: 1.45;
          }

          .progress-success {
            background: #E9F0E6;
            color: #4D6249;
            border-radius: 18px;
            padding: 12px 14px;
            font-size: 14px;
            font-weight: 700;
            line-height: 1.45;
          }

          .progress-actions {
            display: grid;
            gap: 10px;
            margin-top: 4px;
          }

          @media (max-width: 600px) {
            .progress-card {
              border-radius: 26px;
              padding: 22px 18px;
            }

            .progress-title {
              font-size: 30px;
            }

            .progress-selected-book {
              grid-template-columns: 68px 1fr;
              gap: 12px;
            }

            .progress-cover {
              width: 68px;
            }

            .progress-book-title {
              font-size: 19px;
            }
          }
        `}
      </style>

      <div className="progress-app">
        <div className="progress-card">
          <div className="progress-header">
            <div className="progress-kicker">🔐 Acceso privado</div>
            <h1 className="progress-title">
              Actualizar lectura
            </h1>
            <p className="progress-text">
              Guarda tus avances de lectura desde el móvil de forma rápida.
            </p>
          </div>

          {!isAuthenticated ? (
            <form className="progress-form" onSubmit={handleAuth}>
              <div className="progress-field">
                <label className="progress-label" htmlFor="password">
                  Clave de acceso
                </label>
                <input
                  id="password"
                  className="progress-input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {authError ? <div className="progress-error">{authError}</div> : null}

              <button className="progress-button" type="submit" disabled={authLoading}>
                {authLoading ? "Comprobando..." : "Entrar"}
              </button>
            </form>
          ) : (
            <>
              {availableReadings.length > 0 ? (
                <form className="progress-form" onSubmit={handleSubmit}>
                  <div className="progress-field">
                    <label className="progress-label" htmlFor="reading">
                      Libro
                    </label>
                    <select
                      id="reading"
                      className="progress-select"
                      value={selectedId}
                      onChange={(event) => {
                        setSelectedId(event.target.value);
                        setPage("");
                        setPercent("");
                        setStatus("leyendo");
                        setNote("");
                        setSubmitError("");
                        setSubmitSuccess("");
                      }}
                    >
                      {availableReadings.map((reading) => (
                        <option key={reading.id} value={reading.id}>
                          {reading.titulo} — {reading.autor}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedReading ? (
                    <div className="progress-selected-book">
                      <img
                        src={selectedReading.portada_url}
                        alt={selectedReading.titulo}
                        className="progress-cover"
                      />
                      <div>
                        <h2 className="progress-book-title">{selectedReading.titulo}</h2>
                        <p className="progress-book-author">por {selectedReading.autor}</p>
                        <p className="progress-book-meta">
                          {selectedReading.formato === "fisico"
                            ? `Formato físico · ${selectedReading.paginas_totales} páginas`
                            : "Formato digital"}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {selectedReading?.formato === "fisico" ? (
                    <div className="progress-field">
                      <label className="progress-label" htmlFor="page">
                        Página actual
                      </label>
                      <input
                        id="page"
                        className="progress-input"
                        type="number"
                        min="0"
                        max={selectedReading.paginas_totales || undefined}
                        value={page}
                        onChange={(event) => setPage(event.target.value)}
                        inputMode="numeric"
                      />
                    </div>
                  ) : null}

                  {selectedReading?.formato === "digital" ? (
                    <div className="progress-field">
                      <label className="progress-label" htmlFor="percent">
                        Porcentaje actual
                      </label>
                      <input
                        id="percent"
                        className="progress-input"
                        type="number"
                        min="0"
                        max="100"
                        value={percent}
                        onChange={(event) => setPercent(event.target.value)}
                        inputMode="numeric"
                      />
                    </div>
                  ) : null}

                  <div className="progress-field">
                    <label className="progress-label" htmlFor="status">
                      Estado
                    </label>
                    <select
                      id="status"
                      className="progress-select"
                      value={status}
                      onChange={(event) => setStatus(event.target.value as Status)}
                    >
                      <option value="leyendo">Leyendo</option>
                      <option value="pausado">Pausado</option>
                      <option value="terminado">Terminado</option>
                      <option value="abandonado">Abandonado</option>
                    </select>
                  </div>

                  <div className="progress-field">
                    <label className="progress-label" htmlFor="note">
                      Nota opcional
                    </label>
                    <textarea
                      id="note"
                      className="progress-textarea"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </div>

                  {submitError ? <div className="progress-error">{submitError}</div> : null}
                  {submitSuccess ? <div className="progress-success">{submitSuccess}</div> : null}

                  <div className="progress-actions">
                    <button className="progress-button" type="submit" disabled={submitLoading}>
                      {submitLoading ? "Guardando..." : "Guardar progreso"}
                    </button>

                    <button
                      className="progress-button secondary"
                      type="button"
                      onClick={logout}
                    >
                      Cerrar acceso
                    </button>
                  </div>
                </form>
              ) : (
                <div className="progress-error">
                  No hay lecturas activas o pausadas disponibles.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}