export interface PCreateBattle {
  date: Date;
  teamOne: string;
  teamTwo: string;
  tournament: string;
}

export interface PUpdateBattle {
  id: string;
  date: Date;
  teamOne: string;
  teamTwo: string;
}

export interface PWinnerBattle {
  id: string;
  winner: string;
  tournament: string;
}