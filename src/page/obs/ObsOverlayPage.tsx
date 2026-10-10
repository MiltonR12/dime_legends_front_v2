import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { deskSocket } from "@/broadcast/socket";
import { fillDesk, type DeskState, type HeroCard, type OverlayId } from "@/broadcast/types";
import { getDeskApi, getHeroesApi } from "@/app/api/broadcast/broadcastApi";
import { DraftScreen } from "./DraftScreen";
import { MarcadorScreen } from "./MarcadorScreen";
import { PresentacionScreen } from "./PresentacionScreen";
import { ResultadoScreen } from "./ResultadoScreen";

const SCREENS: readonly OverlayId[] = [
  "draft",
  "presentacion",
  "marcador",
  "resultado",
];

const isOverlay = (value: string | undefined): value is OverlayId =>
  SCREENS.some((screen) => screen === value);

function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-transparent">
      <div style={{ width: 1920, height: 1080, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

function ObsOverlayPage() {
  const { id, screen } = useParams();
  const kind = isOverlay(screen) ? screen : null;
  const [state, setState] = useState<DeskState | null>(null);
  const [missing, setMissing] = useState(false);
  const [heroes, setHeroes] = useState<HeroCard[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const mount = document.getElementById("root");
    const previous = document.body.style.background;
    const previousMount = mount?.style.background ?? "";
    root.style.background = "transparent";
    document.body.style.background = "transparent";
    if (mount) mount.style.background = "transparent";
    return () => {
      root.style.background = "";
      document.body.style.background = previous;
      if (mount) mount.style.background = previousMount;
    };
  }, []);

  useEffect(() => {
    if (!id || !kind) return;
    let alive = true;
    getHeroesApi()
      .then((rows) => {
        if (alive) setHeroes(rows);
      })
      .catch(() => undefined);
    getDeskApi(id)
      .then((desk) => {
        if (alive) setState(fillDesk(desk));
      })
      .catch(() => {
        if (alive) setMissing(true);
      });
    const socket = deskSocket();
    socket.connect();
    socket.emit("desk:join", { tournamentId: id });
    socket.on("desk:state", (desk: DeskState) => {
      setState(fillDesk(desk));
      setMissing(false);
    });
    return () => {
      alive = false;
      socket.disconnect();
    };
  }, [id, kind]);

  const heroMap = useMemo(
    () => new Map(heroes.map((hero) => [hero.slug, hero])),
    [heroes],
  );

  if (!kind) {
    return (
      <main className="grid h-screen place-items-center text-white">
        Pantalla desconocida
      </main>
    );
  }
  if (missing && !state) {
    return (
      <main className="grid h-screen place-items-center bg-transparent text-white">
        La mesa todavía no está abierta
      </main>
    );
  }
  if (!state) return null;

  return (
    <Stage>
      {kind === "presentacion" && (
        <PresentacionScreen state={state} heroes={heroMap} />
      )}
      {kind === "draft" && <DraftScreen state={state} heroes={heroMap} />}
      {kind === "marcador" && <MarcadorScreen state={state} />}
      {kind === "resultado" && (
        <ResultadoScreen state={state} heroes={heroMap} />
      )}
    </Stage>
  );
}

export default ObsOverlayPage;
