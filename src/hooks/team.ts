import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createTeamApi,
  deleteTeamApi,
  getTeamByTournamentApi,
  updateStatusTeamApi,
  updateTeamApi,
} from "@/app/api/team/teamApi"
import type { PCreateTeam, PUpdateStatusTeam, PUpdateTeam } from "@/app/api/team/team"
import { queryKeys } from "./queryKeys"

export function useTeamsByTournament(tournamentId?: string) {
  return useQuery({
    queryKey: queryKeys.teams.list(tournamentId ?? ""),
    queryFn: () => getTeamByTournamentApi(tournamentId!),
    enabled: !!tournamentId,
  })
}

export function useCreateTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PCreateTeam) => createTeamApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.teams.all }),
  })
}

export function useUpdateTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PUpdateTeam) => updateTeamApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.teams.all })
      // Los versus incluyen los datos del equipo (nombre y logo).
      qc.invalidateQueries({ queryKey: queryKeys.battles.all })
    },
  })
}

export function useUpdateTeamStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PUpdateStatusTeam) => updateStatusTeamApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.teams.all }),
  })
}

export function useDeleteTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTeamApi(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.teams.all })
      qc.invalidateQueries({ queryKey: queryKeys.battles.all })
    },
  })
}
