import { useField } from "formik"
import { ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export const BANNER_FILE_TOKEN = "__file__"
export const MAX_BANNERS = 8

const ACCEPT = ["image/png", "image/jpeg", "image/webp"]
const MAX_BYTES = 5 * 1024 * 1024

export type BannerSlot =
  | { id: string; kind: "saved"; url: string }
  | { id: string; kind: "new"; file: File }

export function savedBannerSlots(tournament: { image?: string | null; banners?: string[] | null }): BannerSlot[] {
  const urls = tournament.banners?.length
    ? tournament.banners
    : tournament.image
      ? [tournament.image]
      : []
  return urls.map((url, index) => ({ id: `saved-${index}-${url}`, kind: "saved", url }))
}

export function bannerUrls(tournament: { image?: string | null; banners?: string[] | null }) {
  if (tournament.banners?.length) return tournament.banners
  return tournament.image ? [tournament.image] : []
}

type Props = {
  name?: string
  disabled?: boolean
}

function SlotImage({ slot }: { slot: BannerSlot }) {
  const [src, setSrc] = useState(slot.kind === "saved" ? slot.url : "")

  useEffect(() => {
    if (slot.kind === "saved") {
      setSrc(slot.url)
      return
    }
    const url = URL.createObjectURL(slot.file)
    setSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [slot])

  return <img src={src || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
}

function BannerGallery({ name = "bannerSlots", disabled = false }: Props) {
  const [field, meta, helpers] = useField<BannerSlot[]>(name)
  const inputRef = useRef<HTMLInputElement>(null)
  const [notice, setNotice] = useState("")
  const slots = field.value ?? []

  const update = (next: BannerSlot[]) => {
    helpers.setValue(next)
    helpers.setTouched(true, false)
  }

  const addFiles = (list: FileList | null) => {
    if (!list || disabled) return
    const room = MAX_BANNERS - slots.length
    const accepted: BannerSlot[] = []
    let rejected = false
    for (const file of Array.from(list)) {
      if (accepted.length >= room) break
      if (!ACCEPT.includes(file.type) || file.size > MAX_BYTES) {
        rejected = true
        continue
      }
      accepted.push({
        id: `new-${file.name}-${file.lastModified}-${file.size}-${accepted.length}`,
        kind: "new",
        file,
      })
    }
    if (accepted.length) update([...slots, ...accepted])
    setNotice(rejected ? "Solo PNG, JPG o WEBP de hasta 5 MB." : "")
    if (inputRef.current) inputRef.current.value = ""
  }

  const move = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= slots.length) return
    const next = [...slots]
    const [item] = next.splice(index, 1)
    next.splice(nextIndex, 0, item)
    update(next)
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-admin-text">Banner</p>
        <p className="text-sm text-admin-muted">
          La primera imagen es la portada. Puedes subir hasta {MAX_BANNERS}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slots.map((slot, index) => (
          <div key={slot.id} className="overflow-hidden rounded-lg border border-admin-border bg-admin-input">
            <div className="relative aspect-video">
              <SlotImage slot={slot} />
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded bg-admin-accent px-2 py-0.5 text-xs text-white">
                  Portada
                </span>
              )}
            </div>
            {!disabled && (
              <div className="flex items-center justify-between gap-1 p-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Mover a la izquierda"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  className="h-8 w-8 text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Quitar imagen"
                  onClick={() => update(slots.filter((item) => item.id !== slot.id))}
                  className="h-8 w-8 text-red-300 hover:bg-red-950/40 hover:text-red-200"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Mover a la derecha"
                  disabled={index === slots.length - 1}
                  onClick={() => move(index, 1)}
                  className="h-8 w-8 text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}

        {!disabled && slots.length < MAX_BANNERS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-admin-border bg-admin-input text-admin-muted hover:border-admin-accent hover:text-admin-text"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="text-sm">Añadir imagen</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="sr-only"
        onChange={(event) => addFiles(event.target.files)}
      />

      {notice && <p className="text-sm text-red-400">{notice}</p>}
      {meta.touched && typeof meta.error === "string" && (
        <p className="text-sm text-red-400">{meta.error}</p>
      )}
    </div>
  )
}

export default BannerGallery
