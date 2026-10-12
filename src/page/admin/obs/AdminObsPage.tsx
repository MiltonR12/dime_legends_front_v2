import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { useTeamsByTournament } from "@/hooks/team";
import { useBattles } from "@/hooks/battle";
import type { Team } from "@/app/api/team/team.types";
import type { TBattle } from "@/app/api/battle/battle.types";
import { useTournament } from "@/hooks/tournament";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getHeroesApi,
  openDeskApi,
  updateDeskApi,
} from "@/app/api/broadcast/broadcastApi";
import { deskSocket } from "@/broadcast/socket";
import {
  fillDesk,
  LANE_LABEL,
  type DeskEvent,
  type DeskState,
  type HeroCard,
  type Side,
} from "@/broadcast/types";
import {
  BackgroundField,
  DeskCredits,
  MatchClose,
  TeamPicker,
} from "./DeskPanels";
import HeroPicker from "./HeroPicker";
import ObsConnect from "./ObsConnect";

const NO_TEAMS: Team[] = [];

function bestOfFrom(value: string): 1 | 3 | 5 | 7 {
  if (value === "1") return 1;
  if (value === "5") return 5;
  if (value === "7") return 7;
  return 3;
}

type Slot = {
  side: Side;
  kind: "ban" | "pick";
  index: number;
  current: string | null;
};

const field =
  "h-10 rounded-md border border-admin-border bg-admin-input px-2 text-sm text-admin-text";

const tabTrigger =
  "rounded-md border border-transparent px-3 py-1.5 text-sm text-admin-muted data-[state=active]:border-admin-border data-[state=active]:bg-admin-surface data-[state=active]:text-admin-text data-[state=active]:shadow-none";

const takenHeroes = (desk: DeskState, current: string | null) => {
  const taken = new Set<string>();
  for (const side of ["blue", "red"] as const) {
    for (const slug of desk.bans[side] ?? []) if (slug) taken.add(slug);
    for (const player of desk.teams[side].players) {
      if (player.heroSlug) taken.add(player.heroSlug);
    }
  }
  if (current) taken.delete(current);
  return taken;
};

const dayKey = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const dayLabel = (key: string) =>
  new Date(`${key}T12:00:00`).toLocaleDateString("es", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const clockOf = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
};

const paired = (battle: TBattle) => {
  if (battle.status === "cancelled" || battle.status === "canceled") return null;
  if (!battle.teamOne?._id || !battle.teamOne.name) return null;
  if (!battle.teamTwo?._id || !battle.teamTwo.name) return null;
  return { one: battle.teamOne, two: battle.teamTwo };
};

const battleLabel = (battle: TBattle) => {
  const teams = paired(battle);
  if (!teams) return "";
  const group = battle.group ? ` · Grupo ${battle.group}` : "";
  const hour = clockOf(battle.date);
  return `${teams.one.name} vs ${teams.two.name} · Ronda ${battle.round}${group}${hour ? ` · ${hour}` : ""}`;
};

