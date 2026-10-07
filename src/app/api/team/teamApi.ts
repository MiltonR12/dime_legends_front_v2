import axios from "@/lib/axios"
import type { ApiResponse } from "../response"
import { uploadFile } from "../upload/uploadApi"
import type { PCreateTeam, PUpdateStatusTeam, PUpdateTeam } from "./team"
import type { Team } from "./team.types"

export const getTeamByTournamentApi = async (tournamentId: string) => {
  const { data } = await axios.get<ApiResponse<Team[]>>(`/team/tournament/${tournamentId}`)
  return data.data
}

export const createTeamApi = async (payload: PCreateTeam) => {
  const [image, voucher] = await Promise.all([
    payload.image ? uploadFile(payload.image, "team") : Promise.resolve(undefined),
    payload.voucher ? uploadFile(payload.voucher, "voucher") : Promise.resolve(undefined),
  ])

  const { data } = await axios.post<ApiResponse<Team>>(`/team/${payload.id}`, {
    name: payload.name,
    captain: payload.captain,
    phone: payload.phone,
    players: payload.players,
    image,
    voucher,
  })
  return data.data
}

export const updateTeamApi = async (payload: PUpdateTeam) => {
  const image = payload.image ? await uploadFile(payload.image, "team") : undefined

  const { data } = await axios.put<ApiResponse<Team>>(`/team/${payload.id}`, {
    name: payload.name,
    captain: payload.captain,
    players: payload.players,
    image,
  })
  return data.data
}

export const updateStatusTeamApi = async (payload: PUpdateStatusTeam) => {
  const { data } = await axios.put<ApiResponse<Team>>(`/team/update-status/${payload.id}`, payload)
  return data.data
}

export const deleteTeamApi = async (id: string) => {
  await axios.delete<ApiResponse>(`/team/${id}`)
}
