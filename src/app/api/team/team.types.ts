export interface TeamInscription {
  status: "pending" | "active" | "inactive" | string
  tournament: { _id: string; name: string }
}

export interface ImportTeam {
  name: string
  captain: string
  phone: string
  players: string[]
}

export interface ImportPreviewTeam extends ImportTeam {
  issue: string | null
}

export interface ImportResult {
  created: string[]
  skipped: { name: string; reason: string }[]
}

export interface OwnedTeam {
  _id: string
  owner: string
  name: string
  captain: string
  phone: string
  players: string[]
  image: string | null
  inscriptions?: TeamInscription[]
}

export interface PublicTeam {
  _id: string
  name: string
  captain: string
  players: string[]
  image: string | null
  tournaments: {
    _id: string
    name: string
    dateStart: string
    game: string
    phase?: "inscription" | "running" | "finished"
    image: string | null
  }[]
}

export interface Team {
  _id: string
  tournament: string
  name: string
  captain: string
  phone: string
  players: string[]
  image: string | null
  voucher: string | null
  status: string
  deleted: boolean
  createdAt: string
  updatedAt: string
}