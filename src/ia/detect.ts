type Rect = { x: number; y: number; w: number; h: number };
type HeroIcon = { slug: string; name: string; iconUrl: string };

const SCRIPT =
  "https://cdn.jsdelivr.net/npm/@techstark/opencv-js@4.10.0-release.1/dist/opencv.js";

type CvMat = { delete: () => void };
type Cv = {
  Mat: new () => CvMat;
  imread: (source: HTMLCanvasElement) => CvMat;
  cvtColor: (src: CvMat, dst: CvMat, code: number) => void;
  matchTemplate: (
    image: CvMat,
    templ: CvMat,
    dst: CvMat,
    method: number,
  ) => void;
  minMaxLoc: (src: CvMat) => { maxVal: number };
  COLOR_RGBA2RGB: number;
  TM_CCOEFF_NORMED: number;
  onRuntimeInitialized?: () => void;
};

declare global {
  interface Window {
    cv?: Cv;
  }
}

export type Guess = { slug: string; name: string; score: number };

let cvPromise: Promise<Cv> | null = null;
let templates: {
  key: string;
  items: { slug: string; name: string; mat: CvMat }[];
} | null = null;

function loadOpenCv(): Promise<Cv> {
  if (!cvPromise) {
    cvPromise = new Promise((resolve, reject) => {
      const ready = () => {
        const cv = window.cv;
        if (cv && typeof cv.imread === "function") {
          resolve(cv);
          return true;
        }
        return false;
      };
      if (ready()) return;
      const existing = window.cv;
      if (existing && !existing.imread) {
        existing.onRuntimeInitialized = () => {
          if (!ready()) reject(new Error("OpenCV no terminó de iniciar."));
        };
        return;
      }
      const script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      script.onload = () => {
        const cv = window.cv;
        if (!cv) {
          reject(new Error("OpenCV no se registró."));
          return;
        }
        if (typeof cv.imread === "function") resolve(cv);
        else cv.onRuntimeInitialized = () => resolve(cv);
      };
      script.onerror = () => reject(new Error("No se pudo cargar OpenCV.js."));
      document.head.appendChild(script);
    });
  }
  return cvPromise;
}

function paint(
  source: CanvasImageSource,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("El navegador no abrió un lienzo.");
  context.drawImage(source, sx, sy, sw, sh, 0, 0, 32, 32);
  return canvas;
}

function toRgb(cv: Cv, canvas: HTMLCanvasElement): CvMat {
  const raw = cv.imread(canvas);
  const rgb = new cv.Mat();
  cv.cvtColor(raw, rgb, cv.COLOR_RGBA2RGB);
  raw.delete();
  return rgb;
}

function loadHtmlImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
  });
}

export async function rankSlots(
  shot: HTMLImageElement,
  rects: Rect[],
  heroes: HeroIcon[],
): Promise<Guess[][]> {
  const cv = await loadOpenCv();
  const key = heroes.map((hero) => hero.slug).join("|");
  if (!templates || templates.key !== key) {
    templates?.items.forEach((item) => item.mat.delete());
    const items: { slug: string; name: string; mat: CvMat }[] = [];
    for (const hero of heroes) {
      const image = await loadHtmlImage(hero.iconUrl);
      if (!image) continue;
      const canvas = paint(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
      );
      items.push({ slug: hero.slug, name: hero.name, mat: toRgb(cv, canvas) });
    }
    if (items.length === 0)
      throw new Error("No se pudieron cargar los íconos de los héroes.");
    templates = { key, items };
  }

  return rects.map((rect) => {
    const crop = document.createElement("canvas");
    const width = Math.max(1, Math.round(rect.w * shot.naturalWidth));
    const height = Math.max(1, Math.round(rect.h * shot.naturalHeight));
    crop.width = width;
    crop.height = height;
    const context = crop.getContext("2d");
    if (!context) throw new Error("No se pudo recortar la captura.");
    context.drawImage(
      shot,
      rect.x * shot.naturalWidth,
      rect.y * shot.naturalHeight,
      width,
      height,
      0,
      0,
      width,
      height,
    );
    const sample = toRgb(cv, paint(crop, 0, 0, width, height));
    const scored = templates!.items.map((item) => {
      const out = new cv.Mat();
      cv.matchTemplate(sample, item.mat, out, cv.TM_CCOEFF_NORMED);
      const score = cv.minMaxLoc(out).maxVal;
      out.delete();
      return { slug: item.slug, name: item.name, score };
    });
    sample.delete();
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3);
  });
}

declare global {
  interface Window {
    cv?: Cv;
  }
}
