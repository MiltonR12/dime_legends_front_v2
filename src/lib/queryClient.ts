import { QueryClient } from "@tanstack/react-query"

// Los toasts de error se muestran en el interceptor de `src/lib/axios.ts`,
// por eso aquí no se duplican.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
