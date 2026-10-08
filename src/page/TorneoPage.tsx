import type { TBattle } from "@/app/api/battle/battle.types";
import type { Team } from "@/app/api/team/team.types";
import type { ListTournament } from "@/app/api/tournament/tournament.types";
import { useBattles } from "@/hooks/battle";
import { useTeamsByTournament } from "@/hooks/team";
import { useTournament, useTournaments } from "@/hooks/tournament";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ListaGamesImage } from "@/payments/games";
import { bannerUrls } from "@/components/input/BannerGallery";
import Image from "@/components/ui/Image";
import { usePageTitle } from "@/lib/pageTitle";
import { cleanHtml } from "@/lib/sanitize";
import { formatDate } from "@/lib/date";
import CardTeam from "@/components/card/CardTeam";
import CardBattle from "@/components/card/CardBattle";
import CardTorneo from "@/components/card/CardTorneo";
import {
  CalendarDays,
  Clock,
  Trophy,
  Shield,
  Users,
  Gamepad2,
  Flame,
  ChevronRight,
} from "lucide-react";
import { CircleIcon } from "@/components/icons/globals";
import { listPosition } from "@/payments/position";
import LoadingTournament from "@/components/loader/LoadingTournament";
import BracketCanvas from "@/components/bracket/BracketCanvas";

const NO_TOURNAMENTS: ListTournament[] = [];
const NO_TEAMS: Team[] = [];
const NO_BATTLES: TBattle[] = [];

