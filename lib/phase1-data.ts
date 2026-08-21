export type ReadingItem = {
  id: string;
  titulo: string;
  autor: string;
  sinopsis: string;
  generos: string;
  goodreads_url: string;
  portada_url: string;
  portada_local?: string;
  portada_large?: string;
  fecha_inicio: string;
  fecha_fin: string;
  recomendada: boolean;
};

export type ProductNewsItem = {
  id: string;
  titulo: string;
  texto: string;
  url: string;
  fecha: string;
  tipo: string;
};

export type ClubStatus = {
  reading: {
    state: "current" | "next" | "none";
    title: string;
    text: string;
    date: string;
  };
  topic: {
    state: "open" | "closed" | "none";
    title: string;
    text: string;
    closeDate: string;
  };
  survey: {
    state: "none" | "upcoming" | "open" | "closed";
    title: string;
    text: string;
    url: string;
    startDate: string;
    endDate: string;
  };
  notice: {
    visible: boolean;
    title: string;
    text: string;
  };
};

export type MyReadingItem = {
  id: string;
  titulo: string;
  autor: string;
  portada_url: string;
  portada_local?: string;
  goodreads_url: string;
  generos: string;
  formato: "fisico" | "digital" | string;
  paginas_totales: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: "leyendo" | "pausado" | "terminado" | "abandonado" | string;
  pagina_actual: number;
  porcentaje_actual: number;
  progressPercent: number;
  ultimo_progreso: string;
  nota: string;
};

export type BordadoResumen = {
  anio: number;
  mes: number;
  mes_nombre: string;
  total_mes: number;
  total_anual: number;
  dias_activos_mes: number;
  proyecto_mas_trabajado_mes: string;
  ultima_actualizacion: string;
  visible: string;
};

export type BordadoMesActualItem = {
  fecha: string;
  dia: number;
  proyecto: string;
  cruces: number;
  total_dia: number;
  orden: number;
  visible: string;
};

export type BordadoWipItem = {
  id: string;
  slug: string;
  titulo: string;
  fecha_inicio: string;
  fecha_fin: string;
  cruces_anio: number;
  cruces_previas: number;
  cruces_acumuladas: number;
  total_cruces: number;
  progreso: string;
  estado: string;
  imagen_url: string;
  notas: string;
  visible: string;
  orden: number;
};

export type SalItem = {
  id: string;
  slug: string;
  titulo: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
  descripcion_corta: string;
  descripcion_larga: string;
  tipo: string;
  whatsapp_url: string;
  imagen_principal_url: string;
  visible: string;
  orden: number;
};

export type SalDisenoItem = {
  id: string;
  sal_id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  enlace_compra: string;
  count_info: string;
  visible: string;
  orden: number;
};

export type WebsiteData = {
  currentReading: ReadingItem | null;
  currentReadings: ReadingItem[];
  nextReading: ReadingItem | null;
  previousReadings: ReadingItem[];
  recommendedReadings: ReadingItem[];
  productNews: ProductNewsItem[];
  clubStatus: ClubStatus;
  myReadings: MyReadingItem[];
  readingChallenge: {
    year: number;
    goal: number;
    completed: number;
    progressPercent: number;
  };
  bordadoResumen: BordadoResumen | null;
  bordadoMesActual: BordadoMesActualItem[];
  bordadoWips: BordadoWipItem[];
  sals: SalItem[];
  salDisenos: SalDisenoItem[];
};

export type YouTubeVideo = {
  id: string;
  title: string;
  published: string;
  url: string;
  thumbnail: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export async function getWebsiteData(): Promise<WebsiteData> {
  const baseUrl = requireEnv("GOOGLE_APPS_SCRIPT_WEBHOOK_URL");
  const url = `${baseUrl}?mode=website-data`;

  const response = await fetch(url, {
    cache: "no-store",
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los datos de la Fase 1");
  }

  return response.json();
}

export async function getLatestYouTubeVideos(): Promise<YouTubeVideo[]> {
  const channelId = requireEnv("YOUTUBE_CHANNEL_ID");
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const response = await fetch(feedUrl, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error("No se pudo leer el feed de YouTube");
  }

  const xml = await response.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

  return entries.slice(0, 3).map((entry) => {
    const block = entry[1];

    const id = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
    const title = decodeXml(block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
    const published = block.match(/<published>(.*?)<\/published>/)?.[1] || "";

    return {
      id,
      title,
      published,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  });
}

function decodeXml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function formatPeriod(start: string, end?: string): string {
  if (!start && !end) return "";

  const formatter = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  });

  if (start && !end) {
    const startDate = new Date(start);
    return `Desde ${formatter.format(startDate)}`;
  }

  if (!start && end) {
    const endDate = new Date(end);
    return `Hasta ${formatter.format(endDate)}`;
  }

  const startDate = new Date(start);
  const endDate = new Date(end as string);

  const startLabel = formatter.format(startDate);
  const endLabel = formatter.format(endDate);

  if (startLabel === endLabel) return startLabel;
  return `${startLabel} · ${endLabel}`;
}

export function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatExactPeriod(start?: string, end?: string): string {
  if (!start && !end) return "";

  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (start && !end) {
    return `Desde el ${formatter.format(new Date(start))}`;
  }

  if (!start && end) {
    return `Hasta el ${formatter.format(new Date(end))}`;
  }

  const startLabel = formatter.format(new Date(start as string));
  const endLabel = formatter.format(new Date(end as string));

  if (startLabel === endLabel) return startLabel;

  return `${startLabel} · ${endLabel}`;
}