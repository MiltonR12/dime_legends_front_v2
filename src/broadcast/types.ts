export const LANES = ["exp", "jungle", "mid", "gold", "roam"] as const;
export type Lane = (typeof LANES)[number];
export type Side = "blue" | "red";
export type OverlayId = "draft" | "presentacion" | "marcador" | "resultado";

export const isVideoUrl = (url: string) => /\.(mp4|webm)(\?|$)/i.test(url);

export const LANE_LABEL: Record<Lane, string> = {
  exp: "EXP",
  jungle: "Jungla",
  mid: "Mid",
  gold: "Oro",
  roam: "Roam",
};

export type DeskPlayer = {
  id: string;
  nick: string;
  lane: Lane;
  heroSlug: string | null;
};

export type DeskTeam = {
  teamId: string | null;
  name: string;
  tag: string;
  logoUrl: string;
  color: string;
  players: DeskPlayer[];
};

export type DeskSponsor = { id: string; name: string; logoUrl: string };
export type DeskCaster = { id: string; name: string; role: string };
export type DeskKda = {
  playerId: string;
  side: Side;
  kills: number;
  deaths: number;
  assists: number;
};

export type DeskClock = {
  running: boolean;
  startedAt: string | null;
  elapsedMs: number;
};

export const clockMs = (clock: DeskClock, now = Date.now()) => {
  if (!clock.running || !clock.startedAt) return clock.elapsedMs;
  const start = Date.parse(clock.startedAt);
  if (Number.isNaN(start)) return clock.elapsedMs;
  return clock.elapsedMs + Math.max(0, now - start);
};

export const formatClock = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export type DeskState = {
  tournament: { name: string; logoUrl: string; stage: string };
  theme: {
    accent: string;
    background: string;
    ink: string;
    backgroundImageUrl: string;
  };
  sponsors: DeskSponsor[];
  casters: DeskCaster[];
  teams: { blue: DeskTeam; red: DeskTeam };
  bans: { blue: (string | null)[]; red: (string | null)[] };
  series: { bestOf: 1 | 3 | 5 | 7; score: { blue: number; red: number } };
  clock: DeskClock;
  game: { kills: { blue: number; red: number } };
  result: { winner: Side | null; durationSec: number; kda: DeskKda[] };
  activeOverlay: OverlayId;
  updatedAt: string;
};

export function fillDesk(state: DeskState): DeskState {
  const clock = state.clock;
  const startedAt =
    typeof clock?.startedAt === "string" ? clock.startedAt : null;
  return {
    ...state,
    sponsors: state.sponsors ?? [],
    casters: state.casters ?? [],
    clock: {
      running: clock?.running === true && !!startedAt,
      startedAt: clock?.running === true ? startedAt : null,
      elapsedMs:
        typeof clock?.elapsedMs === "number" && Number.isFinite(clock.elapsedMs)
          ? Math.max(0, clock.elapsedMs)
          : 0,
    },
    result: {
      winner: state.result?.winner ?? null,
      durationSec: state.result?.durationSec ?? 0,
      kda: state.result?.kda ?? [],
    },
  };
}

export type HeroCard = {
  slug: string;
  name: string;
  title: string;
  iconUrl: string;
  portraitUrl: string;
  /** Clip de entrada del héroe. Puede no existir para todos. */
  videoUrl?: string;
  lanes: string[];
  /** Clase del héroe: asesino, mago, tanque… */
  roles?: string[];
};

export type DeskEvent =
  | { type: "side"; side: Side; teamId: string }
  | { type: "match"; blue: string; red: string }
  | {
      type: "slot";
      side: Side;
      kind: "ban" | "pick";
      index: number;
      heroSlug: string | null;
    }
  | { type: "series"; bestOf: 1 | 3 | 5 | 7; blue: number; red: number }
  | { type: "clock"; action: "start" | "pause" | "reset" }
  | { type: "kills"; blue: number; red: number }
  | { type: "result"; winner: Side | null; durationSec: number }
  | { type: "sponsors"; sponsors: DeskSponsor[] }
  | { type: "casters"; casters: DeskCaster[] }
  | { type: "kda"; rows: DeskKda[] }
  | { type: "background"; url: string }
  | { type: "stage"; stage: string }
  | { type: "overlay"; overlay: OverlayId }
  | { type: "clear" }
  | {
      type: "detected";
      bans: { blue: (string | null)[]; red: (string | null)[] };
      picks: { blue: (string | null)[]; red: (string | null)[] };
    };
