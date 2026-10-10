import { LANE_LABEL, type DeskState, type HeroCard } from "@/broadcast/types";
import { heroOf, Shell, SponsorRow } from "./frame";

export function ResultadoScreen({
  state,
  heroes,
}: {
  state: DeskState;
  heroes: Map<string, HeroCard>;
}) {
  const winner = state.result.winner ? state.teams[state.result.winner] : null;
  const minutes = Math.floor(state.result.durationSec / 60);
  const seconds = String(state.result.durationSec % 60).padStart(2, "0");
  return (
    <Shell state={state} backdrop>
      <div className="flex h-full flex-col px-16 py-12">
        <div className="text-2xl opacity-70">{state.tournament.name}</div>
        <h1 className="mt-2 text-6xl font-medium">
          {winner ? `${winner.name} gana` : "Partida"}
        </h1>
        <div
          className="mt-2 text-3xl tabular-nums"
          style={{ color: state.theme.accent }}
        >
          {minutes}:{seconds}
        </div>
        <div className="mt-10 grid flex-1 grid-cols-2 gap-12">
          {(["blue", "red"] as const).map((side) => (
            <table key={side} className="w-full text-left text-2xl">
              <thead className="text-lg opacity-70">
                <tr>
                  <th className="py-1 font-medium">Jugador</th>
                  <th className="font-medium">Héroe</th>
                  <th className="w-12 text-right font-medium">K</th>
                  <th className="w-12 text-right font-medium">D</th>
                  <th className="w-12 text-right font-medium">A</th>
                </tr>
              </thead>
              <tbody>
                {state.teams[side].players.map((player) => {
                  const hero = heroOf(heroes, player.heroSlug);
                  const row = (state.result.kda ?? []).find(
                    (item) => item.playerId === player.id,
                  );
                  return (
                    <tr key={player.id}>
                      <td className="py-2">
                        {player.nick || LANE_LABEL[player.lane]}
                      </td>
                      <td>{hero?.name ?? "—"}</td>
                      <td className="text-right tabular-nums">
                        {row?.kills ?? 0}
                      </td>
                      <td className="text-right tabular-nums">
                        {row?.deaths ?? 0}
                      </td>
                      <td className="text-right tabular-nums">
                        {row?.assists ?? 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
        </div>
        <SponsorRow state={state} />
      </div>
    </Shell>
  );
}
