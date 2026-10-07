import axios from "@/lib/axios";
import { CustomToast } from "@/lib/handleToast";
import type { ApiResponse } from "../response";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024;

export type UploadFolder = "tournament" | "team" | "page" | "voucher";

/** Sube la imagen por la API y devuelve la URL pública. */
export const uploadFile = async (file: File, folder: UploadFolder) => {
  if (!IMAGE_TYPES.includes(file.type)) {
    CustomToast.error("Usa una imagen JPG, PNG, WEBP o GIF");
    throw new Error("Formato no permitido");
  }
  if (file.size > MAX_BYTES) {
    CustomToast.error("La imagen supera 8 MB");
    throw new Error("La imagen supera 8 MB");
  }

  const { data } = await axios.post<ApiResponse<{ url: string }>>(
    `/upload?folder=${folder}`,
    file,
    {
      headers: { "Content-Type": file.type },
      timeout: 30000,
      transformRequest: [(body) => body],
    },
  );

  return data.data.url;
};

export const uploadImageApi = (file: File) => uploadFile(file, "page");
