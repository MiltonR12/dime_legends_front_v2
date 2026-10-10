export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  users: {
    all: ["users"] as const,
  },
  battles: {
    all: ["battles"] as const,
    list: (tournamentId: string) => ["battles", tournamentId] as const,
    bracket: (tournamentId: string) => ["battles", "bracket", tournamentId] as const,
  },
  teams: {
    all: ["teams"] as const,
    list: (tournamentId: string) => ["teams", tournamentId] as const,
    mine: ["teams", "mine"] as const,
    public: (id: string) => ["teams", "public", id] as const,
  },
  pages: {
    organizers: ["page", "organizers"] as const,
  },
  tournaments: {
    all: ["tournaments"] as const,
    list: ["tournaments", "list"] as const,
    mine: ["tournaments", "mine"] as const,
    detail: (id: string) => ["tournaments", id] as const,
    staff: (id: string) => ["tournaments", id, "staff"] as const,
    creators: (query: string) => ["tournaments", "creators", query] as const,
    organizer: (id: string) => ["page", "public", id] as const,
  },
}
