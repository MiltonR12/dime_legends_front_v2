export interface PCreateTeam {
  name: string;
  captain: string;
  phone: string;
  image: File | null;
  players: string[];
  id: string;
}

export interface PCreateOwnedTeam {
  name: string;
  phone: string;
  image: File | null;
  players: string[];
}

export interface PInscribeTeam {
  teamId: string;
  tournamentId: string;
  voucher: File | null;
}

export interface PUpdateTeam {
  name: string;
  captain?: string;
  phone?: string;
  players: string[];
  image?: File | string | null;
  id: string;
}

export interface PUpdateStatusTeam {
  id: string;
  status: string;
  tournament: string;
}
