import type { Side } from "./types"

type Step = { side: Side; action: "ban" | "pick" }
type Rect = { x: number; y: number; w: number; h: number }

const bans = (count: number): Step[] =>
  Array.from({ length: count }, (_, index) => ({
    side: index % 2 === 0 ? "blue" : "red",
    action: "ban",
  }))

/** Mismo orden de torneo que usa la captura del emulador. */
export const TOURNAMENT_STEPS: Step[] = [
  ...bans(6),
  { side: "blue", action: "pick" },
  { side: "red", action: "pick" },
  { side: "red", action: "pick" },
  { side: "blue", action: "pick" },
  { side: "blue", action: "pick" },
  { side: "red", action: "pick" },
  { side: "red", action: "ban" },
  { side: "blue", action: "ban" },
  { side: "red", action: "ban" },
  { side: "blue", action: "ban" },
  { side: "red", action: "pick" },
  { side: "blue", action: "pick" },
  { side: "blue", action: "pick" },
  { side: "red", action: "pick" },
]

export const defaultRects = (steps: Step[]): Rect[] => {
  const counters = { blueban: 0, redban: 0, bluepick: 0, redpick: 0 }
  return steps.map((step) => {
    const key = `${step.side}${step.action}` as keyof typeof counters
    const index = counters[key]
    counters[key] += 1
    const total = steps.filter((item) => item.side === step.side && item.action === step.action).length
    if (step.action === "ban") {
      const width = 0.04
      const gap = 0.008
      const row = total * width + Math.max(0, total - 1) * gap
      const x0 = step.side === "blue" ? 0.16 : 0.84 - row
      return { x: x0 + index * (width + gap), y: 0.06, w: width, h: 0.07 }
    }
    const width = 0.075
    const height = 0.14
    const gap = 0.008
    const row = total * width + Math.max(0, total - 1) * gap
    const x0 = step.side === "blue" ? 0.03 : 0.97 - row
    return { x: x0 + index * (width + gap), y: 0.72, w: width, h: height }
  })
}

export const guessesToSlots = (slugs: (string | null)[]) => {
  const bans = { blue: [null, null, null, null, null] as (string | null)[], red: [null, null, null, null, null] as (string | null)[] }
  const picks = { blue: [] as (string | null)[], red: [] as (string | null)[] }
  const seen = new Set<string>()
  TOURNAMENT_STEPS.forEach((step, index) => {
    const slug = slugs[index] ?? null
    const unique = slug && !seen.has(slug) ? slug : null
    if (unique) seen.add(unique)
    if (step.action === "ban") {
      const cursor = bans[step.side].findIndex((item) => item == null)
      if (cursor >= 0) bans[step.side][cursor] = unique
    } else {
      picks[step.side].push(unique)
    }
  })
  return { bans, picks }
}
