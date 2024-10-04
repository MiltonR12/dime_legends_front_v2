export interface PCreateBattle {
  hour: string;
  date: Date;
  teamOne: string;
  teamTwo: string;
  tournament: string;
}

export interface PUpdateBattle {
  id: string;
  hour: string;
  date: Date;
  teamOne: string;
  teamTwo: string;
}

export interface PWinnerBattle {
  id: string;
  winner: string;
  tournament: string;
}