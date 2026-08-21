Tengo que volver a enviarte toda la respuesta de Work anterior porque no te la he pasado bien.



👉 Ha respondido esto:



## 1. Fuente de verdad actual encontrada

La fuente de verdad actual no es una sola pieza:

| ÁreaOrigen editableForma de actualizaciónTransformación previa a la web |                                                  |                                       |                                                                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------ |
| Club de Lectura                                                         | `ClubLectura`, `ClubLecturaConfig`, `ClubEstado` | Manual e irregular                    | Apps Script clasifica lectura actual, anterior, próxima y estados                    |
| Mis lecturas                                                            | `MisLecturas`                                    | Manual                                | Apps Script filtra y combina campos                                                  |
| Progreso                                                                | `MisLecturasProgreso`                            | Registros añadidos por el formulario  | Apps Script selecciona el último progreso de cada lectura                            |
| Bordados y WIPs                                                         | Spreadsheet externo `2026`                       | Entradas manuales; cálculo en la hoja | Sincronización automática hacia `BordadoResumen`, `BordadoMesActual` y `BordadoWIPS` |
| SALs y diseños                                                          | `SALS` y `SALS_Disenos`                          | Manual e irregular                    | Apps Script filtra visibilidad y ordena                                              |
| Novedades                                                               | `NovedadesProductos`                             | Manual e irregular                    | Apps Script publica solo filas visibles                                              |

Evidencias principales:

