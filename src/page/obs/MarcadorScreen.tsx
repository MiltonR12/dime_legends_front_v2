import { useEffect, useState, type ReactNode } from "react";
import {
  clockMs,
  formatClock,
  type DeskClock,
  type DeskSponsor,
  type DeskState,
  type DeskTeam,
} from "@/broadcast/types";
import { Shell } from "./frame";

const PINK = "polygon(24.3% 9.16%, 97.59% 9.16%, 76.76% 95.2%, 4.02% 95.2%)";
const BLUE = "polygon(75.7% 9.16%, 2.41% 9.16%, 23.24% 95.2%, 95.98% 95.2%)";
const NAME = "polygon(18% 9%, 100% 9%, 82% 95%, 0% 95%)";
const CENTER = "polygon(16% 9%, 100% 9%, 84% 95%, 0% 95%)";

function useNow(running: boolean, startedAt: string | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [running, startedAt]);
  return now;
}

function Plate({
  clip,
  border,
  className,
  children,
}: {
  clip: string;
  border?: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative ${className}`}
    >
      <div className="absolute inset-0" style={{ clipPath: clip, background: border }} />
      <div className="absolute inset-[5px]" style={{ clipPath: clip }}>
        {children}
      </div>
    </div>
  );
}

function LogoPlate({
  team,
  clip,
  border,
}: {
  team: DeskTeam;
  clip: string;
  border: string;
}) {
  return (
    <Plate clip={clip} border={border} className="h-[130px] w-[230px]">
      <div className="h-full w-full">
        {team.logoUrl ? (
          <img
            src={team.logoUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
    </Plate>
  );
}

function NamePlate({ name, align }: { name: string; align: "start" | "end" }) {
  return (
    <Plate clip={NAME} className="-mx-6 h-[108px] w-[300px]">
      <div
        className={`flex h-full w-full items-center px-8 text-3xl font-medium text-black ${
          align === "end" ? "justify-end text-right" : "justify-start text-left"
        }`}
      >
        <span className="truncate">{name}</span>
      </div>
    </Plate>
  );
}

function ScorePlate({ clock, blue, red }: { clock: DeskClock; blue: number; red: number }) {
  const now = useNow(clock.running, clock.startedAt);
  return (
    <Plate clip={CENTER} className="-mx-4 h-[108px] w-[200px]">
      <div className="flex h-full w-full flex-col items-center justify-center text-black">
        <span className="text-3xl font-medium tabular-nums">
          {formatClock(clockMs(clock, now))}
        </span>
        <span className="text-4xl font-medium tabular-nums">
          {blue} - {red}
        </span>
      </div>
    </Plate>
  );
}

function SponsorCorner({ sponsors }: { sponsors: DeskSponsor[] }) {
  const visible = sponsors.filter((sponsor) => sponsor.logoUrl || sponsor.name);
  const [index, setIndex] = useState(0);
  const ids = visible.map((sponsor) => sponsor.id).join("|");

  useEffect(() => {
    setIndex(0);
  }, [ids]);

  useEffect(() => {
    if (visible.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % visible.length);
    }, 10_000);
    return () => window.clearInterval(id);
  }, [visible.length, ids]);

  const sponsor = visible[index % Math.max(visible.length, 1)];
  if (!sponsor) return null;

  return (
    <Plate clip={PINK} border="#ff3ec8" className="h-[120px] w-[220px]">
      <div className="flex h-full w-full items-center justify-center bg-black px-6">
        {sponsor.logoUrl ? (
          <img
            src={sponsor.logoUrl}
            alt={sponsor.name}
            className="max-h-16 max-w-full object-contain"
          />
        ) : (
          <span className="truncate text-2xl text-white">{sponsor.name}</span>
        )}
      </div>
    </Plate>
  );
}

export function MarcadorScreen({ state }: { state: DeskState }) {
  const blue = state.teams.blue;
  const red = state.teams.red;
  return (
    <Shell state={state}>
      <div className="relative h-full">
        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-center">
          <LogoPlate team={blue} clip={PINK} border="#ff3ec8" />
          <NamePlate name={blue.name} align="end" />
          <ScorePlate
            clock={state.clock}
            blue={state.series.score.blue}
            red={state.series.score.red}
          />
          <NamePlate name={red.name} align="start" />
          <LogoPlate team={red} clip={BLUE} border="#ffffff" />
        </div>
        <div className="absolute right-8 top-6">
          <SponsorCorner sponsors={state.sponsors ?? []} />
        </div>
      </div>
    </Shell>
  );
}
