import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Gamepad2, Trophy } from "lucide-react";
import { usePublicPage } from "@/hooks/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/Image";
import { usePageTitle } from "@/lib/pageTitle";
import { formatDate } from "@/lib/date";
import type { PublicPage } from "@/app/api/page/pageApi";

const PHASE_LABEL: Record<string, string> = {
  inscription: "Inscripción",
  running: "En curso",
  finished: "Finalizado",
};

const platformLabel = (platform: string) =>
  platform.charAt(0).toUpperCase() + platform.slice(1);

const safeUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.href;
  } catch {
    return null;
  }
};

function Cover({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-800 via-purple-950 to-black"
      >
        <Trophy className="h-12 w-12 text-purple-400/40" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-center"
    />
  );
}

function TournamentCard({
  item,
}: {
  item: PublicPage["tournaments"][number];
}) {
  return (
    <Link
      to={`/torneo/${item._id}`}
      className="group overflow-hidden rounded-xl border border-purple-800/50 bg-purple-900/20 transition hover:border-pink-500/50 hover:bg-purple-900/40"
    >
      <div className="h-36 overflow-hidden">
        <Cover src={item.image} alt={item.name} />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-purple-600 text-white hover:bg-purple-600">
            <Gamepad2 className="mr-1 h-3 w-3" />
            {item.game}
          </Badge>
          <Badge className="bg-pink-600 text-white hover:bg-pink-600">
            {PHASE_LABEL[item.phase ?? "inscription"]}
          </Badge>
        </div>
        <h3 className="line-clamp-2 text-lg font-bold text-white group-hover:text-pink-300">
          {item.name}
        </h3>
        <p className="flex items-center gap-2 text-sm text-purple-300">
          <CalendarDays className="h-4 w-4 text-purple-400" />
          {formatDate(item.dateStart, "large")}
        </p>
      </div>
    </Link>
  );
}

function OrganizerPublicPage() {
  const { id } = useParams();
  const { data: page, isLoading, isError } = usePublicPage(id);
  usePageTitle(page?.name);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-4 py-24 text-center text-purple-300">
        Cargando página...
      </main>
    );
  }

  if (isError || !page) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
        <h1 className="text-3xl font-bold text-white">
          Organizador no encontrado
        </h1>
        <Button
          asChild
          className="mt-6 bg-purple-600 text-white hover:bg-purple-700"
        >
          <Link to="/torneos">Ver torneos</Link>
        </Button>
      </main>
    );
  }

  const links = page.socialLinks.flatMap((item) => {
    const href = safeUrl(item.url);
    return href ? [{ ...item, href }] : [];
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 to-black pb-16 pt-16 text-white">
      <div className="relative h-56 overflow-hidden md:h-72">
        <Cover src={page.banner} alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-black" />
      </div>

      <div className="container relative z-10 mx-auto -mt-16 px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Image
            src={page.image}
            alt={page.name}
            noImage={page.name.slice(0, 2).toUpperCase()}
            className="h-28 w-28 border-4 border-purple-950 shadow-[0_0_15px_rgba(168,85,247,0.45)]"
          />
          <div className="pb-1">
            <p className="text-sm font-medium uppercase tracking-wide text-pink-300">
              Organizador
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">{page.name}</h1>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <section className="rounded-xl border border-purple-800/50 bg-purple-900/20 p-6 backdrop-blur-sm lg:col-span-2">
            <h2 className="text-2xl font-bold">Descripción</h2>
            <p className="mt-4 whitespace-pre-line text-purple-200">
              {page.description?.trim() ||
                "Este organizador todavía no escribió una descripción."}
            </p>
            {links.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {links.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-purple-700 px-3 py-1 text-sm text-purple-200 hover:border-pink-400 hover:text-white"
                    >
                      {platformLabel(item.platform)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          <aside className="rounded-xl border border-purple-800/50 bg-purple-900/20 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-700 p-2">
                <Trophy className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Torneos</h2>
            </div>
            <p className="mt-4 text-4xl font-bold text-white">
              {page.tournaments.length}
            </p>
            <p className="text-purple-300">
              {page.tournaments.length === 1
                ? "torneo publicado"
                : "torneos publicados"}
            </p>
          </aside>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Sus torneos</h2>
          {page.tournaments.length === 0 ? (
            <p className="rounded-xl border border-purple-800/50 bg-purple-900/20 p-6 text-purple-300">
              Todavía no tiene torneos publicados.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.tournaments.map((item) => (
                <TournamentCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default OrganizerPublicPage;
