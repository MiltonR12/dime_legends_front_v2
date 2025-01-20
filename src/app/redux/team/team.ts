export interface initialStateTeam {
  teams: Team[]
  team: Team | null
  isLoading: boolean
}

export interface Team {
  voucher: null
  _id: string
  tournament: string
  name: string
  captain: string
  players: string[]
  image: null
  status: string
  deleted: boolean
  createdAt: string
  updatedAt: string
}