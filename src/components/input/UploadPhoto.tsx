"use client"

import type React from "react"

import { ErrorMessage, useField } from "formik"
import { useDropzone } from "react-dropzone"
import { ImageIcon, Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Props = {
  name: string
  plain?: boolean
}

function UploadPhoto({ name, plain = false }: Props) {
  
  const [, meta, helpers] = useField(name)
  const { setValue } = helpers
  const { value } = meta
  const [isDragActive, setIsDragActive] = useState(false)

  const { getInputProps, getRootProps, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted: (files) => {
      setValue(files[0])
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDrop: () => setIsDragActive(false),
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setValue(null)
  }

  const getDropzoneStyles = () => {
    if (isDragReject) return "border-red-500/50 bg-red-950/20"
    if (isDragAccept || isDragActive) return plain ? "border-admin-accent bg-admin-row" : "border-purple-400 bg-purple-950/30 scale-[1.02]"
    if (value) return plain ? "border-admin-border bg-admin-input" : "border-purple-600/50 bg-purple-950/20"
    return plain
      ? "border-admin-border bg-admin-input hover:border-admin-accent"
      : "border-purple-700/50 bg-purple-950/10 hover:border-purple-500/70 hover:bg-purple-950/20"
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`
          relative cursor-pointer transition-all duration-300 ease-in-out
          border border-dashed rounded-lg p-4
          ${getDropzoneStyles()}
        `}
      >
        <input {...getInputProps()} />

        {value ? (
          // Image Preview State
          <div className="relative group">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-purple-900/30">
              <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(value) || "/placeholder.svg"}
                alt="Vista previa"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="text-white text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Cambiar imagen</p>
                </div>
              </div>
            </div>

            {/* Remove button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-8 h-8 p-0 rounded-full border-red-500/50 bg-red-950/80 hover:bg-red-900/80 text-red-400 hover:text-red-300 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* File info */}
            <div className={cn("mt-4 rounded-lg border p-3", plain ? "border-admin-border bg-admin-input" : "border-purple-800/30 bg-purple-900/30")}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{value.name}</p>
                  <p className={cn("text-xs", plain ? "text-admin-muted" : "text-purple-300")}>{(value.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          </div>
        ) : plain ? (
          <div className="flex items-center gap-3 py-2 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-admin-border bg-admin-bg">
              <ImageIcon className="h-4 w-4 text-admin-muted" />
            </div>
            <div>
              <p className="text-sm text-admin-text">{isDragActive ? "Suelta la imagen" : "Sube una imagen"}</p>
              <p className="text-xs text-admin-muted">PNG, JPG o WEBP · máx. 5 MB</p>
            </div>
          </div>
        ) : (
          // Upload State
          <div className="text-center py-8">
            <div className="relative mb-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ImageIcon className="h-10 w-10 text-purple-400" />
              </div>

              {/* Animated upload icon when dragging */}
              {(isDragActive || isDragAccept) && (
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center animate-pulse">
                  <Upload className="h-8 w-8 text-purple-300" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold text-lg">
                {isDragActive ? "¡Suelta la imagen aquí!" : "Sube una imagen"}
              </h3>

              <p className="text-purple-300 text-sm">
                {isDragActive
                  ? "Suelta el archivo para subirlo"
                  : "Arrastra y suelta una imagen o haz clic para seleccionar"}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <span className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-md border border-purple-700/30">
                  PNG
                </span>
                <span className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-md border border-purple-700/30">
                  JPG
                </span>
                <span className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-md border border-purple-700/30">
                  WEBP
                </span>
                <span className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-md border border-purple-700/30">
                  Max 5MB
                </span>
              </div>
            </div>

            {/* Error state */}
            {isDragReject && (
              <div className="mt-4 p-3 bg-red-950/30 border border-red-800/50 rounded-lg">
                <p className="text-red-400 text-sm">
                  Archivo no válido. Solo se permiten imágenes PNG, JPG o WEBP menores a 5MB.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="flex items-center gap-2 p-3 bg-red-950/30 border border-red-800/50 rounded-lg">
            <X className="h-4 w-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{msg}</p>
          </div>
        )}
      </ErrorMessage>
    </div>
  )
}

export default UploadPhoto
