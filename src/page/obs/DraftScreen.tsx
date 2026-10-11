import {
  LANES,
  LANE_LABEL,
  type DeskCaster,
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

function TeamPlate({ side, team }: { side: Side; team: DeskTeam }) {
  const blue = side === "blue";
  return (
    <div className={`relative h-[118px] w-[380px] ${blue ? "" : "ml-auto"}`}>
      <div
        className="absolute inset-x-0 top-0 flex h-[74px] items-center justify-center bg-white px-10"
        style={{ clipPath: plateClip(side) }}
      >
        {team.logoUrl ? (
          <img
            src={team.logoUrl}
            alt=""
            className="h-14 w-14 object-contain"
          />
        ) : (
          <span className="text-3xl font-black tracking-wide text-[#12142b]">
            {team.tag}
          </span>
        )}
      </div>
      <div
        className={`absolute bottom-0 flex h-[48px] items-center bg-[#12142b] px-7 ${
          blue ? "left-0 right-8" : "left-8 right-0"
        }`}
        style={{ clipPath: nameClip(side) }}
      >
        <span className="min-w-0 flex-1 truncate text-[30px] font-black uppercase leading-none tracking-wide text-white">
          {team.name}
        </span>
        <span
          className={`absolute top-0 h-full w-4 bg-[#ff3d9a] ${blue ? "right-0" : "left-0"}`}
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
      ) : (
        <div
          className="absolute inset-x-0 top-0 flex h-[68%] items-center justify-center"
          style={{ transform: `skewX(${unskewOf(side)})` }}
        >
          <img
            src={laneLogo(lane)}
            alt=""
            className="h-36 w-36 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[#2c2c2c]" />
      <div
        className={`absolute inset-x-[8%] bottom-4 z-10 flex flex-col justify-end ${
          blue ? "items-start text-left" : "items-end text-right"
        }`}
        style={{ transform: `skewX(${unskewOf(side)})` }}
      >
        <div className="text-[30px] font-black uppercase leading-none text-white">
          {LANE_LABEL[lane]}
        </div>
        <div className="mt-1 line-clamp-2 text-[26px] font-black leading-[1.05] text-white">
          {nick || "—"}
        </div>
      </div>
    </div>
  );
}

function BanSlot({
  side,
  hero,
}: {
  side: Side;
  hero: HeroCard | null;
}) {
  return (
    <div
      className="relative h-[72px] min-w-0 flex-1 overflow-hidden bg-[#5a5a5a]"
      style={{
        transform: `skewX(${skewOf(side)})`,
        boxShadow: "4px 0 6px rgba(0,0,0,.5)",
      }}
    >
      {hero ? (
        <div
          className="absolute -inset-[14%]"
          style={{ transform: `skewX(${unskewOf(side)})` }}
        >
          <img
            src={hero.iconUrl}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
        </div>
      ) : null}
    </div>
  );
}

function CasterPlate({
  caster,
  side,
}: {
  caster: DeskCaster;
  side: Side;
}) {
  return (
    <div
      className="flex h-[104px] w-[180px] flex-col items-center justify-center bg-[#2f6b22] px-4 text-center text-white"
      style={{
        clipPath:
          side === "blue"
            ? "polygon(8% 0, 100% 0, 92% 100%, 0 100%)"
            : "polygon(0 0, 92% 0, 100% 100%, 8% 100%)",
        filter: "drop-shadow(0 10px 8px rgba(0,0,0,0.4))",
      }}
    >
      <div className="line-clamp-2 text-[26px] font-black leading-none">
        {caster.name}
      </div>
      {caster.role ? (
        <div className="mt-1 text-lg font-bold uppercase leading-none tracking-wide">
          {caster.role}
        </div>
      ) : null}
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
      <TeamPlate side={side} team={team} />
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
      <div className="mt-3 flex gap-1 px-8">
        {bans.slice(0, 5).map((slug, index) => (
          <BanSlot key={index} side={side} hero={heroOf(heroes, slug)} />
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
  const casters = (state.casters ?? []).filter((caster) => caster.name).slice(0, 2);

  return (
    <Shell state={state} backdrop>
      <div className="relative h-full px-6 pt-8">
        <div className="grid h-full grid-cols-2 gap-x-28">
          <SideBoard state={state} side="blue" heroes={heroes} />
          <SideBoard state={state} side="red" heroes={heroes} />
        </div>
        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-start justify-center gap-4">
          {casters.map((caster, index) => (
            <CasterPlate
              key={caster.id}
              caster={caster}
              side={index === 0 ? "blue" : "red"}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}
