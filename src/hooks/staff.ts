import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptInviteApi,
  cancelInviteApi,
  createInviteApi,
  getStaffApi,
  leaveTournamentApi,
  previewInviteApi,
  rejectInviteApi,
  removeOrganizerApi,
  searchCreatorsApi,
} from "@/app/api/tournament/staffApi";
import { queryKeys } from "./queryKeys";

export function useTournamentStaff(id?: string) {
  return useQuery({
    queryKey: queryKeys.tournaments.staff(id ?? ""),
    queryFn: () => getStaffApi(id!),
    enabled: !!id,
  });
}

export function useCreatorSearch(query: string) {
  const text = query.trim();
  return useQuery({
    queryKey: queryKeys.tournaments.creators(text),
    queryFn: () => searchCreatorsApi(text),
    enabled: text.length >= 2,
  });
}

export function useInvitePreview(token?: string) {
  return useQuery({
    queryKey: ["tournaments", "invite", token ?? ""],
    queryFn: () => previewInviteApi(token!),
    enabled: !!token,
    retry: false,
  });
}

const refreshStaff = (qc: ReturnType<typeof useQueryClient>, id: string) => {
  qc.invalidateQueries({ queryKey: queryKeys.tournaments.staff(id) });
  qc.invalidateQueries({ queryKey: queryKeys.tournaments.detail(id) });
  qc.invalidateQueries({ queryKey: queryKeys.tournaments.mine });
};

export function useCreateInvite(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => createInviteApi(id, userId),
    onSuccess: () => refreshStaff(qc, id),
  });
}

export function useCancelInvite(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) => cancelInviteApi(id, inviteId),
    onSuccess: () => refreshStaff(qc, id),
  });
}

export function useRemoveOrganizer(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => removeOrganizerApi(id, userId),
    onSuccess: () => refreshStaff(qc, id),
  });
}

export function useLeaveTournament(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => leaveTournamentApi(id),
    onSuccess: () => refreshStaff(qc, id),
  });
}

export function useAcceptInvite(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => acceptInviteApi(token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tournaments.mine }),
  });
}

export function useRejectInvite(token: string) {
  return useMutation({
    mutationFn: () => rejectInviteApi(token),
  });
}
