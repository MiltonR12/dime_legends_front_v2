export interface CreatorHit {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  pageId: string;
}

export interface StaffOrganizer {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  pageId: string | null;
  active: boolean;
}

export interface StaffInvite {
  _id: string;
  expiresAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

export interface TournamentStaff {
  isOwner: boolean;
  organizers: StaffOrganizer[];
  invites: StaffInvite[];
}

export interface InvitePreview {
  tournament: { _id: string; name: string; game: string };
  expiresAt: string;
}

export interface CreatedInvite {
  token: string;
  expiresAt: string;
  path: string;
}
