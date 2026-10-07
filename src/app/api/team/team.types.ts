export interface OwnedTeam {
  _id: string
  owner: string
  name: string
  captain: string
  phone: string
  players: string[]
  image: string | null
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