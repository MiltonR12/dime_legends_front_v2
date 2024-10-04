export interface Configuration {
  tipo: string;
  minPlayers: number;
  maxPlayers: number;
  maxTeams: number;
  isFree: boolean;
}

export interface PTournament {
  name: string;
  formUrl: string | null;
  dateStart: string;
  game: string;
  image: string;
  prize: string | null;
  imageQr: string | null;
  account: string | null;
  description: string;
  modality: string[];
  requirements: string[];
  rules: string[];
  award: string[];
  note: string;
  config: Configuration;
}

export interface RGetTournament {
  code: number;
  message: string;
  status: string;
  data: {
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
    config: {
      minPlayers: number;
      maxPlayers: number;
      maxTeams: number;
      isFree: boolean;
      registrationEnd: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface RGetTournamentById {
  code: number;
  message: string;
  status: string;
  data: {
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
    teams: string[];
    battles: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface RGetMyTournament {
  code: number;
  message: string;
  status: string;
  data: {
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
    teams: string[];
    battles: string[];
    createdAt: string;
    updatedAt: string;
  }[];
}