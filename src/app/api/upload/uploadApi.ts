import axios from "@/lib/axios";
import { CustomToast } from "@/lib/handleToast";
import type { ApiResponse } from "../response";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_BYTES = 8 * 1024 * 1024;
const VIDEO_MAX_BYTES = 32 * 1024 * 1024;

export type UploadFolder = "tournament" | "team" | "page" | "voucher" | "broadcast";

/** Sube la imagen por la API y devuelve la URL pública. En broadcast también acepta video. */
export const uploadFile = async (
  file: File,
  folder: UploadFolder,
  options?: { video?: boolean },
) => {
  const video = options?.video === true && VIDEO_TYPES.includes(file.type);
  if (!IMAGE_TYPES.includes(file.type) && !video) {
    CustomToast.error(
      options?.video
        ? "Usa una imagen o un video MP4 o WEBM"
        : "Usa una imagen JPG, PNG, WEBP o GIF",
    );
    throw new Error("Formato no permitido");
  }
  const max = video ? VIDEO_MAX_BYTES : MAX_BYTES;
  if (file.size > max) {
    const message = video ? "El video supera 32 MB" : "La imagen supera 8 MB";
    CustomToast.error(message);
    throw new Error(message);
  }

  const { data } = await axios.post<ApiResponse<{ url: string }>>(
    `/upload?folder=${folder}`,
    file,
    {
      headers: { "Content-Type": file.type },
      timeout: video ? 120000 : 30000,
      transformRequest: [(body) => body],
    },
  );

  return data.data.url;
};

export const uploadImageApi = (file: File) => uploadFile(file, "page");
