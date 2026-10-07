import { MarkerType, type Edge, type Node } from "@xyflow/react"
import type { BattleSlot, LinkKind, TBattle } from "@/app/api/battle/battle.types"

export const COL_X = 400
export const ROW_H = 170

export type VersusData = {
  battle: TBattle
  /** Huecos que reciben su equipo de otro versus (no se asignan a mano). */
  incoming: Record<BattleSlot, boolean>
  warnings: string[]
}
export type VersusNode = Node<VersusData, "versus">

export const SLOTS: BattleSlot[] = ["teamOne", "teamTwo"]

export const incomingOf = (battles: TBattle[]) => {
  const map = new Map<string, Record<BattleSlot, boolean>>()
  for (const battle of battles) {
    for (const link of [battle.winnerTo, battle.loserTo]) {
      if (!link) continue
      const current = map.get(link.battle) ?? { teamOne: false, teamTwo: false }
      current[link.slot] = true
      map.set(link.battle, current)
    }
  }
  return map
}

export type Warning = { battleId: string; message: string }

export const computeWarnings = (battles: TBattle[]): Warning[] => {
  const incoming = incomingOf(battles)
  const warnings: Warning[] = []
  const entryTeams = new Map<string, string[]>()

  for (const battle of battles) {
    const inc = incoming.get(battle._id) ?? { teamOne: false, teamTwo: false }
    const label = `Versus #${battles.indexOf(battle) + 1}`

    if (battle.teamOne && battle.teamTwo && battle.teamOne._id === battle.teamTwo._id) {
      warnings.push({ battleId: battle._id, message: `${label}: el mismo equipo en los dos lados` })
    }

    if (battles.length > 1 && !battle.winnerTo && !battle.loserTo && !inc.teamOne && !inc.teamTwo) {
      warnings.push({ battleId: battle._id, message: `${label}: no está conectado con ningún versus` })
    }

    for (const slot of SLOTS) {
      const team = battle[slot]
      if (!team && !inc[slot] && !battle.winner) {
        warnings.push({ battleId: battle._id, message: `${label}: falta asignar un equipo` })
        break
      }
    }

    for (const slot of SLOTS) {
      const team = battle[slot]
      if (team && !inc[slot]) {
        entryTeams.set(team._id, [...(entryTeams.get(team._id) ?? []), battle._id])
      }
    }
  }

  for (const [, ids] of entryTeams) {
    const unique = [...new Set(ids)]
    if (ids.length > 1) {
      const first = battles.find((b) => b._id === unique[0])
      const team = first?.teamOne && ids.includes(first._id) ? first.teamOne : first?.teamTwo
      warnings.push({
        battleId: unique[0],
        message: `${team?.name ?? "Un equipo"} está en ${ids.length} huecos de entrada`,
      })
    }
  }

  return warnings
}

export type BattleState = "pending" | "ready" | "done"

export const battleState = (battle: TBattle): BattleState => {
  if (battle.winner) return "done"
  return battle.teamOne && battle.teamTwo ? "ready" : "pending"
}

export const toNodes = (battles: TBattle[]): VersusNode[] => {
  const incoming = incomingOf(battles)
  const warnings = computeWarnings(battles)

  return battles.map((battle) => ({
    id: battle._id,
    type: "versus",
    position: battle.position ?? { x: 0, y: 0 },
    data: {
      battle,
      incoming: incoming.get(battle._id) ?? { teamOne: false, teamTwo: false },
      warnings: warnings.filter((w) => w.battleId === battle._id).map((w) => w.message),
    },
  }))
}

export const EDGE_COLOR: Record<LinkKind, string> = {
  winner: "#22c55e",
  loser: "#ef4444",
}

