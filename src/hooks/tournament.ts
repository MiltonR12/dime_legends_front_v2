import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createTournamentApi,
  deleteTournamentApi,
  getListTournamentApi,
  getMyTournamentApi,
  getTournamentByIdApi,
  updateTournamentApi,
} from "@/app/api/tournament/tournamentApi"
import type { PTournament, PUpdateTournament } from "@/app/api/tournament/tournament"
import { queryKeys } from "./queryKeys"

export function useTournament(id?: string) {
  return useQuery({
    queryKey: queryKeys.tournaments.detail(id ?? ""),
    queryFn: () => getTournamentByIdApi(id!),
    enabled: !!id,
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
    },
  })
}

export function useDeleteTournament() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTournamentApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tournaments.all }),
  })
}
