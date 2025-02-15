export interface PCreateBattle {
  date: Date;
  teamOne: string;
  teamTwo: string;
  tournament: string;
  round: number;
  group: string;
}

export interface PUpdateBattle {
  id: string;
  date: Date;
  teamOne: string;
  teamTwo: string;
  round: number;
  group: string;
}

export interface PWinnerBattle {
  id: string;
  winner: string | null;
}