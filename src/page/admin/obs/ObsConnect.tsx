import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { HeroCard, OverlayId } from "@/broadcast/types"
import { TOURNAMENT_STEPS, defaultRects, guessesToSlots } from "@/broadcast/steps"
import { captureSource, connectObs, listScenes, listSources, switchScene } from "@/ia/obs"
import { rankSlots } from "@/ia/detect"

const LABELS: { id: OverlayId; label: string }[] = [
  { id: "presentacion", label: "Presentación" },
  { id: "draft", label: "Draft" },
  { id: "marcador", label: "Marcador" },
  { id: "resultado", label: "Resultado" },
]

const SCENE_KEY = "dime-obs-scenes"

function readScenes(): Record<OverlayId, string> {
  try {
    const parsed = JSON.parse(localStorage.getItem(SCENE_KEY) ?? "") as Partial<Record<OverlayId, string>>
    return {
      presentacion: parsed.presentacion ?? "",
      draft: parsed.draft ?? "",
      marcador: parsed.marcador ?? "",
      resultado: parsed.resultado ?? "",
    }
  } catch {
    return { presentacion: "", draft: "", marcador: "", resultado: "" }
  }
}

function ObsConnect({
  heroes,
  onApply,
}: {
  heroes: HeroCard[]
  onApply: (slots: ReturnType<typeof guessesToSlots>) => void
}) {
  const [url, setUrl] = useState("ws://127.0.0.1:4455")
  const [password, setPassword] = useState("")
  const [connected, setConnected] = useState(false)
  const [scenes, setScenes] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [source, setSource] = useState("")
  const [sceneMap, setSceneMap] = useState(readScenes)
  const [note, setNote] = useState("")
  const [error, setError] = useState("")

  async function connect() {
    setError("")
    try {
      await connectObs(url, password)
      const [nextScenes, nextSources] = await Promise.all([listScenes(), listSources()])
      setScenes(nextScenes)
      setSources(nextSources)
      setSource(nextSources[0] ?? "")
      setConnected(true)
      setNote("OBS conectado en esta computadora.")
    } catch {
      setConnected(false)
      setError("No se pudo conectar. Revisa que el WebSocket de OBS esté activo.")
    }
  }

  function remember(id: OverlayId, scene: string) {
    const next = { ...sceneMap, [id]: scene }
    setSceneMap(next)
    localStorage.setItem(SCENE_KEY, JSON.stringify(next))
  }

  async function show(id: OverlayId) {
    const scene = sceneMap[id]
    if (!scene) return
    setError("")
    try {
      await switchScene(scene)
      setNote(`Escena ${scene}`)
    } catch {
      setError("No se pudo cambiar la escena.")
    }
  }

  async function detect() {
    if (!source) return
    setError("")
    setNote("Leyendo la captura…")
    try {
      const data = await captureSource(source)
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const node = new Image()
        node.onload = () => resolve(node)
        node.onerror = () => reject(new Error("captura"))
        node.src = data
      })
      const guesses = await rankSlots(image, defaultRects(TOURNAMENT_STEPS), heroes)
      onApply(guessesToSlots(guesses.map((options) => options[0]?.slug ?? null)))
      setNote("Héroes aplicados desde la captura.")
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "No se pudo detectar el draft.")
    }
  }

  const field = "h-10 rounded-md border-admin-border bg-admin-input text-sm text-admin-text"

  return (
    <section className="space-y-4 border-t border-admin-border pt-6">
      <h2 className="text-sm font-medium text-admin-text">OBS en esta computadora</h2>
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-56 flex-1 text-xs text-admin-muted">
          WebSocket
          <Input value={url} onChange={(event) => setUrl(event.target.value)} className={`mt-1 ${field}`} />
        </label>
        <label className="min-w-40 text-xs text-admin-muted">
          Contraseña
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`mt-1 ${field}`}
          />
        </label>
        <Button type="button" onClick={connect} className="bg-admin-accent text-white hover:bg-admin-accent-hover">
          {connected ? "Reconectar" : "Conectar"}
        </Button>
      </div>
      {connected && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {LABELS.map((item) => (
              <label key={item.id} className="text-xs text-admin-muted">
                {item.label}
                <div className="mt-1 flex gap-2">
                  <select
                    value={sceneMap[item.id]}
                    onChange={(event) => remember(item.id, event.target.value)}
                    className={`h-10 flex-1 rounded-md border px-2 ${field}`}
                  >
                    <option value="">Escena</option>
                    {scenes.map((scene) => (
                      <option key={scene} value={scene}>
                        {scene}
                      </option>
                    ))}
                  </select>
                  <Button type="button" variant="outline" onClick={() => show(item.id)} className="border-admin-border">
                    Mostrar
                  </Button>
                </div>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="min-w-56 text-xs text-admin-muted">
              Fuente del emulador
              <select
                value={source}
                onChange={(event) => setSource(event.target.value)}
                className={`mt-1 h-10 w-full rounded-md border px-2 ${field}`}
              >
                {sources.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <Button type="button" variant="outline" onClick={detect} className="border-admin-border">
              Detectar héroes
            </Button>
          </div>
        </div>
      )}
      {note && <p className="text-sm text-admin-muted">{note}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </section>
  )
}

export default ObsConnect
