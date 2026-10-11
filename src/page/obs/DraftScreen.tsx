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

const nameClip = (side: Side) =>
  side === "blue"
    ? "polygon(0 0, 92% 0, 100% 100%, 8% 100%)"
    : "polygon(8% 0, 100% 0, 92% 100%, 0 100%)";

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
    <div className={`relative h-[148px] w-[460px] ${blue ? "" : "ml-auto"}`}>
      <div
        className="absolute inset-x-0 top-0 flex h-[72px] items-center px-8"
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
      <div
        className={`absolute bottom-0 flex h-[70px] overflow-hidden bg-[#12142b] ${
          blue ? "left-0 right-6" : "left-6 right-0"
        }`}
        style={{ clipPath: nameClip(side) }}
      >
        {bans.slice(0, 5).map((slug, index) => {
          const hero = heroOf(heroes, slug);
          return (
            <div
              key={index}
              className={`relative min-w-0 flex-1 ${index > 0 ? "border-l border-white/70" : ""}`}
            >
              {hero ? (
                <img
                  src={hero.iconUrl}
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
              ) : null}
            </div>
          );
        })}
        <span
          className={`pointer-events-none absolute top-0 h-full w-4 bg-[#ff3d9a] ${blue ? "right-0" : "left-0"}`}
          style={{
            clipPath: blue
              ? "polygon(45% 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 55% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </div>
  );
}

function TeamLogo({ team, side }: { team: DeskTeam; side: Side }) {
  return (
    <div
      className="flex h-[110px] w-[190px] items-center justify-center bg-[#2f6b22]"
      style={{
        clipPath:
          side === "blue"
            ? "polygon(8% 0, 100% 0, 92% 100%, 0 100%)"
            : "polygon(0 0, 92% 0, 100% 100%, 8% 100%)",
        filter: "drop-shadow(0 10px 8px rgba(0,0,0,0.4))",
      }}
    >
      {team.logoUrl ? (
        <img src={team.logoUrl} alt="" className="h-16 w-16 object-contain" />
      ) : (
        <span className="text-3xl font-black tracking-wide text-white">
          {team.tag}
        </span>
      )}
    </div>
  );
}

const laneLogo = (lane: (typeof LANES)[number]) =>
  `https://mlbbdex.com/visuels/lanes/${lane}.webp`;

const ROLE_LABEL: Record<string, string> = {
  assassin: "Asesino",
  mage: "Mago",
  marksman: "Tirador",
  tank: "Tanque",
  fighter: "Luchador",
  support: "Apoyo",
};

const roleLabel = (role: string) =>
  ROLE_LABEL[role.toLowerCase()] ?? role;

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
  const blue = side === "blue";
  return (
    <div
      className="relative h-[540px] min-w-0 flex-1 overflow-hidden"
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
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[#2c2c2c]" />
      <div
        className={`absolute inset-x-[8%] bottom-3 z-10 flex flex-col justify-end gap-1 ${
          blue ? "items-start text-left" : "items-end text-right"
        }`}
        style={{ transform: `skewX(${unskewOf(side)})` }}
      >
        <img src={laneLogo(lane)} alt="" className="h-14 w-14 object-contain" />
        {hero?.roles?.[0] ? (
          <div className="text-[28px] font-black uppercase leading-none text-white">
            {roleLabel(hero.roles[0])}
          </div>
        ) : null}
        <div className="line-clamp-2 text-[26px] font-black leading-[1.05] text-white">
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
            <TeamLogo team={state.teams.blue} side="blue" />
            <TeamLogo team={state.teams.red} side="red" />
          </div>
        </div>
      </div>
    </Shell>
  );
}
