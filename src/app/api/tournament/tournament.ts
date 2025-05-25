export interface Configuration {
  minPlayers: number;
  maxPlayers: number;
  maxTeams: number;
  registrationEnd: Date;
  tipo: "doble" | "simple";
}

export interface IPayment {
  qrImage: File;
  account: string;
  amount: number;
}

export interface PTournament {
  name: string;
  formUrl: string;
  dateStart: string;
  game: string;
  image: File;
  description: string;
  rules: string[];
  award: string[];
  config: Configuration;
  payment: IPayment | null;
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

export interface PUpdateTournament {
  _id: string;
  name?: string;
  formUrl?: string;
  dateStart?: string;
  game?: string;
  image?: File;
  description?: string;
  rules?: string[];
  award?: string[];
  config?: Configuration;
  payment?: IPayment | null;
  status?: boolean;
}