export interface PCreateTeam {
  teamName: string;
  captain: string;
  image?: string;
  players: string[];
  id: string;
}

export interface PUpdateTeam {
  teamName?: string;
  captain?: string;
  players?: string[];
  status?: string;
  id: string;
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
