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
  },
  tournaments: {
    all: ["tournaments"] as const,
    list: ["tournaments", "list"] as const,
    mine: ["tournaments", "mine"] as const,
    detail: (id: string) => ["tournaments", id] as const,
  },
}
