import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { AlertTriangle, Calendar } from "lucide-react";
import { useSetBattleWinner } from "@/hooks/battle";
import { formatDate } from "@/lib/date";
import { CustomToast } from "@/lib/handleToast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BattleSlot } from "@/app/api/battle/battle.types";
import { useBracketContext } from "./BracketContext";
import {
  battleState,
  EDGE_COLOR,
  SLOTS,
  type VersusNode as VersusNodeType,
} from "./bracketGraph";
import TeamRow from "./TeamRow";

const STATE_STYLE = {
  pending: { label: "Por definir", className: "bg-white/5 text-admin-muted" },
  ready: { label: "Listo", className: "bg-amber-500/15 text-amber-300" },
  done: { label: "Terminado", className: "bg-green-500/15 text-green-400" },
} as const;

const ROW = 52;
const HEADER = 29;
const rowCenter = (index: number) => HEADER + index * (ROW + 1) + ROW / 2;

const handleBase = "!h-3.5 !w-3.5 !border-2 !border-admin-bg";

function VersusNode({ data, selected }: NodeProps<VersusNodeType>) {
  const { battle, incoming, warnings } = data;
  const { readOnly, selectedTeam, assignTeam, editBattle } =
    useBracketContext();
  const { mutate: setWinner, isPending } = useSetBattleWinner();

  const state = STATE_STYLE[battleState(battle)];
  const when = battle.date ? new Date(battle.date) : null;
  const day = formatDate(when, "short", "day");
  const time = formatDate(when, "short", "time");

  const toggle = (slot: BattleSlot) => {
    const team = battle[slot];
    if (!team) return;
    const isWinner = battle.winner === team._id;
    setWinner(
      { id: battle._id, winner: isWinner ? null : team._id },
      {
        onSuccess: () =>
          CustomToast.success(
            isWinner
              ? "Se quitó el ganador"
              : `Ganador: ${team.name}. Pulsa de nuevo para deshacerlo.`,
          ),
      },
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={`w-72 cursor-default select-none overflow-hidden rounded-lg border bg-admin-surface shadow-lg ${
          selected
            ? "border-admin-accent ring-2 ring-admin-accent/40"
            : battle.winner
              ? "border-green-500/40"
              : "border-admin-border"
        }`}
        onDoubleClick={() => !readOnly && editBattle(battle)}
      >
        {SLOTS.map((slot, index) => (
          <Handle
            key={slot}
            id={slot}
            type="target"
            position={Position.Left}
            isConnectable={!readOnly && !incoming[slot]}
            style={{ top: rowCenter(index) }}
            className={`${handleBase} !bg-admin-muted ${readOnly ? "!opacity-0" : ""}`}
            title={
              slot === "teamOne" ? "Entrada: equipo 1" : "Entrada: equipo 2"
            }
          />
        ))}
        {(["winner", "loser"] as const).map((kind, index) => (
          <Handle
            key={kind}
            id={kind}
            type="source"
            position={Position.Right}
            isConnectable={!readOnly}
            style={{ top: rowCenter(index), background: EDGE_COLOR[kind] }}
            className={`${handleBase} ${readOnly ? "!opacity-0" : ""}`}
            title={
              kind === "winner"
                ? "Salida: el ganador avanza"
                : "Salida: el perdedor pasa"
            }
          />
        ))}

        <div className="flex h-[29px] items-center justify-between gap-2 border-b border-admin-border bg-black/20 px-3 text-xs text-admin-muted">
          <span className="flex items-center gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${state.className}`}
            >
              {state.label}
            </span>
            {!readOnly && warnings.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertTriangle
                    className="h-3.5 w-3.5 text-amber-400"
                    aria-label="Hay advertencias"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <ul className="space-y-1">
                    {warnings.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            )}
          </span>
          {when ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  <span className="capitalize">{day}</span>
                  <span>·</span>
                  <span>{time}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent className="capitalize">
                {formatDate(when, "large")}
              </TooltipContent>
            </Tooltip>
          ) : (
            <span>Sin fecha</span>
          )}
        </div>

        {SLOTS.map((slot, index) => {
          const other = battle[slot === "teamOne" ? "teamTwo" : "teamOne"];
          const team = battle[slot];
          return (
            <div key={slot}>
              {index === 1 && <div className="h-px bg-admin-border" />}
              <TeamRow
                team={team}
                isWinner={!!team && battle.winner === team._id}
                isLoser={
                  !!battle.winner && !!other && battle.winner === other._id
                }
                locked={incoming[slot]}
                readOnly={readOnly}
                busy={isPending}
                canAssign={
                  !readOnly && !!selectedTeam && !team && !incoming[slot]
                }
                onToggleWinner={() => toggle(slot)}
                onAssign={() =>
                  selectedTeam && assignTeam(battle._id, slot, selectedTeam)
                }
                onDropTeam={(teamId) => assignTeam(battle._id, slot, teamId)}
              />
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export default memo(VersusNode);
