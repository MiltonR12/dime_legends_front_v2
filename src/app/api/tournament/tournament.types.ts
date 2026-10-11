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
  phase?: "inscription" | "running" | "finished"
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

export interface PublicOrganizer {
  name: string;
  image: string | null;
  pageId: string;
}

export interface TournamentOne {
  _id: string;
  createdBy: {
    firstName: string;
    lastName: string;
    avatar: string;
    id: string;
  };
  organizer?: PublicOrganizer | null;
  coorganizers?: PublicOrganizer[];
  name: string;
  formUrl: string | null;
  dateStart: string;
  game: string;
  prize: string | null;
  image: string;
  banners?: string[];
  imageQr: string | null;
  account: string | null;
  description: string;
  rules: string[];
  award: string[];
  note: string;
  status: boolean;
  phase?: "inscription" | "running" | "finished";
  config: {
    minPlayers: number;
    maxPlayers: number;
    maxTeams: number;
    isFree: boolean;
    tipo?: "simple" | "doble" | "normal";
    registrationEnd: string | null;
  };
  payment: Payment | null;
  teams: string[];
  battles: string[];
  createdAt: string;
  updatedAt: string;
}

export type TournamentPhase = "inscription" | "running" | "finished"

export interface SummaryTournament {
  _id: string
  name: string
  game: string
  phase: TournamentPhase
  dateStart: string
  accepted: number
}

export interface PendingTeam {
  teamId: string
  team: string
  tournamentId: string
  tournament: string
}

export interface TournamentSummary {
  tournaments: number
  inscription: number
  running: number
  acceptedTeams: number
  list: SummaryTournament[]
  pending: PendingTeam[]
  upcoming: SummaryTournament[]
}

export interface MyTournament {
  _id: string;
  createdBy?: string;
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