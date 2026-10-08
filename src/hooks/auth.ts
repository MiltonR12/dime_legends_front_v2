import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SESSION_EXPIRED_EVENT } from "@/lib/axios"
import {
  authLoginApi,
  authLoginGoogleApi,
  authRegisterApi,
  createPageApi,
  updatePageApi,
  validateTokenApi,
} from "@/app/api/auth/authApi"
import type { PCreatePage, PLogin, PRegister, PUpdatePage } from "@/app/api/auth/auth"
import type { User } from "@/app/api/auth/auth.types"
import { queryKeys } from "./queryKeys"

const PRIVATE_PATHS = ["/admin", "/perfil"]

const hasToken = () => !!localStorage.getItem("token")

// GET /validate-token
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async (): Promise<User | null> => {
      try {
        return await validateTokenApi()
      } catch (error) {
        // Solo se cierra la sesión si el servidor rechazó el token, no por una caída de red.
        if (axios.isAxiosError(error) && [401, 403, 404].includes(error.response?.status ?? 0)) {
          localStorage.removeItem("token")
        }
        throw error
      }
    },
    enabled: hasToken(),
    retry: false,
    // Así un cambio de rol o la aprobación como organizador se refleja sin cerrar sesión.
    staleTime: 5 * 60 * 1000,
  })
}

// Cuando el servidor rechaza el token, se limpia el usuario y se vuelve al login.
export function useSessionExpired() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const path = `${location.pathname}${location.search}`

  useEffect(() => {
    const onExpired = () => {
      qc.setQueryData(queryKeys.auth.me, null)
      qc.removeQueries({ predicate: (query) => query.queryKey[0] !== "auth" })
      if (PRIVATE_PATHS.some((prefix) => path.startsWith(prefix))) {
        navigate(`/login?next=${encodeURIComponent(path)}`, { replace: true })
      }
    }
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [qc, navigate, path])
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

// PUT /page: el dueño guarda sin reenviar la solicitud
export function useUpdateUserPage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PUpdatePage) => updatePageApi(data),
    onSuccess: (user) => qc.setQueryData(queryKeys.auth.me, user),
  })
}
