import axios from "@/lib/axios"
import type { ApiResponse } from "../response"

export type AccountUser = {
  _id: string
  firstName: string
  lastName: string
  email: string
  status: boolean
  role: { name: string } | null
  page: { name?: string; review?: "pending" | "approved" | "rejected"; status?: boolean } | null
}

export const listUsersApi = async () => {
  const { data } = await axios.get<ApiResponse<AccountUser[]>>("/user")
  return data.data
}

export const updateUserRoleApi = async (id: string, role: "User" | "Creator") => {
  const { data } = await axios.patch<ApiResponse<AccountUser>>(`/user/${id}/role`, { role })
  return data.data
}

export const updateUserStatusApi = async (id: string, status: boolean) => {
  await axios.patch<ApiResponse>(`/user/${id}/status`, { status })
}

export const approveOrganizerApi = async (id: string) => {
  await axios.post<ApiResponse>(`/user/${id}/approve`)
}

export const rejectOrganizerApi = async (id: string) => {
  await axios.post<ApiResponse>(`/user/${id}/reject`)
}
