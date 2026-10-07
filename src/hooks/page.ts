import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addNetworkPageApi, createPageApi } from "@/app/api/page/pageApi"
import type { User } from "@/app/api/auth/auth.types"
import { queryKeys } from "./queryKeys"

// POST /page (JSON). La solicitud de organizador con imagen está en `useCreateUserPage` (hooks/auth).
export function useCreatePage() {
  return useMutation({
    mutationFn: (data: unknown) => createPageApi(data),
  })
}

// POST /page/add-network
export function useAddPageNetwork() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (url: string) => addNetworkPageApi(url),
    onSuccess: (page) => {
      qc.setQueryData<User | null>(queryKeys.auth.me, (current) => {
        if (!current?.page) return current
        return { ...current, page: { ...current.page, socialLinks: page.socialLinks } }
      })
    },
  })
}
