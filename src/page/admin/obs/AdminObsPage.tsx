import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { useTeamsByTournament } from "@/hooks/team";
import type { Team } from "@/app/api/team/team.types";
import { useTournament } from "@/hooks/tournament";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

function AdminObsPage() {
  const { id = "" } = useParams();
  const { data: tournament, isLoading } = useTournament(id);
  const { data: teams = NO_TEAMS } = useTeamsByTournament(id);
  const [desk, setDesk] = useState<DeskState | null>(null);
  const [heroes, setHeroes] = useState<HeroCard[]>([]);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [error, setError] = useState("");
  const accepted = teams.filter((team) => team.status === "active");
  const heroMap = useMemo(
    () => new Map(heroes.map((hero) => [hero.slug, hero])),
    [heroes],
  );

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
              ["datos", "Datos"],
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
      <div className="grid gap-8 lg:grid-cols-2">
        {(["blue", "red"] as const).map((side) => (
          <section key={side} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2
                className="text-sm font-medium"
                style={{ color: desk.teams[side].color }}
              >
                {side === "blue" ? "Azul" : "Rojo"}
              </h2>
              <TeamPicker
                teams={accepted}
                teamId={desk.teams[side].teamId}
                onPick={(teamId) => send({ type: "side", side, teamId })}
              />
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

        <TabsContent value="datos" className="mt-4 space-y-6">
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