export const toEdges = (battles: TBattle[]): Edge[] => {
  const edges: Edge[] = []
  const byId = new Map(battles.map((b) => [b._id, b]))

  for (const battle of battles) {
    const links: [LinkKind, TBattle["winnerTo"]][] = [
      ["winner", battle.winnerTo],
      ["loser", battle.loserTo],
    ]
    for (const [kind, link] of links) {
      if (!link || !byId.has(link.battle)) continue
      const color = EDGE_COLOR[kind]
      edges.push({
        id: `${battle._id}:${kind}`,
        source: battle._id,
        sourceHandle: kind,
        target: link.battle,
        targetHandle: link.slot,
        type: "smoothstep",
        animated: kind === "winner" && !!battle.winner,
        label: kind === "winner" ? "Gana" : "Pierde",
        labelStyle: { fill: color, fontSize: 11, fontWeight: 600 },
        labelBgStyle: { fill: "#0c0c14" },
        style: { stroke: color, strokeWidth: 2, strokeDasharray: kind === "loser" ? "6 4" : undefined },
        markerEnd: { type: MarkerType.ArrowClosed, color },
      })
    }
  }
  return edges
}

/** ¿Conectar source -> target crearía un ciclo? */
export const createsCycle = (battles: TBattle[], source: string, target: string) => {
  if (source === target) return true
  const byId = new Map(battles.map((b) => [b._id, b]))
  const stack = [target]
  const seen = new Set<string>()
  while (stack.length) {
    const current = stack.pop()!
    if (current === source) return true
    if (seen.has(current)) continue
    seen.add(current)
    const battle = byId.get(current)
    if (battle?.winnerTo) stack.push(battle.winnerTo.battle)
    if (battle?.loserTo) stack.push(battle.loserTo.battle)
  }
  return false
}

/** Ordena los versus por capas según sus conexiones. */
export const autoLayout = (battles: TBattle[]): { id: string; x: number; y: number }[] => {
  const byId = new Map(battles.map((b) => [b._id, b]))
  const parents = new Map<string, string[]>()
  for (const battle of battles) {
    for (const link of [battle.winnerTo, battle.loserTo]) {
      if (!link || !byId.has(link.battle)) continue
      parents.set(link.battle, [...(parents.get(link.battle) ?? []), battle._id])
    }
  }

  const depth = new Map<string, number>()
  const depthOf = (id: string, trail = new Set<string>()): number => {
    if (depth.has(id)) return depth.get(id)!
    if (trail.has(id)) return 0
    trail.add(id)
    const value = Math.max(-1, ...(parents.get(id) ?? []).map((p) => depthOf(p, trail))) + 1
    depth.set(id, value)
    return value
  }
  battles.forEach((b) => depthOf(b._id))

  const groupRank = (b: TBattle) => (b.group === "B" ? 1 : 0)
  const columns = new Map<number, TBattle[]>()
  for (const battle of battles) {
    const d = depth.get(battle._id) ?? 0
    columns.set(d, [...(columns.get(d) ?? []), battle])
  }

  const y = new Map<string, number>()
  const result: { id: string; x: number; y: number }[] = []

  for (const d of [...columns.keys()].sort((a, b) => a - b)) {
    const column = columns.get(d)!
    const desired = (battle: TBattle, index: number) => {
      const ps = (parents.get(battle._id) ?? []).filter((p) => y.has(p))
      if (ps.length) return ps.reduce((sum, p) => sum + y.get(p)!, 0) / ps.length
      return index * ROW_H + groupRank(battle) * ROW_H * 2
    }
    const ordered = column
      .map((battle, index) => ({ battle, want: desired(battle, index) }))
      .sort(
        (a, b) =>
          groupRank(a.battle) - groupRank(b.battle) ||
          a.want - b.want ||
          a.battle.round - b.battle.round,
      )

    let last = -Infinity
    for (const { battle, want } of ordered) {
      const value = Math.max(want, last + ROW_H)
      y.set(battle._id, value)
      last = value
      result.push({ id: battle._id, x: d * COL_X, y: value })
    }
  }

  return result
}

export const needsLayout = (battles: TBattle[]) =>
  battles.length > 0 &&
  battles.every((b) => !b.winnerTo && !b.loserTo && !b.position?.x && !b.position?.y)
