import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  authLoginApi,
  authLoginGoogleApi,
  authRegisterApi,
  createPageApi,
  validateTokenApi,
} from "@/app/api/auth/authApi"
import type { PCreatePage, PLogin, PRegister } from "@/app/api/auth/auth"
import type { User } from "@/app/api/auth/auth.types"
import { queryKeys } from "./queryKeys"

const hasToken = () => !!localStorage.getItem("token")

// GET /validate-token
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async (): Promise<User | null> => {
      try {
        return await validateTokenApi()
      } catch (error) {
        localStorage.removeItem("token")
        throw error
      }
    },
    enabled: hasToken(),
    retry: false,
    staleTime: Infinity,
  })
}

// El usuario vive en la cache de TanStack Query.
export function useAuth() {
  const { data, isLoading } = useCurrentUser()
  const user = data ?? null
  return { user, isAuthenticated: !!user, isLoading: hasToken() && isLoading }
}

// POST /login
export function useLogin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PLogin) => authLoginApi(data),
    onSuccess: (user) => qc.setQueryData(queryKeys.auth.me, user),
  })
}

// POST /google
export function useLoginGoogle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (token: string) => authLoginGoogleApi(token),
    onSuccess: (user) => qc.setQueryData(queryKeys.auth.me, user),
  })
}

// POST /register
export function useRegister() {
  return useMutation({
    mutationFn: (data: PRegister) => authRegisterApi(data),
  })
}

export function useLogout() {
  const qc = useQueryClient()
  return () => {
    localStorage.removeItem("token")
    qc.setQueryData(queryKeys.auth.me, null)
    qc.removeQueries({ predicate: (query) => query.queryKey[0] !== "auth" })
  }
}

// POST /page (FormData): solicitud para ser organizador
export function useCreateUserPage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PCreatePage) => createPageApi(data),
    onSuccess: (user) => qc.setQueryData(queryKeys.auth.me, user),
  })
}
