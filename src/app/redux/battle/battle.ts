import { Team } from "../team/team";

export interface InitialStateBattle {
  battles: TBattle[];
  isLoading: boolean;
  winnerBrackets: {
    round: number;
    battles: TBattle[];
  }[];
  loserBrackets: {
    round: number;
    battles: TBattle[];
  }[];
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
  status: string;
  note: string;
}
