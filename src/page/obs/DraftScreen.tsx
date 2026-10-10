import { LANE_LABEL, type DeskState, type HeroCard } from "@/broadcast/types";
import { heroOf, Shell, SponsorRow } from "./frame";

export function DraftScreen({
  state,
  heroes,
}: {
  state: DeskState;
  heroes: Map<string, HeroCard>;
}) {
  return (
    <Shell state={state} backdrop>
      <div className="grid h-full grid-cols-2 grid-rows-[1fr_auto] gap-12 px-12 py-10">
        {(["blue", "red"] as const).map((side) => {
          const team = state.teams[side];
          return (
            <section key={side} className={side === "red" ? "text-right" : ""}>
              <h2 className="text-4xl font-medium">{team.name}</h2>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {state.bans[side].map((slug, index) => {
                  const hero = heroOf(heroes, slug);
                  return (
                    <div
                      key={index}
                      className="relative h-16 overflow-hidden"
                      style={{ outline: `1px solid ${team.color}` }}
                    >
                      {hero && (
                        <img
                          src={hero.iconUrl}
                          alt=""
                          className="h-full w-full object-cover grayscale"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <ul className="mt-6 space-y-3">
                {team.players.map((player) => {
                  const hero = heroOf(heroes, player.heroSlug);
                  return (
                    <li
                      key={player.id}
                      className={`flex items-center gap-4 ${side === "red" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className="h-20 w-16 overflow-hidden"
                        style={{ background: team.color }}
                      >
                        {hero && (
                          <img
                            src={hero.portraitUrl || hero.iconUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="text-3xl">{player.nick || "—"}</div>
                        <div className="text-lg opacity-70">
                          {hero?.name ?? LANE_LABEL[player.lane]}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        <div className="col-span-2 self-end">
          <SponsorRow state={state} />
        </div>
      </div>
    </Shell>
  );
}
