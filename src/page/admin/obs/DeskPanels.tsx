import { useEffect, useRef, useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import type { Team } from "@/app/api/team/team.types";
import { uploadFile } from "@/app/api/upload/uploadApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  isVideoUrl,
  LANE_LABEL,
  type DeskCaster,
  type DeskEvent,
  type DeskKda,
  type DeskSponsor,
  type DeskState,
  type HeroCard,
  type Side,
} from "@/broadcast/types";

const field =
  "h-10 rounded-md border border-admin-border bg-admin-input px-2 text-sm text-admin-text";

function Mark({ src, label }: { src?: string | null; label: string }) {
  if (src) {
    return (
      <img src={src} alt="" className="h-8 w-8 rounded-full object-cover" />
    );
  }
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-admin-input text-xs text-admin-muted">
      {label.slice(0, 1).toUpperCase() || "?"}
    </span>
  );
}

export function TeamPicker({
  teams,
  teamId,
  onPick,
}: {
  teams: Team[];
  teamId: string | null;
  onPick: (teamId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = teams.find((team) => team._id === teamId);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    <div
      className="relative"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="flex h-11 min-w-56 items-center gap-2 rounded-md border border-admin-border bg-admin-input px-2 text-left text-sm text-admin-text"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Equipo inscrito"
      >
        <Mark src={current?.image} label={current?.name ?? "E"} />
        <span className="truncate">{current?.name ?? "Equipo inscrito"}</span>
      </button>
      {open && (
        <ul className="absolute right-0 z-20 mt-1 max-h-72 w-72 overflow-auto rounded-md border border-admin-border bg-admin-surface py-1 shadow-lg">
          {teams.length === 0 && (
            <li className="px-3 py-2 text-sm text-admin-muted">
              No hay equipos aceptados
            </li>
          )}
          {teams.map((team) => (
            <li key={team._id}>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-admin-input"
                onClick={() => {
                  onPick(team._id);
                  setOpen(false);
                }}
              >
                <Mark src={team.image} label={team.name} />
                <span className="truncate">{team.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BackgroundField({
  url,
  onChange,
  onError,
}: {
  url: string;
  onChange: (url: string) => void;
  onError: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-md border border-admin-border bg-admin-surface p-3">
      <div className="grid h-20 w-36 place-items-center overflow-hidden rounded-sm bg-admin-input">
        {url && isVideoUrl(url) ? (
          <video
            src={url}
            muted
            loop
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : url ? (
          <img src={url} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImagePlus className="h-5 w-5 text-admin-muted" />
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm text-admin-text">Fondo de Draft y Cierre</p>
        <p className="text-xs text-admin-muted">
          {url
            ? "Imagen o video. Presentación y marcador siguen transparentes."
            : "Sin archivo, Draft y Cierre quedan transparentes."}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            disabled={busy}
            className="bg-admin-accent text-white hover:bg-admin-accent-hover"
            onClick={() => inputRef.current?.click()}
          >
            {busy ? "Subiendo..." : url ? "Cambiar" : "Elegir imagen o video"}
          </Button>
          {url && (
            <Button
              type="button"
              variant="outline"
              className="border-admin-border"
              onClick={() => onChange("")}
            >
              Quitar
            </Button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setBusy(true);
          uploadFile(file, "broadcast", { video: true })
            .then(onChange)
            .catch(() => onError("No se subió el fondo."))
            .finally(() => setBusy(false));
        }}
      />
    </div>
  );
}

function NumberBox({
  value,
  label,
  max,
  onCommit,
}: {
  value: number;
  label: string;
  max: number;
  onCommit: (value: number) => void;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  return (
    <Input
      type="number"
      min={0}
      max={max}
      aria-label={label}
      value={text}
      className={`${field} tabular-nums`}
      onChange={(event) => setText(event.target.value)}
      onBlur={() => {
        const next = Math.max(0, Math.min(max, Math.floor(Number(text) || 0)));
        setText(String(next));
        if (next !== value) onCommit(next);
      }}
    />
  );
}

function TextBox({
  value,
  label,
  max,
  onCommit,
}: {
  value: string;
  label: string;
  max: number;
  onCommit: (value: string) => void;
}) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);
  return (
    <Input
      aria-label={label}
      value={text}
      maxLength={max}
      className={field}
      onChange={(event) => setText(event.target.value)}
      onBlur={() => {
        if (text !== value) onCommit(text.slice(0, max));
      }}
    />
  );
}

export function DeskCredits({
  desk,
  send,
  onError,
}: {
  desk: DeskState;
  send: (event: DeskEvent) => void;
  onError: (message: string) => void;
}) {
  const sponsors = desk.sponsors ?? [];
  const casters = desk.casters ?? [];

  function putSponsors(next: DeskSponsor[]) {
    send({ type: "sponsors", sponsors: next });
  }

  function putCasters(next: DeskCaster[]) {
    send({ type: "casters", casters: next });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Patrocinadores</h2>
          <Button
            type="button"
            variant="outline"
            className="border-admin-border"
            disabled={sponsors.length >= 12}
            onClick={() =>
              putSponsors([
                ...sponsors,
                { id: crypto.randomUUID(), name: "", logoUrl: "" },
              ])
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Agregar
          </Button>
        </div>
        {sponsors.length === 0 && (
          <p className="text-xs text-admin-muted">
            Aparecen en presentación, draft y resultado.
          </p>
        )}
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="flex items-center gap-2">
            <Mark src={sponsor.logoUrl} label={sponsor.name || "P"} />
            <TextBox
              value={sponsor.name}
              label="Nombre del patrocinador"
              max={40}
              onCommit={(name) =>
                putSponsors(
                  sponsors.map((item) =>
                    item.id === sponsor.id ? { ...item, name } : item,
                  ),
                )
              }
            />
            <LogoButton
              label="Logo"
              onUploaded={(logoUrl) =>
                putSponsors(
                  sponsors.map((item) =>
                    item.id === sponsor.id ? { ...item, logoUrl } : item,
                  ),
                )
              }
              onError={onError}
            />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-admin-muted"
              aria-label="Quitar patrocinador"
              onClick={() =>
                putSponsors(sponsors.filter((item) => item.id !== sponsor.id))
              }
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Casters</h2>
          <Button
            type="button"
            variant="outline"
            className="border-admin-border"
            disabled={casters.length >= 6}
            onClick={() =>
              putCasters([
                ...casters,
                { id: crypto.randomUUID(), name: "", role: "Caster" },
              ])
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Agregar
          </Button>
        </div>
        {casters.length === 0 && (
          <p className="text-xs text-admin-muted">
            Salen en la presentación, bajo los equipos.
          </p>
        )}
        {casters.map((caster) => (
          <div key={caster.id} className="flex items-center gap-2">
            <TextBox
              value={caster.name}
              label="Nombre del caster"
              max={40}
              onCommit={(name) =>
                putCasters(mapCaster(casters, caster.id, { name }))
              }
            />
            <TextBox
              value={caster.role}
              label="Rol del caster"
              max={40}
              onCommit={(role) =>
                putCasters(mapCaster(casters, caster.id, { role }))
              }
            />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-admin-muted"
              aria-label="Quitar caster"
              onClick={() =>
                putCasters(casters.filter((item) => item.id !== caster.id))
              }
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

function mapCaster(
  casters: DeskCaster[],
  id: string,
  patch: Partial<DeskCaster>,
) {
  return casters.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

function LogoButton({
  label,
  onUploaded,
  onError,
}: {
  label: string;
  onUploaded: (url: string) => void;
  onError: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="border-admin-border"
        onClick={() => inputRef.current?.click()}
      >
        {label}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          uploadFile(file, "broadcast")
            .then(onUploaded)
            .catch(() => onError("No se subió el logo."));
        }}
      />
    </>
  );
}

export function MatchClose({
  desk,
  heroes,
  send,
}: {
  desk: DeskState;
  heroes: Map<string, HeroCard>;
  send: (event: DeskEvent) => void;
}) {
  const minutes = Math.floor(desk.result.durationSec / 60);
  const seconds = desk.result.durationSec % 60;
  const rows = desk.result.kda ?? [];

  function rowOf(playerId: string, side: Side): DeskKda {
    return (
      rows.find((row) => row.playerId === playerId) ?? {
        playerId,
        side,
        kills: 0,
        deaths: 0,
        assists: 0,
      }
    );
  }

  function commit(playerId: string, side: Side, patch: Partial<DeskKda>) {
    const current = rowOf(playerId, side);
    const next = { ...current, ...patch, side };
    const rest = rows.filter((row) => row.playerId !== playerId);
    send({ type: "kda", rows: [...rest, next] });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium">Cierre de la partida</h2>
      <div className="flex flex-wrap items-end gap-3">
        {(["blue", "red"] as const).map((side) => {
          const team = desk.teams[side];
          const chosen = desk.result.winner === side;
          return (
            <button
              key={side}
              type="button"
              onClick={() =>
                send({
                  type: "result",
                  winner: side,
                  durationSec: desk.result.durationSec,
                })
              }
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                chosen
                  ? "border-admin-accent bg-admin-surface"
                  : "border-admin-border"
              }`}
            >
              <Mark src={team.logoUrl} label={team.name} />
              {team.name}
            </button>
          );
        })}
        <button
          type="button"
          className="h-11 px-2 text-sm text-admin-muted underline"
          onClick={() =>
            send({
              type: "result",
              winner: null,
              durationSec: desk.result.durationSec,
            })
          }
        >
          Sin ganador
        </button>
        <label className="text-xs text-admin-muted">
          Minutos
          <NumberBox
            value={minutes}
            label="Minutos"
            max={120}
            onCommit={(next) =>
              send({
                type: "result",
                winner: desk.result.winner,
                durationSec: next * 60 + seconds,
              })
            }
          />
        </label>
        <label className="text-xs text-admin-muted">
          Segundos
          <NumberBox
            value={seconds}
            label="Segundos"
            max={59}
            onCommit={(next) =>
              send({
                type: "result",
                winner: desk.result.winner,
                durationSec: minutes * 60 + next,
              })
            }
          />
        </label>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {(["blue", "red"] as const).map((side) => (
          <div key={side} className="space-y-2">
            <h3 className="text-sm" style={{ color: desk.teams[side].color }}>
              {desk.teams[side].name}
            </h3>
            <div className="grid grid-cols-[1fr_4rem_4rem_4rem] gap-2 text-xs text-admin-muted">
              <span>Jugador</span>
              <span className="text-center">K</span>
              <span className="text-center">D</span>
              <span className="text-center">A</span>
            </div>
            {desk.teams[side].players.map((player) => {
              const row = rowOf(player.id, side);
              const hero = player.heroSlug
                ? heroes.get(player.heroSlug)
                : undefined;
              return (
                <div
                  key={player.id}
                  className="grid grid-cols-[1fr_4rem_4rem_4rem] items-center gap-2"
                >
                  <span className="truncate text-sm">
                    {player.nick || LANE_LABEL[player.lane]}
                    {hero ? ` · ${hero.name}` : ""}
                  </span>
                  {(["kills", "deaths", "assists"] as const).map((stat) => (
                    <NumberBox
                      key={stat}
                      value={row[stat]}
                      label={stat}
                      max={99}
                      onCommit={(value) =>
                        commit(player.id, side, { [stat]: value })
                      }
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
