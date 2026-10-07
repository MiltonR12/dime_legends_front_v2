import axios from '@/lib/axios'
import type { ApiResponse } from '../response'
import type { PSendContact } from './contact'

export const sendContactApi = async (payload: PSendContact) => {
  await axios.post<ApiResponse>("/email/send", payload)
}
