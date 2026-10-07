import type { BattleSlot, LinkKind } from "./battle.types";

export interface PCreateBattle {
  date: string;
  teamOne?: string;
  teamTwo?: string;
  tournament: string;
  round?: number;
  group?: string;
  position?: { x: number; y: number };
}

export interface PUpdateBattle {
  id: string;
  date?: Date;
  teamOne?: string;
  teamTwo?: string;
  round?: number;
  group?: string;
}

export interface PWinnerBattle {
  id: string;
  winner: string | null;
}

export interface PBattlePosition {
  id: string;
  x: number;
  y: number;
}

export interface PLinkBattle {
  id: string;
  kind: LinkKind;
  /** `null` quita la conexión. */
  target: string | null;
  slot?: BattleSlot;
}

export interface PAutoGenerate {
  tournamentId: string;
  format: "single" | "double";
  replace?: boolean;
}
