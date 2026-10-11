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
  game: { kills: { blue: number; red: number } };
  result: { winner: Side | null; durationSec: number; kda: DeskKda[] };
  activeOverlay: OverlayId;
  updatedAt: string;
};

export function fillDesk(state: DeskState): DeskState {
  return {
    ...state,
    sponsors: state.sponsors ?? [],
    casters: state.casters ?? [],
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
  | {
      type: "slot";
      side: Side;
      kind: "ban" | "pick";
      index: number;
      heroSlug: string | null;
    }
  | { type: "series"; bestOf: 1 | 3 | 5 | 7; blue: number; red: number }
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
