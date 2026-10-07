import axios from '@/lib/axios'
import type { ApiResponse } from '../response'

export const uploadImageApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post<ApiResponse<{ url: string }>>("/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}
