import OBSWebSocket from "obs-websocket-js"

let client: OBSWebSocket | null = null

function sceneName(scene: unknown): string | null {
  if (typeof scene !== "object" || scene === null || !("sceneName" in scene)) return null
  return typeof scene.sceneName === "string" ? scene.sceneName : null
}

export async function connectObs(url: string, password: string): Promise<void> {
  if (client) {
    try {
      await client.disconnect()
    } catch {
      /* la conexión anterior ya estaba cerrada */
    }
  }
  const next = new OBSWebSocket()
  await next.connect(url, password)
  client = next
}

export function obsConnected() {
  return client != null
}

export async function listSources(): Promise<string[]> {
  if (!client) return []
  const [inputs, scenes] = await Promise.all([client.call("GetInputList"), client.call("GetSceneList")])
  const names = new Set<string>()
  for (const input of inputs.inputs) {
    if (typeof input.inputName === "string") names.add(input.inputName)
  }
  for (const scene of scenes.scenes) {
    const name = sceneName(scene)
    if (name) names.add(name)
  }
  return [...names]
}

export async function listScenes(): Promise<string[]> {
  if (!client) return []
  const result = await client.call("GetSceneList")
  return result.scenes.flatMap((scene) => {
    const name = sceneName(scene)
    return name ? [name] : []
  })
}

export async function captureSource(sourceName: string): Promise<string> {
  if (!client) throw new Error("OBS no está conectado.")
  const result = await client.call("GetSourceScreenshot", {
    sourceName,
    imageFormat: "jpg",
    imageWidth: 1600,
    imageHeight: 900,
    imageCompressionQuality: 85,
  })
  return result.imageData
}

export async function switchScene(sceneName: string): Promise<void> {
  if (!client) throw new Error("OBS no está conectado.")
  await client.call("SetCurrentProgramScene", { sceneName })
}
