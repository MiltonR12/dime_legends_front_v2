import axios from "@/lib/axios"
import type { ApiResponse } from "../response"
import type { DeskEvent, DeskState, HeroCard } from "@/broadcast/types"

export const getHeroesApi = async () => {
  const { data } = await axios.get<ApiResponse<HeroCard[]>>("/broadcast/heroes")
  return data.data
}

export const getDeskApi = async (id: string) => {
  const { data } = await axios.get<ApiResponse<DeskState>>(`/broadcast/${id}`)
  return data.data
}

export const openDeskApi = async (id: string) => {
  const { data } = await axios.post<ApiResponse<DeskState>>(`/broadcast/${id}`)
  return data.data
}

export const updateDeskApi = async (id: string, event: DeskEvent) => {
  const { data } = await axios.patch<ApiResponse<DeskState>>(`/broadcast/${id}`, event)
  return data.data
}
