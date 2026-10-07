import { useMutation } from "@tanstack/react-query"
import { sendContactApi } from "@/app/api/contact/contactApi"
import type { PSendContact } from "@/app/api/contact/contact"

// POST /email/send
export function useSendContact() {
  return useMutation({
    mutationFn: (data: PSendContact) => sendContactApi(data),
  })
}
