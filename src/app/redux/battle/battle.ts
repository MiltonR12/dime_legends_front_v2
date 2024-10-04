export interface InitialStateBattle {
  battles: TBattle[];
  isLoading: boolean;
}

export interface TBattle {
  _id: string;
  hour: string;
  date: string;
  teamOne: BattleTeam | null;
  teamTwo: BattleTeam | null;
  tournament: string;
  round: number;
  nro: number;
  group: string;
  winner: string;
  status: string;
  note: string;
}

interface BattleTeam {
  _id: string;
  teamName: string;
  image: string;
  captain: string;
  players: string[];
}
