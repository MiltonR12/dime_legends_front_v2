export interface PCreateTeam {
  name: string;
  captain: string;
  image: File | null;
  voucher: File | null;
  players: string[];
  id: string;
}

export interface PUpdateTeam {
  name: string;
  captain: string;
  players: string[];
  status?: string;
  image?: File | null;
  id: string;
}

export interface PUpdateStatusTeam {
  id: string;
  status: string;
}

export interface RGetTeamByTournament {
  data: {
    voucher: null;
    _id: string;
    tournament: string;
    teamName: string;
    captain: string;
    players: string[];
    image: null;
    status: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  success: boolean;
  message: string;
  status: string;
}