- La hoja editorial es [WEB - Bordando con Fru](https://docs.google.com/spreadsheets/d/1-hQ9mqtbnlNWEcyTTiOxs0jSLurks-fBNQgF60zpcdc/edit). Tiene 19 pestañas, de las cuales 12 intervienen en `WebsiteData`.
- Las pestañas públicas inspeccionadas contienen valores materializados, no fórmulas.
- `BordadoConfig` señala otro spreadsheet, [2026](https://docs.google.com/spreadsheets/d/1QRTR_nhOUkhRMrZ5xeAjtkhC9eUrXFywlUpymvZSpE0/edit), como seguimiento activo. Allí están `ENTRADAS`, `WIPS`, los meses y el resumen anual.
- La última entrada de bordado fue el 20 de agosto a las 23:14:54. La hoja editorial generó `ultima_actualizacion = 2026-08-21 03:40:48` y Drive registró la revisión a las 03:40:53.
- El historial contiene 140 revisiones desde el 23 de junio y 59 actualizaciones alrededor de las 03:40. Esto confirma una sincronización automática diaria de bordados.
- `MisLecturasProgreso` contiene 92 registros; el último, `las-siete-hermanas`, se añadió el 21 de agosto a las 00:55:45. Es una actualización por evento, no diaria.
- Club, SALs, diseños y novedades muestran un patrón editorial manual.
- Apps Script actúa como **compilador y transporte**: filtra, ordena, transforma fechas y construye el objeto monolítico. El runtime obtiene ese objeto mediante `?mode=website-data`, sin validación, timeout ni caché, como muestra [phase1-data.ts (line 179)]\(/Users/cristianfrutossole/.codex/.chatgpt-projects/g-p-6a881c7a92408191a25eae483de774af/sources/phase1-data.ts:179).

Por tanto:

- Fuente editorial principal: Google Sheets.
- Fuente primaria de bordados: spreadsheet anual `2026`.
- Compilador actual del contrato `WebsiteData`: Apps Script.
- Fuente efectiva del runtime público: endpoint de Apps Script.

## 2. Vigencia del backup

**Clasificación: confirmado actual respecto a las fuentes de datos inspeccionadas.** No queda confirmado de extremo a extremo que todas las páginas desplegadas estén sirviendo correctamente ese mismo JSON.

La coincidencia entre [website-data-backup.json]\(/Users/cristianfrutossole/.codex/.chatgpt-projects/g-p-6a881c7a92408191a25eae483de774af/sources/website-data-backup.json) y las hojas actuales es muy alta:

- Novedades: 1 visible en ambos, con el mismo ID.
- Club de Lectura: 11 lecturas visibles; el backup contiene 10 anteriores y `lectura-14` como actual.
- Mis lecturas: 21 IDs idénticos.
- Último progreso: `2026-08-21 00:55:45`, idéntico en la hoja y el backup.
- Reto de lectura: 15 completadas de 50, 30 %.
- Bordados:
  - 5.961,5 cruces en agosto.
  - 99.643 cruces anuales.
  - 18 registros del mes.
  - Último día publicado: 20 de agosto.
  - 21 WIPs.
  - Actualización: `2026-08-21 03:40:48`.
- SALs: 7 publicados, con los mismos IDs.
- Diseños: 13, con los mismos IDs.
- El backup conserva el orden público calculado, aunque algunas filas estén en otro orden físico en Sheets.

La hoja contiene un octavo SAL, `sal-halloween-2026`, pero todavía no tiene `visible` ni `orden`; por eso no aparece entre los siete SALs del backup. Sus dos diseños sí aparecen, produciendo la relación huérfana ya detectada. Eso no indica obsolescencia: reproduce el comportamiento actual del compilador.

El respaldo tiene SHA-256 `14b0ad9d4d1f2b5df02a4ab4ac6c2fd7a558f3d6c6732d024f9de0e2cee17c12`.

La comprobación pública fue inconclusa: [Club de Lectura](https://www.stitchingwithfru.com/club-de-lectura) devolvió un fallo de caché al inspector y [Mis lecturas](https://www.stitchingwithfru.com/mis-lecturas) agotó el tiempo de respuesta. Por eso confirmo la actualidad del contenido frente a Sheets, pero no su entrega pública estable.

## 3. Comparativa A vs B vs C

| CriterioA — Supabase inmediatoB — Sheets editorial temporalC — Snapshot manual |                                                               |                                                    |                                              |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| Cambios necesarios                                                             | Altos: trasladar edición, cálculos y procesos administrativos | Bajos: conservar la edición y añadir un publicador | Bajos inicialmente                           |
| Complejidad inicial                                                            | Alta                                                          | Media-baja                                         | Baja                                         |
| Riesgo de regresión                                                            | Alto                                                          | Bajo                                               | Medio                                        |
| Apps Script en runtime                                                         | Eliminado                                                     | Eliminado                                          | Eliminado                                    |
| Apps Script fuera del runtime                                                  | Eliminado o reescrito                                         | Temporalmente usado como compilador                | Probablemente necesario para generar el JSON |
| Dependencia de Sheets                                                          | Eliminada                                                     | Editorial, no pública                              | Depende del origen manual                    |
| Rollback                                                                       | Bueno si se conservan versiones                               | Excelente mediante snapshots                       | Posible, pero más propenso a errores humanos |
| Trabajo manual                                                                 | Alto hasta crear administración nueva                         | Una publicación controlada por actualización       | Alto y repetitivo                            |
| Automatización posterior                                                       | Buena, pero exige más desarrollo                              | Muy buena y gradual                                | Limitada si no se formaliza el proceso       |
| Adecuación a una Fase 1 rápida                                                 | Mala                                                          | Muy buena                                          | Aceptable solo como solución provisional     |
| Conserva la lógica perdida de `doGet`                                          | Habría que reconstruirla                                      | Sí, usando temporalmente el endpoint               | Solo si el JSON se obtiene del endpoint      |

A elimina más legado, pero convierte la migración técnica en una reconstrucción del sistema administrativo.

C sirve para una carga inicial o emergencia, pero no define adecuadamente cómo gestionar las actualizaciones diarias de bordados y los progresos por evento.

## 4. Estrategia recomendada para Fase 1

Recomiendo **Estrategia B: Sheets continúa temporalmente como fuente editorial y Supabase pasa a ser la única fuente del runtime público**.

Concretamente:

- Las personas y automatizaciones actuales continúan actualizando Sheets.
- El endpoint existente de Apps Script se utiliza temporalmente, bajo demanda, para generar el contrato `WebsiteData` ya conocido.
- Un publicador controlado valida ese JSON y lo deposita en Supabase.
- Next.js consulta exclusivamente el snapshot activo de Supabase.
- Una caída de Apps Script impide crear una publicación nueva, pero ya no puede derribar ni ralentizar la web.
- No se reconstruye ahora la lógica perdida del `doGet`.
- Más adelante se puede reemplazar el extractor de Apps Script por lectura directa de Sheets o por edición nativa en Supabase sin cambiar otra vez el runtime.

Esto satisface estabilidad, mínimo cambio y reversibilidad. La arquitectura antigua queda relegada al plano editorial y puede eliminarse por etapas.

## 5. Flujo exacto de actualización/publicación recomendado

Recomiendo un **script publicador ejecutado bajo demanda**, con dos acciones separadas: `preparar` y `activar`.

En el primer corte no recomiendo CI programado ni activación automática. Dado que los bordados se actualizan diariamente, esa ejecución manual debe considerarse un control transitorio. Una vez estabilizado el cutover, se podrá programar la preparación diaria y decidir separadamente si se automatiza la activación.
```
Google Sheets / spreadsheet 2026
              │
              │ edición manual, formularios y sincronización diaria
              ▼
Apps Script ?mode=website-data
       solo como compilador temporal
              │
              │ acción PREPARAR bajo demanda
              ▼
Obtener JSON ──► validar contrato y coherencia ──► calcular SHA-256
                         │
                         ├── inválido ──► detener; activo anterior intacto
                         │
                         ▼
              insertar/reutilizar PENDING
                         │
                         ▼
                 informe de diferencias
                         │
                         ▼
                   estado VALIDATED
                         │
                         │ aprobación explícita: ACTIVAR
                         ▼
        transacción única en Supabase
     ACTIVE anterior ──► SUPERSEDED
     VALIDATED nuevo  ──► ACTIVE
                         │
                         ▼
          Next.js consulta solo ACTIVE

Rollback:
SUPERSEDED destino ──► ACTIVE mediante una RPC distinta y transaccional
ACTIVE esperado     ──► SUPERSEDED
```

Reglas:

1. Obtener el JSON con timeout y reintentos limitados. Es recomendable exigir dos lecturas consecutivas con el mismo checksum para evitar capturar una sincronización intermedia.
2. Validar antes de insertar:
   - estructura completa de `WebsiteData`;
   - tipos y fechas;
   - IDs y slugs únicos;
   - conteos y cambios anómalos;
   - coherencia de progreso y totales;
   - relaciones SAL–diseños.
3. La inconsistencia actual de los dos diseños de Halloween debe empezar como advertencia conocida, no como bloqueo súbito. Después puede corregirse editorialmente y convertirse en validación estricta.
4. Canonicalizar el JSON y calcular SHA-256.
5. La unicidad de `(source, source_checksum)` hace la importación idempotente dentro de cada productor: el mismo contenido y origen devuelve el snapshot existente y no crea otra versión.
6. Insertar el candidato como `pending`; nunca sustituir el activo durante la preparación.
7. Guardar el informe y pasarlo a `validated` solo si supera las comprobaciones.
8. La activación debe ser una segunda acción explícita.
9. Cambiar anterior y nuevo dentro de una sola transacción. Si algo falla, todo revierte y permanece el activo anterior.
10. El publicador utiliza una credencial privilegiada exclusivamente en un entorno de confianza. Next.js público usa una clave publicable de solo lectura.
11. `anon` debe tener únicamente `SELECT`, protegido por RLS para ver solo `status = 'active'`; sin `INSERT`, `UPDATE`, `DELETE` ni `TRUNCATE`. Supabase distingue los permisos SQL de las políticas RLS, por lo que deben configurarse ambos explícitamente. [Documentación oficial de seguridad de la Data API](https://supabase.com/docs/guides/api/securing-your-api).

### 5.1. Endurecimiento operativo local previo al cutover

La implementación local separa cinco acciones:

| Acción | Finalidad | ¿Cambia el activo? |
| --- | --- | --- |
| `website-data:bootstrap` | Primera carga, únicamente con tabla vacía | No |
| `website-data:check` | Validar contrato, checksum, estado y lectura anónima | No |
| `website-data:publish` | Capturar dos veces e insertar/reutilizar un candidato `validated` | No |
| `website-data:activate` | Activar un candidato `validated` identificado y aprobado | Sí |
| `website-data:rollback` | Restaurar un `superseded` identificado y aprobado | Sí |

La publicación normal no compara el contenido nuevo con el backup inicial. El backup era un gate de bootstrap; las publicaciones futuras se comparan consigo mismas mediante dos capturas consecutivas, validación de contrato y checksum canónico.

La RPC de rollback recibe:

- snapshot destino;
- snapshot que el operador espera que continúe activo;
- checksum esperado del destino.

Antes de cambiar estados comprueba que el destino está `superseded`, que comparte `source` con el activo, que fue validado, que su informe pertenece a `WebsiteData@phase1`, que el checksum del informe coincide y que no contiene errores. Activación y rollback usan el mismo advisory lock.

El rollback es una operación distinta de la activación normal: `activate_website_data_snapshot` continúa aceptando únicamente `validated`, mientras que `rollback_website_data_snapshot` acepta únicamente `superseded`. Esta separación evita convertir una republicación histórica en una activación accidental.

La migración que incorpora esta RPC permanece local hasta una autorización independiente. No implica cutover ni modifica las políticas RLS o grants de la tabla existentes.

## 6. Política de caché/frescura recomendada

Para el primer cutover recomiendo **`no-store`**.

Razones:

- Es el comportamiento actual de `getWebsiteData()`.
- Evita introducir simultáneamente una migración de origen y un cambio de frescura.
- Un snapshot activado se vuelve visible inmediatamente.
- Supabase sustituye una llamada lenta y frágil a Apps Script por la lectura de una única fila.
- No existe evidencia que justifique exactamente 300 segundos; ese valor corresponde al feed de YouTube, no a `WebsiteData`.

La frescura real quedará gobernada por la publicación:

- Bordados: la fuente cambia diariamente alrededor de las 03:40.
- Progresos: pueden cambiar en cualquier momento.
- Club, SALs y novedades: cambios editoriales puntuales.
- La web mostrará el último snapshot aprobado, aunque Sheets continúe cambiando.

Después de estabilizar el corte, la mejora recomendada sería caché etiquetada con invalidación inmediatamente posterior a una activación correcta. Eso permitiría mantener el snapshot en caché sin imponer un retraso fijo. No lo añadiría en el primer corte porque requiere otro mecanismo autenticado y amplía el cambio.

## 7. Diseño final recomendado de `website_data_snapshots`

Eliminaría `is_active` y usaría un único campo `status`, evitando dos indicadores que puedan contradecirse.

| CampoRecomendación  |                                                       |
| ------------------- | ----------------------------------------------------- |
| `id`                | UUID, clave primaria                                  |
| `version`           | Número secuencial legible y único                     |
| `payload`           | `jsonb NOT NULL` con el contrato completo             |
| `source_checksum`   | SHA-256 canónico; único junto con `source`            |
| `source`            | Texto; inicialmente `apps_script:website-data`        |
| `captured_at`       | Momento en que se obtuvo el JSON de origen            |
| `status`            | `pending`, `validated`, `active` o `superseded`       |
| `validation_report` | `jsonb` pequeño con conteos, advertencias y resultado |
| `notes`             | Texto opcional para observaciones humanas             |
| `created_at`        | Momento de inserción                                  |
| `validated_at`      | Momento en que superó la validación                   |
| `activated_at`      | Momento de publicación                                |

No añadiría todavía autor, entorno, ramas ni un modelo relacional para cada sección.

La garantía de **como máximo un activo** debe estar en la base de datos mediante un índice único parcial sobre `status` cuando sea `active`.

La garantía de **exactamente un activo durante la operación normal** corresponde al flujo:

- La carga inicial crea el primero.
- Las activaciones posteriores cambian anterior y candidato dentro de una misma transacción.
- Los lectores ven el estado anterior o el nuevo, nunca un estado intermedio.
- Un fallo revierte la transacción completa.
- La primitiva de activación debe ser transaccional y accesible únicamente por el publicador privilegiado.

## 8. Consecuencias para Codex 1 y Codex 2

**Codex 1 — Supabase y seguridad**

Debe recibir el diseño revisado:

- Crear `website_data_snapshots` con `status`, sin `is_active`.
- Añadir `version`, procedencia, informe y marcas temporales.
- Crear unicidad de checksum e índice único parcial para el activo.
- Implementar la activación transaccional.
- Habilitar RLS.
- Revocar permisos de escritura públicos.
- Permitir a `anon` leer exclusivamente el snapshot activo.
- Verificar que `pending`, `validated` y `superseded` no sean visibles públicamente.
- No importar ni activar datos como efecto implícito de la migración.

**Codex 2 — publicación, carga inicial y runtime**

Debe:

- Construir el publicador bajo demanda con acciones separadas `preparar` y `activar`.
- Validar exactamente el contrato definido en [phase1-data.ts (line 141)]\(/Users/cristianfrutossole/.codex/.chatgpt-projects/g-p-6a881c7a92408191a25eae483de774af/sources/phase1-data.ts:141).
- Usar el backup actual como candidato inicial, calcular su checksum e importarlo primero como `pending`.
- Compararlo con el origen y activarlo únicamente tras aprobación.
- Modificar `getWebsiteData()` para leer el único snapshot activo de Supabase con `no-store`.
- Conservar exactamente el tipo `WebsiteData`, páginas, componentes y URLs.
- No tocar los endpoints de escritura que todavía dependen de Apps Script.
- Probar activación y rollback en una base Supabase local o desechable antes del cutover.
- No eliminar todavía variables, hojas ni código antiguo: esa limpieza corresponde a una fase posterior a la estabilización.

## 9. Incógnitas que siguen siendo imposibles de resolver

- El código exacto del `doGet` desplegado para `mode=website-data` no está en GitHub.
- No se puede demostrar qué versión concreta de Apps Script está desplegada ni si coincide con alguna copia local.
- No se han podido inspeccionar los triggers de Apps Script, aunque el historial demuestra con bastante claridad una sincronización diaria alrededor de las 03:40.
- No está confirmado si existen otras automatizaciones externas que escriban en las hojas además de las observadas.
- No se puede asegurar que la web desplegada estuviera sirviendo el backup durante la inspección, porque varias rutas públicas no respondieron de forma verificable.
- No se conoce todavía el volumen futuro de tráfico, por lo que no se puede justificar cuantitativamente un TTL óptimo.
- No está decidido quién ejecutará y aprobará las publicaciones bajo demanda durante el periodo transitorio.
- No está definido cuándo la frecuencia diaria de bordados justificará automatizar la preparación o la activación.
- No puede determinarse si el SAL de Halloween está deliberadamente en preparación o simplemente incompleto; por ahora debe tratarse como contenido no publicado.





👉 Y CUANDO LE HE ENVIADO ESTE MENSAJE "Ese spreadsheet de seguimiento vinculado a BordadoConfig acabará desapareciendo porque estoy desarrollando una aplicación web de seguimiento de bordados que será donde estarán esos datos en un futuro próximo." JUSTO ANTES DE QUE EMPEZARA A ESCRIBIR SU RESPUESTA, entonces ha respondido lo siguiente:



Eso refuerza la recomendación de la **Estrategia B**, pero deja claro que Sheets debe tratarse como una fuente editorial estrictamente transitoria.

El diseño de Fase 1 debería quedar desacoplado del origen:
```
Ahora:
Spreadsheet de seguimiento
        ↓
WEB - Bordando con Fru
        ↓
Apps Script
        ↓
Publicador de snapshots
        ↓
Supabase → web pública

Futuro:
Aplicación de seguimiento
        ↓
Adaptador/exportador WebsiteData
        ↓
Publicador de snapshots
        ↓
Supabase → web pública
```

Consecuencias concretas:

- `website_data_snapshots` no debe contener referencias estructurales al spreadsheet ni reproducir sus pestañas.
- `source` debería registrar valores genéricos como:
  - `apps_script:website-data`
  - `tracking_app:website-data`
- El publicador debe recibir un objeto `WebsiteData`, independientemente de quién lo genere.
- La sustitución futura del spreadsheet afectará solamente al extractor o adaptador; no al esquema, al runtime de Next.js ni a las páginas.
- No conviene invertir trabajo en reconstruir una integración directa y permanente con `BordadoConfig`.
- Tampoco recomiendo migrar ahora cada fila de bordados a tablas relacionales dentro de esta Fase 1: la futura aplicación debe decidir su propio modelo operativo.
- El snapshot seguirá siendo la capa pública estable, aunque la aplicación futura use Supabase u otra base de datos como almacenamiento interno.

La secuencia correcta queda así:

1. Fase 1: eliminar Apps Script y Sheets del runtime público mediante snapshots.
2. Estabilización: validar publicación, rollback y frescura.
3. Aplicación de seguimiento: convertirla en nueva fuente de los datos de bordado.
4. Retirada: eliminar `BordadoConfig`, el spreadsheet anual y su sincronización.
5. Opcionalmente, cuando la aplicación futura sea estable, decidir si continúa publicando snapshots o si la web puede leer directamente su modelo.

La conclusión arquitectónica no cambia: **Supabase almacena el contrato público estable; la fuente productora puede cambiar sin volver a migrar la web**.