function HeroBanner({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-800 via-purple-950 to-black"
      >
        <Trophy className="h-20 w-20 text-purple-400/30" aria-hidden="true" />
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

function TorneoPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const {
    data: tournament,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useTournament(id);
  usePageTitle(tournament?.name);
  const { data: listTournaments = NO_TOURNAMENTS } = useTournaments();
  const { data: teams = NO_TEAMS } = useTeamsByTournament(id);
  const { data: battles = NO_BATTLES } = useBattles(id);
  const joinTo = isAuthenticated
    ? `/torneo/team/create/${id}`
    : `/login?next=${encodeURIComponent(`/torneo/team/create/${id}`)}`;
  const registrationEnd = tournament?.config?.registrationEnd;
  const open =
    (tournament?.phase ?? "inscription") === "inscription" &&
    (!registrationEnd || new Date(registrationEnd).getTime() >= Date.now());

  if (isLoading) return <LoadingTournament />;

  const missing = axios.isAxiosError(error) && error.response?.status === 404;

  if (!tournament && error && !missing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
        <div role="alert" className="text-center px-4">
          <h1 className="text-2xl font-bold text-white mb-2">
            No se pudo cargar el torneo
          </h1>
          <p className="text-purple-300">
            Revisa tu conexión e intenta de nuevo.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              {isRefetching ? "Reintentando..." : "Reintentar"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/torneos">Volver a Torneos</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-purple-300">Torneo no encontrado</p>
          <Button variant="default" className="mt-6" asChild>
            <Link to="/torneos">Volver a Torneos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const date = new Date(tournament.dateStart);
  const game = ListaGamesImage.find((game) => game.name === tournament.game);
  const banners = bannerUrls(tournament);
  const cover = banners[0] || "/placeholder.svg";

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 to-black pt-16 pb-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-black z-10"></div>
        <div className="h-[40vh] md:h-[50vh] overflow-hidden">
          {banners.length > 1 ? (
            <Carousel opts={{ loop: true }} className="h-full">
              <CarouselContent className="ml-0 h-[40vh] md:h-[50vh]">
                {banners.map((src, index) => (
                  <CarouselItem key={`${src}-${index}`} className="h-full pl-0">
                    <HeroBanner src={src} alt={tournament.name} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 border-none bg-black/40 text-white hover:bg-black/60" />
              <CarouselNext className="right-4 border-none bg-black/40 text-white hover:bg-black/60" />
            </Carousel>
          ) : (
            <HeroBanner src={banners[0]} alt={tournament.name} />
          )}
        </div>

        <div className="container mx-auto px-4 relative z-20 -mt-20">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Dialog>
              <DialogTrigger asChild>
                <div className="rounded-lg overflow-hidden border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] cursor-pointer transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={cover}
                    alt={tournament.name}
                    className="w-32 h-32 md:w-40 md:h-40 object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="p-0 w-auto max-w-5xl border-purple-500">
                <DialogHeader className="hidden">
                  <DialogTitle>Vista previa</DialogTitle>
                </DialogHeader>
                <div>
                  <img
                    src={cover}
                    alt={tournament.name}
                    className="w-full h-auto"
                  />
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {game ? (
                  <img
                    src={game.image}
                    alt={tournament.game}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-800"
                    aria-hidden="true"
                  >
                    <Gamepad2 className="h-4 w-4 text-purple-200" />
                  </span>
                )}
                <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1">
                  {tournament.game}
                </Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1">
                  {teams.length} Equipos
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                {tournament.name}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center gap-2 text-purple-300">
                  <CalendarDays className="h-5 w-5 text-purple-400" />
                  <span>{formatDate(date, "short", "day")}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <span>
                    {date.toLocaleTimeString("es", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Gamepad2 className="h-5 w-5 text-purple-400" />
                  <span>{tournament.game}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Trophy className="h-5 w-5 text-purple-400" />
                  <span>
                    {tournament.payment
                      ? `${tournament.payment.amount} Bs`
                      : "Gratis"}
                  </span>
                </div>
              </div>
            </div>

            {open ? (
              <Button
                variant="default"
                asChild
                className="text-lg py-6 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_15px_rgba(168,85,247,0.5)] border-none transition-all duration-300 hover:scale-105 animate-pulse"
              >
                <Link to={joinTo}>
                  {tournament.payment ? (
                    <span className="flex items-center gap-2">
                      <Flame className="h-5 w-5" /> Inscribirme por{" "}
                      {tournament.payment.amount} Bs
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Flame className="h-5 w-5" /> Inscribirme Gratis
                    </span>
                  )}
                </Link>
              </Button>
            ) : (
              <p className="text-lg text-purple-200">
                {tournament.phase === "finished"
                  ? "Torneo finalizado"
                  : "Inscripciones cerradas"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 mt-10">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-8 flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl bg-purple-900/30 p-1 md:grid md:grid-cols-5">
            <TabsTrigger
              value="info"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Información
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Equipos
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Horarios
            </TabsTrigger>
            <TabsTrigger
              value="bracket"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Bracket
            </TabsTrigger>
            <TabsTrigger
              value="related"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
            >
              Relacionados
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="info"
            className="space-y-8 gap-5 animate-in fade-in-50 duration-300"
          >
            <div className="md:grid space-y-8 md:space-y-0 md:grid-cols-3 gap-5">
              <div className="bg-purple-900/20 col-span-2 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-700">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Descripción</h3>
                </div>
                <Separator className="my-4 bg-purple-700/30" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(tournament.description),
                  }}
                  className="text-purple-200 max-w-none midium overflow-x-hidden"
                />
              </div>

              <div className="flex flex-col gap-8">
                <div className="bg-purple-900/20 w-full p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-700">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Premios</h3>
                  </div>
                  <Separator className="my-4 bg-purple-700/30" />
                  <ul className="space-y-3">
                    {tournament.award.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-purple-200"
                      >
                        <CircleIcon />
                        <p className="text-lg font-bold flex justify-between items-baseline gap-4 w-full">
                          <span className="shrink-0 text-purple-400">
                            {listPosition[index]}
                          </span>
                          <span className="text-right">{req}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-900/20 w-full p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-700">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Organizador
                    </h3>
                  </div>
                  <Separator className="my-4 bg-purple-700/30" />
                  <div className="flex items-center gap-3">
                    <Image
                      src={tournament.createdBy.avatar}
                      alt={tournament.createdBy.firstName}
                      className="h-12 w-12"
                      noImage={tournament.createdBy.firstName
                        .charAt(0)
                        .toUpperCase()}
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {tournament.createdBy.firstName +
                          " " +
                          tournament.createdBy.lastName}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-700">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Reglas</h3>
              </div>
              <Separator className="my-4 bg-purple-700/30" />
              <ul className="space-y-3">
                {tournament.rules.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-purple-200"
                  >
                    <div className="mt-1 min-w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent
            value="teams"
            className="animate-in fade-in-50 duration-300"
          >
            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-700">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Equipos Inscritos
                  </h3>
                </div>
                <Badge className="bg-purple-600 text-white">
                  {teams.length} Equipos
                </Badge>
              </div>

              {teams.length > 0 ? (
                <div className="px-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {teams.map((team, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2"
                        >
                          <CardTeam team={team} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-purple-800/50 hover:bg-purple-700 text-white border-none" />
                    <CarouselNext className="bg-purple-800/50 hover:bg-purple-700 text-white border-none" />
                  </Carousel>
                </div>
              ) : (
                <div className="text-center py-10 text-purple-300">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Aún no hay equipos inscritos</p>
                  <Button
                    variant="default"
                    asChild
                    className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Link to={joinTo}>Sé el primero en inscribirte</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="schedule"
            className="animate-in fade-in-50 duration-300"
          >
            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-700">
                  <CalendarDays className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Horarios de Juego
                </h3>
              </div>

              {battles.length > 0 ? (
                <ul className="space-y-4">
                  {battles.map(
                    ({ _id, date, teamOne, teamTwo, winner, round, group }) => (
                      <CardBattle
                        key={_id}
                        date={date}
                        teamA={teamOne}
                        teamB={teamTwo}
                        winner={winner}
                        round={round}
                        group={group}
                      />
                    ),
                  )}
                </ul>
              ) : (
                <div className="text-center py-10 text-purple-300">
                  <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    Los horarios de juego aún no están disponibles
                  </p>
                  <p className="text-sm mt-2">
                    Vuelve pronto para ver las actualizaciones
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="bracket"
            className="animate-in fade-in-50 duration-300"
          >
            <div className="admin-theme h-[70vh] min-h-[420px] overflow-hidden rounded-xl border border-purple-800/50">
              <BracketCanvas tournamentId={tournament._id} readOnly />
            </div>
          </TabsContent>

          <TabsContent
            value="related"
            className="animate-in fade-in-50 duration-300"
          >
            <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-700">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Torneos Relacionados
                  </h3>
                </div>
                <Button
                  variant="link"
                  asChild
                  className="text-purple-300 hover:text-white"
                >
                  <Link to="/torneos" className="flex items-center gap-1">
                    Ver todos <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {listTournaments.length > 0 ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                  {listTournaments.slice(0, 4).map((torneo) => (
                    <CardTorneo key={torneo._id} torneo={torneo} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-purple-300">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    No hay torneos relacionados disponibles
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default TorneoPage;
