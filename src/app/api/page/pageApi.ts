import axios from '@/lib/axios';
import type { ApiResponse } from '../response';

export const createPageApi = async (payload: unknown) => {
  const { data } = await axios.post<ApiResponse<unknown>>('/page', payload);
  return data.data;
}

export type PageSocial = { platform: string; url: string };

export type PublicPage = {
  _id: string
  name: string
  description: string | null
  image: string | null
  banner: string | null
  socialLinks: PageSocial[]
  tournaments: {
    _id: string
    name: string
    dateStart: string
    game: string
    phase?: "inscription" | "running" | "finished"
    image: string | null
  }[]
}

export type OrganizerSummary = {
  _id: string
  name: string
  description: string | null
  image: string | null
  banner: string | null
  tournaments: number
}

export const listOrganizersApi = async () => {
  const { data } = await axios.get<ApiResponse<OrganizerSummary[]>>("/page")
  return data.data
}

export const getPublicPageApi = async (id: string) => {
  const { data } = await axios.get<ApiResponse<PublicPage>>(`/page/${id}`)
  return data.data
}

export const addNetworkPageApi = async (url: string) => {
  const { data } = await axios.post<ApiResponse<{ socialLinks: PageSocial[] }>>("/page/add-network", { url });
  return data.data;
}
