export type ReadingItem = {
  id: string;
  titulo: string;
  autor: string;
  sinopsis: string;
  generos: string;
  goodreads_url: string;
  portada_url: string;
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
  goodreads_url: string;
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

export type WebsiteData = {
  currentReading: ReadingItem | null;
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

  const response = await fetch(url, { cache: "no-store" });
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