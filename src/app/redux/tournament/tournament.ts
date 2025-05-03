export interface InitialStateTournamet {
  listTournaments: ListTournament[];
  tournaments: Tournament[];
  tournament: TournamentOne | null;
  myTournaments: MyTournament[];
  isLoading: boolean;
  isLoadingMy: boolean;
}

export interface ListTournament {
  _id: string
  createdBy: CreatedBy
  name: string
  dateStart: string
  game: string
  image: string
  modality: string[]
  payment: Payment
  teamsCount: number
}

interface CreatedBy {
  firstName: string
  lastName: string
}

export interface Tournament {
  _id: string;
  createdBy: {
    firstName: string;
    lastName: string;
    avatar: string;
    id: string;
  };
  name: string;
  formUrl: string | null;
  dateStart: string;
  game: string;
  prize: string | null;
  image: string;
  imageQr: string | null;
  account: string | null;
  description: string;
  rules: string[];
  award: string[];
  note: string;
  config: {
    minPlayers: number;
    maxPlayers: number;
    maxTeams: number;
    isFree: boolean;
    registrationEnd: string;
  };
  payment: Payment | null;
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  amount: number;
  account: string;
  qrImage: string;
}

export interface TournamentOne {
  _id: string;
  createdBy: {
    firstName: string;
    lastName: string;
    avatar: string;
    id: string;
  };
  name: string;
  formUrl: string | null;
  dateStart: string;
  game: string;
  prize: string | null;
  image: string;
  imageQr: string | null;
  account: string | null;
  description: string;
  modality: string[];
  requirements: string[];
  rules: string[];
  award: string[];
  note: string;
  status: boolean;
  config: {
    minPlayers: number;
    maxPlayers: number;
    maxTeams: number;
    isFree: boolean;
    registrationEnd: string | null;
  };
  payment: Payment | null;
  teams: string[];
  battles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MyTournament {
  _id: string;
  name: string;
  dateStart: string;
  game: string;
  prize: string | null;
  image: string;
  status: boolean;
  config: {
    minPlayers: number;
    maxPlayers: number;
    maxTeams: number;
    isFree: boolean;
    registrationEnd: string | null;
  };
  createdAt: string;
  updatedAt: string;
}