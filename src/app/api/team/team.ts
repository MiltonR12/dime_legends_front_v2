export interface PCreateTeam {
  name: string;
  captain: string;
  phone: string;
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
