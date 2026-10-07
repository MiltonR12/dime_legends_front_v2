import axios from '@/lib/axios';
import type { ApiResponse } from '../response';

export const createPageApi = async (payload: unknown) => {
  const { data } = await axios.post<ApiResponse<unknown>>('/page', payload);
  return data.data;
}

export type PageSocial = { platform: string; url: string };

export const addNetworkPageApi = async (url: string) => {
  const { data } = await axios.post<ApiResponse<{ socialLinks: PageSocial[] }>>("/page/add-network", { url });
  return data.data;
}
