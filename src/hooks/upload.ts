import { useMutation } from "@tanstack/react-query"
import { uploadImageApi } from "@/app/api/upload/uploadApi"

// POST /upload-image
export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => uploadImageApi(file),
  })
}
