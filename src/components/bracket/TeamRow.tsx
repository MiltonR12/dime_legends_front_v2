import { useState, type DragEvent } from "react"
import { Crown, Link2, Plus, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Team } from "@/app/api/team/team.types"

export const TEAM_DRAG_TYPE = "application/x-bracket-team"

const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

type Props = {
  team: Team | null
  isWinner: boolean
  /** El otro equipo ya ganó. */
  isLoser: boolean
  /** El equipo llega desde otro versus (no se asigna a mano). */
  locked: boolean
  readOnly: boolean
  busy: boolean
  /** Hay un equipo elegido en el panel y este hueco está libre. */
  canAssign: boolean
  onToggleWinner: () => void
  onAssign: () => void
  onDropTeam: (teamId: string) => void
}

function TeamRow({
  team,
  isWinner,
  isLoser,
  locked,
  readOnly,
  busy,
  canAssign,
  onToggleWinner,
  onAssign,
  onDropTeam,
}: Props) {
  const [dragOver, setDragOver] = useState(false)
  const droppable = !readOnly && !locked
  const label = isWinner ? "Quitar ganador" : "Marcar ganador"

  const handleDragOver = (event: DragEvent) => {
    if (!droppable || !event.dataTransfer.types.includes(TEAM_DRAG_TYPE)) return
    event.preventDefault()
    setDragOver(true)
  }

  const handleDrop = (event: DragEvent) => {
    setDragOver(false)
    const teamId = event.dataTransfer.getData(TEAM_DRAG_TYPE)
    if (droppable && teamId) {
      event.preventDefault()
      onDropTeam(teamId)
    }
  }

  // Hueco vacío: se puede rellenar con un equipo del panel.
  if (!team) {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`nodrag nopan flex h-[52px] items-center gap-3 px-3 ${
          dragOver ? "bg-admin-accent/20 ring-2 ring-inset ring-admin-accent" : ""
        }`}
      >
        {canAssign ? (
          <button
            type="button"
            onClick={onAssign}
            className="flex w-full items-center gap-2 rounded-md border border-dashed border-admin-accent px-2 py-1.5 text-sm text-admin-accent hover:bg-admin-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-admin-accent"
          >
            <Plus className="h-4 w-4" /> Poner aquí el equipo elegido
          </button>
        ) : (
          <>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-admin-border">
              {locked ? <Link2 className="h-3.5 w-3.5 text-admin-muted" /> : <Users className="h-3.5 w-3.5 text-admin-muted" />}
            </span>
            <span className="truncate text-sm italic text-admin-muted">
              {locked ? "Espera el resultado anterior" : readOnly ? "Por definir" : "Arrastra un equipo aquí"}
            </span>
          </>
        )}
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={dragOver ? "ring-2 ring-inset ring-admin-accent" : ""}
    >
      <button
        type="button"
        onClick={onToggleWinner}
        disabled={readOnly || busy}
        aria-pressed={isWinner}
        aria-label={`${label}: ${team.name}`}
        title={readOnly ? team.name : label}
        className={`nodrag nopan group flex h-[52px] w-full items-center gap-3 px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-admin-accent disabled:cursor-default ${
          isWinner ? "bg-green-500/15" : readOnly ? "" : "hover:bg-white/5"
        } ${isLoser ? "opacity-45" : ""}`}
      >
        <Avatar className="h-8 w-8 shrink-0 border border-admin-border">
          <AvatarImage src={team.image || undefined} alt="" />
          <AvatarFallback className="bg-admin-row text-xs text-white">{initials(team.name)}</AvatarFallback>
        </Avatar>

        <span
          className={`min-w-0 flex-1 truncate text-sm font-medium text-admin-text ${
            isLoser ? "line-through decoration-admin-muted/60" : ""
          }`}
        >
          {team.name}
        </span>

        {locked && <Link2 className="h-3.5 w-3.5 shrink-0 text-admin-muted" aria-label="Llega de otro versus" />}

        {isWinner ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
            <Crown className="h-3 w-3" /> Ganador
          </span>
        ) : !readOnly ? (
          <span className="shrink-0 rounded-full border border-admin-border px-2 py-0.5 text-xs text-admin-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Ganó
          </span>
        ) : null}
      </button>
    </div>
  )
}

export default TeamRow
