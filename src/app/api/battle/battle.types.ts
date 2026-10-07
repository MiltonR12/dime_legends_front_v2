import type { Team } from "../team/team.types";

export type BattleSlot = "teamOne" | "teamTwo";
export type LinkKind = "winner" | "loser";

/** Conexión hacia otro versus: a cuál y en qué hueco entra el equipo. */
export interface BattleLink {
  battle: string;
  slot: BattleSlot;
}

export interface TBattle {
  _id: string;
  hour: string;
  date: string;
  teamOne: Team | null;
  teamTwo: Team | null;
  tournament: string;
  round: number;
  nro: number;
  group: string;
  winner: string | null;
  position: { x: number; y: number };
  winnerTo: BattleLink | null;
  loserTo: BattleLink | null;
  status: string;
  note: string;
}