function AdminObsPage() {
  const { id = "" } = useParams();
  const { data: tournament, isLoading } = useTournament(id);
  const { data: teams = NO_TEAMS } = useTeamsByTournament(id);
  const { data: battles = [] } = useBattles(id);
  const [desk, setDesk] = useState<DeskState | null>(null);
  const [heroes, setHeroes] = useState<HeroCard[]>([]);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [error, setError] = useState("");
  const [custom, setCustom] = useState(false);
  const [day, setDay] = useState("");
  const [battleId, setBattleId] = useState("");
  const accepted = teams.filter((team) => team.status === "active");
  const heroMap = useMemo(
    () => new Map(heroes.map((hero) => [hero.slug, hero])),
    [heroes],
  );
  const playable = useMemo(() => {
    const rows = battles.filter((battle) => paired(battle) !== null);
    return [...rows].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [battles]);
  const days = useMemo(
    () =>
      [...new Set(playable.map((battle) => dayKey(battle.date)).filter(Boolean))].sort(),
    [playable],
  );
  const shown =
    day && day !== "all"
      ? playable.filter((battle) => dayKey(battle.date) === day)
      : playable;

  useEffect(() => {
    if (day || days.length === 0) return;
    const today = dayKey(new Date());
    setDay(days.find((item) => item >= today) ?? "all");
  }, [day, days]);

  useEffect(() => {
    if (!id || tournament?.game !== "Mobile Legends") return;
    let alive = true;
    const socket = deskSocket();
    const token = localStorage.getItem("token") ?? "";
    getHeroesApi()
      .then((rows) => {
        if (alive) setHeroes(rows);
      })
      .catch(() => undefined);
    openDeskApi(id)
      .then((state) => {
        if (!alive) return;
        setDesk(fillDesk(state));
        socket.connect();
        socket.emit("desk:join", { tournamentId: id, token });
        socket.on("desk:state", (next: DeskState) => setDesk(fillDesk(next)));
      })
      .catch(() => {
        if (alive) setError("No se pudo abrir la mesa.");
      });
    return () => {
      alive = false;
      socket.disconnect();
    };
  }, [id, tournament?.game]);

  async function send(event: DeskEvent) {
    setError("");
    try {
      setDesk(fillDesk(await updateDeskApi(id, event)));
    } catch {
      setError("No se guardó el cambio.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-admin-muted">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando la mesa...
      </div>
    );
  }

  if (!tournament || tournament.game !== "Mobile Legends") {
    return (
      <p className="text-sm text-admin-muted">
        La mesa OBS está en los torneos de Mobile Legends.
      </p>
    );
  }

  if (!desk) {
    return (
      <p className="text-sm text-admin-muted">
        {error || "Abriendo la mesa..."}
      </p>
    );
  }

  const urls = (
    ["presentacion", "draft", "marcador", "resultado"] as const
  ).map((screen) => ({
    screen,
    href: `${window.location.origin}/obs/${id}/${screen}`,
  }));

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 text-admin-text">
      <header>
        <p className="text-xs uppercase tracking-wide text-admin-muted">Mesa</p>
        <h1 className="text-[28px] font-medium leading-none">
          {tournament.name}
        </h1>
      </header>

      <Tabs defaultValue="draft">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {(
            [
              ["draft", "Draft"],
              ["serie", "Serie"],
              ["cierre", "Cierre"],
              ["obs", "OBS"],
            ] as const
          ).map(([value, label]) => (
            <TabsTrigger key={value} value={value} className={tabTrigger}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <TabsContent value="draft" className="mt-4 space-y-4">
      <BackgroundField
        url={desk.theme.backgroundImageUrl}
        onChange={(url) => send({ type: "background", url })}
        onError={setError}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="border-admin-border text-admin-text hover:bg-admin-surface"
          onClick={() => send({ type: "clear" })}
        >
          Vaciar draft
        </Button>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex w-44 flex-col gap-1">
          <span className="text-sm text-admin-muted">Día</span>
          <Select
            value={day || "all"}
            onValueChange={(next) => {
              setDay(next);
              setBattleId("");
            }}
          >
            <SelectTrigger className="border-admin-border bg-admin-input text-admin-text shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
              <SelectGroup>
                <SelectItem
                  value="all"
                  className="focus:bg-admin-row focus:text-admin-text"
                >
                  Todas
                </SelectItem>
                {days.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    {dayLabel(item)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex min-w-72 flex-1 flex-col gap-1">
          <span className="text-sm text-admin-muted">Batalla</span>
          <Select
            value={battleId || "none"}
            onValueChange={(next) => {
              if (next === "none") {
                setBattleId("");
                return;
              }
              setBattleId(next);
              const battle = shown.find((item) => item._id === next);
              const teams = battle ? paired(battle) : null;
              if (!teams) return;
              send({ type: "match", blue: teams.one._id, red: teams.two._id });
            }}
          >
            <SelectTrigger className="border-admin-border bg-admin-input text-admin-text shadow-none">
              <SelectValue placeholder="Elegir partido" />
            </SelectTrigger>
            <SelectContent className="border-admin-border bg-admin-surface text-admin-text">
              <SelectGroup>
                <SelectItem
                  value="none"
                  className="focus:bg-admin-row focus:text-admin-text"
                >
                  Elegir partido
                </SelectItem>
                {shown.map((battle) => (
                  <SelectItem
                    key={battle._id}
                    value={battle._id}
                    className="focus:bg-admin-row focus:text-admin-text"
                  >
                    {battleLabel(battle)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-admin-border text-admin-text hover:bg-admin-surface"
          disabled={!desk.teams.blue.teamId || !desk.teams.red.teamId}
          onClick={() => {
            const blue = desk.teams.red.teamId;
            const red = desk.teams.blue.teamId;
            if (!blue || !red) return;
            send({ type: "match", blue, red });
          }}
        >
          Invertir
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-admin-border text-admin-text hover:bg-admin-surface"
          onClick={() => setCustom((open) => !open)}
        >
          Partido custom
        </Button>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {(["blue", "red"] as const).map((side) => (
          <section key={side} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2
                className="text-sm font-medium"
                style={{ color: desk.teams[side].color }}
              >
                {side === "blue" ? "Azul" : "Rojo"}
                {desk.teams[side].name ? ` · ${desk.teams[side].name}` : ""}
              </h2>
              {custom ? (
                <TeamPicker
                  teams={accepted}
                  teamId={desk.teams[side].teamId}
                  onPick={(teamId) => {
                    setBattleId("");
                    send({ type: "side", side, teamId });
                  }}
                />
              ) : null}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {desk.bans[side].map((slug, index) => (
                <SlotButton
                  key={`ban-${index}`}
                  label="Ban"
                  hero={slug ? heroMap.get(slug) : undefined}
                  onClick={() =>
                    setSlot({ side, kind: "ban", index, current: slug })
                  }
                />
              ))}
            </div>
            <div className="space-y-2">
              {desk.teams[side].players.map((player, index) => (
                <button
                  key={player.id}
                  type="button"
                  onClick={() =>
                    setSlot({
                      side,
                      kind: "pick",
                      index,
                      current: player.heroSlug,
                    })
                  }
                  className="flex w-full items-center gap-3 rounded-md border border-admin-border bg-admin-surface p-2 text-left hover:border-admin-accent"
                >
                  <span className="grid h-14 w-12 place-items-center overflow-hidden rounded-sm bg-admin-input text-xl text-admin-muted">
                    {player.heroSlug && heroMap.get(player.heroSlug) ? (
                      <img
                        src={heroMap.get(player.heroSlug)?.iconUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm">
                      {player.nick || "Sin jugador"}
                    </span>
                    <span className="block text-xs text-admin-muted">
                      {LANE_LABEL[player.lane]}
                      {player.heroSlug
                        ? ` · ${heroMap.get(player.heroSlug)?.name ?? ""}`
                        : ""}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <label className="block max-w-xs text-xs text-admin-muted">
        Fase en pantalla
        <Input
          value={desk.tournament.stage}
          onChange={(event) =>
            setDesk({
              ...desk,
              tournament: { ...desk.tournament, stage: event.target.value },
            })
          }
          onBlur={() =>
            send({ type: "stage", stage: desk.tournament.stage })
          }
          className={`mt-1 ${field}`}
        />
      </label>
      <DeskCredits desk={desk} send={send} onError={setError} />
        </TabsContent>

        <TabsContent value="serie" className="mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs text-admin-muted">
          Serie
          <div className="mt-1 flex gap-2">
            <select
              value={desk.series.bestOf}
              onChange={(event) =>
                send({
                  type: "series",
                  bestOf: bestOfFrom(event.target.value),
                  blue: desk.series.score.blue,
                  red: desk.series.score.red,
                })
              }
              className={field}
            >
              {[1, 3, 5, 7].map((value) => (
                <option key={value} value={value}>
                  Bo{value}
                </option>
              ))}
            </select>
            <Input
              type="number"
              value={desk.series.score.blue}
              onChange={(event) =>
                send({
                  type: "series",
                  bestOf: desk.series.bestOf,
                  blue: Number(event.target.value),
                  red: desk.series.score.red,
                })
              }
              className={field}
              aria-label="Mapas azul"
            />
            <Input
              type="number"
              value={desk.series.score.red}
              onChange={(event) =>
                send({
                  type: "series",
                  bestOf: desk.series.bestOf,
                  blue: desk.series.score.blue,
                  red: Number(event.target.value),
                })
              }
              className={field}
              aria-label="Mapas rojo"
            />
          </div>
        </label>
        <label className="text-xs text-admin-muted">
          Kills
          <div className="mt-1 flex gap-2">
            <Input
              type="number"
              value={desk.game.kills.blue}
              onChange={(event) =>
                send({
                  type: "kills",
                  blue: Number(event.target.value),
                  red: desk.game.kills.red,
                })
              }
              className={`${field} tabular-nums`}
              aria-label="Kills azul"
            />
            <Input
              type="number"
              value={desk.game.kills.red}
              onChange={(event) =>
                send({
                  type: "kills",
                  blue: desk.game.kills.blue,
                  red: Number(event.target.value),
                })
              }
              className={`${field} tabular-nums`}
              aria-label="Kills rojo"
            />
          </div>
        </label>
      </div>
        </TabsContent>

        <TabsContent value="cierre" className="mt-4">
      <MatchClose desk={desk} heroes={heroMap} send={send} />
        </TabsContent>

        <TabsContent value="obs" className="mt-4 space-y-6">
      <ObsConnect
        heroes={heroes}
        onApply={(slots) => send({ type: "detected", ...slots })}
      />

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Enlaces para OBS</h2>
        {urls.map((item) => (
          <div key={item.screen} className="flex items-center gap-3 text-sm">
            <span className="w-28 capitalize text-admin-muted">
              {item.screen}
            </span>
            <code className="truncate text-admin-text">{item.href}</code>
            <Button
              type="button"
              variant="outline"
              className="border-admin-border"
              onClick={() => navigator.clipboard.writeText(item.href)}
            >
              Copiar
            </Button>
          </div>
        ))}
      </section>
        </TabsContent>
      </Tabs>

      <HeroPicker
        open={slot != null}
        title={slot?.kind === "ban" ? "Ban" : "Personaje"}
        heroes={heroes}
        current={slot?.current ?? null}
        taken={takenHeroes(desk, slot?.current ?? null)}
        onOpenChange={(open) => {
          if (!open) setSlot(null);
        }}
        onPick={(heroSlug) => {
          if (!slot) return;
          send({
            type: "slot",
            side: slot.side,
            kind: slot.kind,
            index: slot.index,
            heroSlug,
          });
          setSlot(null);
        }}
      />
    </div>
  );
}

function SlotButton({
  label,
  hero,
  onClick,
}: {
  label: string;
  hero?: HeroCard;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid aspect-square place-items-center overflow-hidden rounded-md border border-admin-border bg-admin-input text-admin-muted hover:border-admin-accent"
      aria-label={label}
    >
      {hero ? (
        <img
          src={hero.iconUrl}
          alt={hero.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <Plus className="h-4 w-4" />
      )}
    </button>
  );
}

export default AdminObsPage;
