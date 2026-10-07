import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const TIPS = [
  "Arrastra un versus para moverlo. Se guarda solo.",
  "Une el punto verde (gana) o rojo (pierde) de un versus con un hueco de otro: el equipo avanza solo al marcar el ganador.",
  "Haz clic en un equipo para marcarlo ganador; vuelve a pulsarlo para deshacerlo.",
  "Selecciona una línea y pulsa Supr para quitar la conexión.",
  "Doble clic en un versus para editarlo; clic derecho para duplicar, quitar conexiones o eliminar.",
  "Ctrl+Z deshace y Ctrl+Y rehace.",
]

function BracketHelp({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-md rounded-lg border border-admin-border bg-admin-surface/95 p-4 text-sm text-admin-text shadow-xl backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-medium">Cómo usar el bracket</h4>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onClose}
          aria-label="Cerrar ayuda"
          className="h-6 w-6 text-admin-muted hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-admin-muted">
        {TIPS.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}

export default BracketHelp
