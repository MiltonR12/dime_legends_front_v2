import type { DeskState } from "@/broadcast/types";
import { Shell } from "./frame";

export function MarcadorScreen({ state }: { state: DeskState }) {
  const needed = Math.ceil(state.series.bestOf / 2);
  return (
    <Shell state={state}>
      <div className="flex h-full items-end px-10 pb-8">
        <div className="flex w-full items-center justify-between bg-black/70 px-8 py-4">
          {(["blue", "red"] as const).map((side) => {
            const team = state.teams[side];
            const score = state.series.score[side];
            return (
              <div
                key={side}
                className={`flex items-center gap-4 ${side === "red" ? "flex-row-reverse" : ""}`}
              >
                <span className="text-4xl font-medium">
                  {team.tag || team.name}
                </span>
                <span
                  className="text-5xl font-medium tabular-nums"
                  style={{ color: team.color }}
                >
                  {state.game.kills[side]}
                </span>
                <span className="flex gap-1">
                  {Array.from({ length: needed }, (_, index) => (
                    <span
                      key={index}
                      className="h-3 w-3 rounded-full"
                      style={{
                        background: index < score ? team.color : "transparent",
                        outline: `1px solid ${team.color}`,
                      }}
                    />
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
