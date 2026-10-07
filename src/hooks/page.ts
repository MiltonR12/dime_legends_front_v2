import { useMutation } from "@tanstack/react-query"
import { addNetworkPageApi, createPageApi } from "@/app/api/page/pageApi"

// POST /page (JSON). La solicitud de organizador con imagen está en `useCreateUserPage` (hooks/auth).
export function useCreatePage() {
  return useMutation({
    mutationFn: (data: unknown) => createPageApi(data),
  })
}

// POST /page/add-network
export function useAddPageNetwork() {
  return useMutation({
    mutationFn: (url: string) => addNetworkPageApi(url),
  })
}
