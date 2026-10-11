import {
  LANES,
  type DeskState,
  type DeskTeam,
  type HeroCard,
  type Side,
} from "@/broadcast/types";
import { heroOf, Shell } from "./frame";

const skewOf = (side: Side) => (side === "blue" ? "-8deg" : "8deg");
const unskewOf = (side: Side) => (side === "blue" ? "8deg" : "-8deg");

const plateClip = (side: Side) =>
  side === "blue"
    ? "polygon(0 24%, 16% 0, 100% 0, 84% 100%, 0 100%)"
    : "polygon(0 0, 84% 0, 100% 24%, 100% 100%, 16% 100%)";

function TeamPlate({
  side,
  team,
  bans,
  heroes,
}: {
  side: Side;
  team: DeskTeam;
  bans: (string | null)[];
  heroes: Map<string, HeroCard>;
}) {
  const blue = side === "blue";
  return (
    <div className={`w-[460px] ${blue ? "" : "ml-auto"}`}>
      <div
        className="flex h-[72px] items-center px-8"
        style={{ clipPath: plateClip(side), background: "#f4f4f4" }}
      >
        <span
          className={`min-w-0 flex-1 truncate text-[32px] font-black uppercase leading-none tracking-wide text-[#12142b] ${
            blue ? "text-left" : "text-right"
          }`}
        >
          {team.name}
        </span>
      </div>
      <div className="mt-2 flex h-16">
        {bans.slice(0, 5).map((slug, index) => {
          const banned = heroOf(heroes, slug);
          return (
            <div key={index} className="flex flex-1 items-center justify-center">
              {banned ? (
                <img
                  src={banned.iconUrl}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.55)]"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamLogo({ team }: { team: DeskTeam }) {
  if (!team.logoUrl) return null;
  return (
    <img
      src={team.logoUrl}
      alt=""
      className="h-44 w-44 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]"
    />
  );
}

const laneLogo = (lane: (typeof LANES)[number]) =>
  `https://mlbbdex.com/visuels/lanes/${lane}.webp`;

function PickCard({
  side,
  lane,
  nick,
  hero,
}: {
  side: Side;
  lane: (typeof LANES)[number];
  nick: string;
  hero: HeroCard | null;
}) {
  return (
    <div
      className="relative h-[660px] min-w-0 flex-1 overflow-hidden"
      style={{
        transform: `skewX(${skewOf(side)})`,
        background: "linear-gradient(#555 0 72%, #3a3a3a 72% 100%)",
        boxShadow: "4px 0 6px rgba(0,0,0,.5)",
      }}
    >
      {hero ? (
        <div
          className="absolute -inset-[14%]"
          style={{ transform: `skewX(${unskewOf(side)})` }}
        >
          <img
            src={hero.portraitUrl || hero.iconUrl}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[#2c2c2c]" />
      <div
        className="absolute inset-x-2 bottom-3 z-10 flex flex-col items-center justify-end gap-1 text-center"
        style={{ transform: `skewX(${unskewOf(side)})` }}
      >
        <img src={laneLogo(lane)} alt="" className="h-16 w-16 object-contain" />
        <div className="line-clamp-2 w-full text-2xl font-black leading-[1.05] text-white">
          {nick || "—"}
        </div>
      </div>
    </div>
  );
}

function SideBoard({
  state,
  side,
  heroes,
}: {
  state: DeskState;
  side: Side;
  heroes: Map<string, HeroCard>;
}) {
  const team = state.teams[side];
  const players = LANES.map(
    (lane) =>
      team.players.find((player) => player.lane === lane) ?? {
        id: lane,
        nick: "",
        lane,
        heroSlug: null,
      },
  );
  const bans = state.bans?.[side] ?? [null, null, null, null, null];

  return (
    <section className="flex min-w-0 flex-col">
      <TeamPlate side={side} team={team} bans={bans} heroes={heroes} />
      <div className="mt-3 flex gap-1 px-8">
        {players.map((player) => (
          <PickCard
            key={player.id}
            side={side}
            lane={player.lane}
            nick={player.nick}
            hero={heroOf(heroes, player.heroSlug)}
          />
        ))}
      </div>
    </section>
  );
}

export function DraftScreen({
  state,
  heroes,
}: {
  state: DeskState;
  heroes: Map<string, HeroCard>;
}) {
  return (
    <Shell state={state} backdrop>
      <div className="flex h-full items-end px-6 pb-8">
        <div className="relative w-full">
          <div className="grid grid-cols-2 gap-x-28">
            <SideBoard state={state} side="blue" heroes={heroes} />
            <SideBoard state={state} side="red" heroes={heroes} />
          </div>
          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-start justify-center gap-4">
            <TeamLogo team={state.teams.blue} />
            <TeamLogo team={state.teams.red} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
