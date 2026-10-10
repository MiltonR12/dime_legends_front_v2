import { useState } from "react";
import { LANE_LABEL, type DeskState, type HeroCard, type Side } from "@/broadcast/types";
import { heroOf, plate, Shell, SponsorRow } from "./frame";

/**
 * Imagen del héroe y, encima, su clip de entrada. El clip se reproduce una vez y queda en el último
 * cuadro; si no existe o falla, se queda la imagen. Con `key` por héroe no se repite al actualizar la mesa.
 */
function HeroPortrait({ hero }: { hero: HeroCard }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const image = hero.portraitUrl || hero.iconUrl;

  return (
    <>
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {hero.videoUrl && !failed ? (
        <video
          src={hero.videoUrl}
          poster={image}
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </>
  );
}

function TeamColumns({
  state,
  side,
  heroes,
}: {
  state: DeskState;
  side: Side;
  heroes: Map<string, HeroCard>;
}) {
  const team = state.teams[side];
  const reverse = side === "red";
  const bans = state.bans?.[side] ?? [null, null, null, null, null];
  return (
    <div
      className={`flex h-full min-h-0 flex-col justify-end gap-4 ${reverse ? "items-end" : "items-start"}`}
    >
      <div
        className={`flex items-center gap-4 ${reverse ? "flex-row-reverse text-right" : ""}`}
      >
        {team.logoUrl ? (
          <img
            src={team.logoUrl}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div
            className="h-16 w-16 rounded-full"
            style={{ background: team.color }}
          />
        )}
        <div>
          <div
            className="max-w-[26rem] truncate text-4xl font-medium leading-none"
            style={{ textShadow: plate }}
          >
            {team.name}
          </div>
          <span
            className="mt-2 inline-block px-2 py-0.5 text-sm text-white"
            style={{ background: team.color }}
          >
            {team.tag}
          </span>
        </div>
      </div>
      <div
        className={`flex items-center gap-2 ${reverse ? "flex-row-reverse" : ""}`}
      >
        <span className="text-xs tracking-widest" style={{ textShadow: plate }}>
          BANS
        </span>
        {bans.map((slug, index) => {
          const hero = heroOf(heroes, slug);
          return (
            <span
              key={index}
              className="block h-11 w-11 overflow-hidden bg-[#141820]"
            >
              {hero && (
                <img
                  src={hero.iconUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </span>
          );
        })}
      </div>
      <div className="grid h-[520px] w-full grid-cols-5 gap-2">
        {team.players.map((player) => {
          const hero = heroOf(heroes, player.heroSlug);
          return (
            <div
              key={player.id}
              className="flex h-full flex-col overflow-hidden bg-[#141820]"
            >
              <div className="relative min-h-0 flex-1">
                {hero && <HeroPortrait key={hero.slug} hero={hero} />}
              </div>
              <div className="bg-black/80 px-2 py-2">
                <div className="truncate text-sm">{player.nick || "—"}</div>
                <div className="text-[11px] uppercase tracking-wide opacity-70">
                  {LANE_LABEL[player.lane]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PresentacionScreen({
  state,
  heroes,
}: {
  state: DeskState;
  heroes: Map<string, HeroCard>;
}) {
  const casters = (state.casters ?? []).filter((caster) => caster.name);
  return (
    <Shell state={state}>
      <div className="flex h-full flex-col px-10 py-8 text-white">
        <div className="text-center">
          <div
            className="text-2xl uppercase tracking-[0.22em]"
            style={{ textShadow: plate }}
          >
            {state.tournament.name}
          </div>
          {state.tournament.stage && (
            <div
              className="mt-1 text-lg"
              style={{ color: state.theme.accent, textShadow: plate }}
            >
              {state.tournament.stage}
            </div>
          )}
        </div>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1fr_4rem_1fr] items-stretch gap-4">
          <TeamColumns state={state} side="blue" heroes={heroes} />
          <div
            className="flex items-center justify-center text-4xl font-medium"
            style={{ textShadow: plate }}
          >
            VS
          </div>
          <TeamColumns state={state} side="red" heroes={heroes} />
        </div>
        <div className="grid gap-3 pt-4 text-center">
          <SponsorRow state={state} />
          {casters.length > 0 && (
            <p className="text-xl" style={{ textShadow: plate }}>
              Narración:{" "}
              {casters
                .map((caster) =>
                  caster.role ? `${caster.name} (${caster.role})` : caster.name,
                )
                .join(" · ")}
            </p>
          )}
        </div>
      </div>
    </Shell>
  );
}
