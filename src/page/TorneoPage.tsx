import { getBattlesThunk } from "@/app/redux/battle/battleSlice"
import { getTeamByTournamentThunk } from "@/app/redux/team/teamSlice"
import { getListTournamentThunk, getTournamentIdThunk } from "@/app/redux/tournament/tournamentSlice"
import { RootState, useAppDispatch } from "@/app/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Card from "@/components/card/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ListaGamesImage } from "@/payments/games"
import CardTeam from "@/components/card/CardTeam"
import CardBattle from "@/components/card/CardBattle"
import CardTorneo from "@/components/card/CardTorneo"

function TorneoPage() {

  const { tournament, listTournaments } = useSelector((state: RootState) => state.tournament)
  const { teams } = useSelector((state: RootState) => state.team)
  const { battles } = useSelector((state: RootState) => state.battle)
  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListTournamentThunk())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(getTournamentIdThunk(id))
      dispatch(getTeamByTournamentThunk(id))
      dispatch(getBattlesThunk(id))
    }
  }, [id, dispatch])

  if (!id) {
    return <Navigate to="/torneos" />
  }

  if (!tournament) {
    return <h1>404 Not Found</h1>
  }

  const date = new Date(tournament.dateStart)
  const game = ListaGamesImage.find((game) => game.name === tournament.game)

  return (
    <main className="pt-20 2xl:pt-24 pb-10 bg-violetPrimary" >

      <div className="grid lg:grid-cols-2 container mx-auto gap-5 lg:gap-20 px-5 lg:p-10" >
        <section>
          <Dialog>
            <DialogTrigger className="h-full rounded-2xl overflow-hidden" >
              <img
                src={tournament.image}
                alt={tournament.name}
                className="h-full object-cover object-left-top "
              />
            </DialogTrigger>
            <DialogContent className="p-0 w-auto max-w-5xl border-rosePrimary" >
              <DialogHeader className="hidden" >
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div>
                <img src={tournament.image} alt={tournament.name} />
              </div>
            </DialogContent>
          </Dialog>

        </section>
        <section className="flex flex-col gap-5" >
          <h3 className="text-white text-5xl text-center font-semibold capitalize" >
            {tournament.name}
          </h3>
          
          <div dangerouslySetInnerHTML={{ __html: tournament.description }} className="text-white/80 text-lg" />
          <h3 className="text-white text-3xl font-medium" >
            Premios
          </h3>
          <ul className="flex flex-col gap-2" >
            {tournament.award.map((req, index) => (
              <li key={index} className="flex items-center gap-2 text-white/80" >
                <div className="w-3 h-3 rounded-full bg-white/50" /> {req}
              </li>
            ))}
          </ul>
          <h3 className="text-white text-3xl font-medium" >
            Reglas
          </h3>
          <ul className="flex flex-col gap-2" >
            {tournament.rules.map((req, index) => (
              <li key={index} className="flex items-center gap-2 text-white/80" >
                <div className="w-3 h-3 rounded-full bg-white/50" /> {req}
              </li>
            ))}
          </ul>
          <div className="grid sm:grid-cols-2 gap-10" >
            <Card className="grid grid-cols-[1fr_auto_1fr] text-center border-2" >
              <div>
                <h4 className="text-xl uppercase" >{date.toLocaleString('default', { month: 'long' })}</h4>
                <p className="text-3xl font-bold" >{date.getDate()}</p>
              </div>
              <div className="bg-white/50 h-full w-[.5px] mx-8" ></div>
              <div>
                <h4 className="text-xl uppercase" >Hora</h4>
                <p className="text-3xl font-bold" >{date.toLocaleTimeString("es", {
                  hour: "numeric",
                  minute: "2-digit",
                })}</p>
              </div>
            </Card>
            <Card className="flex items-center gap-5 border-2" >
              <Avatar>
                <AvatarImage src={game?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl" >JUEGO</h4>
                <p className="text-lg font-bold" >{tournament.game}</p>
              </div>
            </Card>
          </div>
          <Button variant="rose" asChild className="text-lg md:text-2xl md:py-4 h-auto rounded-3xl" >
            <Link to={`/torneo/team/create/${tournament._id}`} >
              {tournament.payment ? `Inscribirme por ${tournament.payment.amount} Bs` : "Inscribite Gratis"}
            </Link>
          </Button>
        </section>
      </div>

      <section className="py-10 flex flex-col gap-10 section_funtiona" >

        <div className="container" >
          <h3 className="text-xl md:text-3xl font-semibold text-white pb-10" >
            EQUIPOS INSCRITOS
          </h3>
          <div className="px-8 md:px-16" >
            <Carousel>
              <CarouselContent>
                {teams.map((team, index) => (
                  <CarouselItem key={index} className="basis sm:basis-1/3 lg:basis-1/4" >
                    <CardTeam team={team} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent" />
              <CarouselNext className="bg-transparent" />
            </Carousel>
          </div>
        </div>

        <div className="md:container px-3 md:px-5" >
          <h3 className="text-xl md:text-3xl font-semibold text-white pb-10" >
            HORARIOS DE JUEGO
          </h3>
          <ul>
            {battles.map(({ _id, date, teamOne, teamTwo }) => (
              <CardBattle key={_id} date={date} teamA={teamOne} teamB={teamTwo} />
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="container px-5" >
          <h3 className="text-xl md:text-3xl font-semibold text-white pb-10" >
            TORNEOS RELACIONADOS
          </h3>
          <div className="grid sm:grid-cols-2 gap-10" >
            {listTournaments.slice(0, 2).map((torneo) => (
              <CardTorneo key={torneo._id} torneo={torneo} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default TorneoPage