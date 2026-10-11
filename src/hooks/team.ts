import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ImportTeam } from "@/app/api/team/team.types"
import {
  commitImportApi,
  createOwnedTeamApi,
  createTeamApi,
  deleteTeamApi,
  getMyTeamsApi,
  getPublicTeamApi,
  getTeamByTournamentApi,
  inscribeTeamApi,
  previewImportApi,
  updateStatusTeamApi,
  updateTeamApi,
} from "@/app/api/team/teamApi"
import type { PCreateOwnedTeam, PCreateTeam, PInscribeTeam, PUpdateStatusTeam, PUpdateTeam } from "@/app/api/team/team"
import { queryKeys } from "./queryKeys"

export function useTeamsByTournament(tournamentId?: string) {
  return useQuery({
    queryKey: queryKeys.teams.list(tournamentId ?? ""),
    queryFn: () => getTeamByTournamentApi(tournamentId!),
    enabled: !!tournamentId,
  })
}

export function usePublicTeam(id?: string) {
  return useQuery({
    queryKey: queryKeys.teams.public(id ?? ""),
    queryFn: () => getPublicTeamApi(id!),
    enabled: !!id,
  })
}

export function useMyTeams(enabled = true) {
  return useQuery({
    queryKey: queryKeys.teams.mine,
    queryFn: getMyTeamsApi,
    enabled,
  })
}

export function useCreateOwnedTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PCreateOwnedTeam) => createOwnedTeamApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.teams.mine }),
  })
}

export function useCreateTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PCreateTeam) => createTeamApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.teams.all }),
  })
}

export function useInscribeTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PInscribeTeam) => inscribeTeamApi(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.teams.all }),
  })
}

export function useUpdateTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PUpdateTeam) => updateTeamApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.teams.all })
      qc.invalidateQueries({ queryKey: queryKeys.battles.all })
    },
  })
}

export function useUpdateTeamStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PUpdateStatusTeam) => updateStatusTeamApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.teams.all })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.summary })
    },
  })
}

export function usePreviewImport() {
  return useMutation({
    mutationFn: (data: { tournament: string; sheet: string }) => previewImportApi(data),
  })
}

export function useCommitImport() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { tournament: string; teams: ImportTeam[] }) => commitImportApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.teams.all })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.all })
    },
  })
}

export function useDeleteTeam() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: string; tournament: string }) => deleteTeamApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.teams.all })
      qc.invalidateQueries({ queryKey: queryKeys.battles.all })
      qc.invalidateQueries({ queryKey: queryKeys.tournaments.summary })
    },
  })
}
