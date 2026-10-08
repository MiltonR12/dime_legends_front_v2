import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  approveOrganizerApi,
  listUsersApi,
  rejectOrganizerApi,
  updateUserRoleApi,
  updateUserStatusApi,
} from "@/app/api/user/userApi"
import { queryKeys } from "./queryKeys"

export function useUsers(page: number, search: string, enabled = true) {
  return useQuery({
    queryKey: [...queryKeys.users.all, page, search] as const,
    queryFn: () => listUsersApi(page, search),
    placeholderData: keepPreviousData,
    enabled,
  })
}

function useRefreshUsers() {
  const qc = useQueryClient()
  return () => qc.invalidateQueries({ queryKey: queryKeys.users.all })
}

export function useSetUserRole() {
  const refresh = useRefreshUsers()
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: "User" | "Creator" }) => updateUserRoleApi(id, role),
    onSuccess: refresh,
  })
}

export function useSetUserStatus() {
  const refresh = useRefreshUsers()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => updateUserStatusApi(id, status),
    onSuccess: refresh,
  })
}

export function useApproveOrganizer() {
  const refresh = useRefreshUsers()
  return useMutation({
    mutationFn: (id: string) => approveOrganizerApi(id),
    onSuccess: refresh,
  })
}

export function useRejectOrganizer() {
  const refresh = useRefreshUsers()
  return useMutation({
    mutationFn: (id: string) => rejectOrganizerApi(id),
    onSuccess: refresh,
  })
}
