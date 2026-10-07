import { useMemo, useState } from "react"
import { ChevronDown, ChevronUp, GripVertical, Users } from "lucide-react"
import type { TBattle } from "@/app/api/battle/battle.types"
import type { Team } from "@/app/api/team/team.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TEAM_DRAG_TYPE } from "./TeamRow"

type Props = {
  teams: Team[]
  battles: TBattle[]
  selected: string | null
  onSelect: (teamId: string | null) => void
}

function TeamPalette({ teams, battles, selected, onSelect }: Props) {
  const [open, setOpen] = useState(true)

  const rows = useMemo(() => {
    const usage = new Map<string, number>()
    for (const battle of battles) {
      for (const team of [battle.teamOne, battle.teamTwo]) {
        if (team) usage.set(team._id, (usage.get(team._id) ?? 0) + 1)
      }
    }
    return teams
      .filter((team) => team.status !== "inactive")
      .map((team) => ({ team, count: usage.get(team._id) ?? 0 }))
      .sort((a, b) => a.count - b.count || a.team.name.localeCompare(b.team.name))
  }, [teams, battles])

  const free = rows.filter((row) => row.count === 0).length

  return (
    <div className="w-60 overflow-hidden rounded-lg border border-admin-border bg-admin-surface/95 text-admin-text shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-admin-accent"
      >
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-admin-muted" /> Equipos
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-admin-muted">{free} sin asignar</span>
        </span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {open && (
        <div className="max-h-72 overflow-y-auto border-t border-admin-border">
          <p className="px-3 py-2 text-xs text-admin-muted">
            Arrastra un equipo a un hueco, o haz clic para elegirlo y luego clic en el hueco.
          </p>
          <ul>
            {rows.map(({ team, count }) => {
              const active = selected === team._id
              return (
                <li key={team._id}>
                  <button
                    type="button"
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData(TEAM_DRAG_TYPE, team._id)
                      event.dataTransfer.effectAllowed = "copy"
                    }}
                    onClick={() => onSelect(active ? null : team._id)}
                    aria-pressed={active}
                    className={`flex w-full cursor-grab items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-admin-accent ${
                      active ? "bg-admin-accent/20" : ""
                    }`}
                  >
                    <GripVertical className="h-3.5 w-3.5 shrink-0 text-admin-muted" />
                    <Avatar className="h-6 w-6 shrink-0 border border-admin-border">
                      <AvatarImage src={team.image || undefined} alt="" />
                      <AvatarFallback className="bg-admin-row text-[10px] text-white">
                        {team.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 flex-1 truncate">{team.name}</span>
                    <span className={`shrink-0 text-xs ${count === 0 ? "text-amber-300" : "text-admin-muted"}`}>
                      {count === 0 ? "libre" : `en ${count}`}
                    </span>
                  </button>
                </li>
              )
            })}
            {rows.length === 0 && <li className="px-3 py-3 text-sm text-admin-muted">Aún no hay equipos activos.</li>}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TeamPalette
