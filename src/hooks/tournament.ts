import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {
  createTournamentApi,
  deleteTournamentApi,
  getListTournamentApi,
  getMyTournamentApi,
  getTournamentByIdApi,
  getTournamentSummaryApi,
  updateTournamentApi,
} from "@/app/api/tournament/tournamentApi"
import type { PTournament, PUpdateTournament } from "@/app/api/tournament/tournament"
import { queryKeys } from "./queryKeys"

export function useTournament(id?: string) {
  return useQuery({
    queryKey: queryKeys.tournaments.detail(id ?? ""),
    queryFn: () => getTournamentByIdApi(id!),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false
      return failureCount < 2
    },
  })
}

export function useTournaments() {
  return useQuery({
    queryKey: queryKeys.tournaments.list,
    queryFn: getListTournamentApi,
  })
}

export function useMyTournaments(enabled = true) {
  return useQuery({
    queryKey: queryKeys.tournaments.mine,
    queryFn: getMyTournamentApi,
    enabled,
  })
}

export function useTournamentSummary(enabled = true) {
  return useQuery({
    queryKey: queryKeys.tournaments.summary,
    queryFn: getTournamentSummaryApi,
    enabled,
  })
}

export function useCreateTournament() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PTournament) => createTournamentApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tournaments.all }),
  })
}

export function useUpdateTournament() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PUpdateTournament) => updateTournamentApi(data),
    onSuccess: (tournament, variables) => {
      if (tournament) qc.setQueryData(queryKeys.tournaments.detail(variables._id), tournament)
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.list })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.mine })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.summary })
    },
  })
}

export function useDeleteTournament() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTournamentApi(id),
    onSuccess: async (_data, id) => {
      await qc.cancelQueries({ queryKey: queryKeys.tournaments.detail(id) })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.list })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.mine })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.summary })
    },
  })
}
