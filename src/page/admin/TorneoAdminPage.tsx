import { deleteTournamentThunk, getTournamentIdThunk } from "@/app/redux/tournament/tournamentSlice"
import { RootState, useAppDispatch } from "@/app/store"
import { Button } from "@/components/ui/button"
import Image from "@/components/ui/Image"
import { useEffect } from "react"
import { FaCamera } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ListaGamesImage } from '@/payments/games'
import { AlertDialogTrigger } from "@/components/alert-dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function TorneoAdminPage() {

  const { id } = useParams()
  const { tournament } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()



  useEffect(() => {
    if (id) dispatch(getTournamentIdThunk(id))
  }, [dispatch, id])

  if (!tournament) return null

  const handleDelete = () => {
    dispatch(deleteTournamentThunk(tournament._id))
  }

  const game = ListaGamesImage.find(game => game.name === tournament.game)

  return (
    <section className="overflow-y-scroll grid grid-rows-[auto_1fr] h-full" >

      <div className="relative">
        <div className="absolute inset-0 bg-purple-950/80 z-10 opacity-50"></div>
        <img src={tournament.image} className="w-full -z-10 h-[500px] object-cover bg-top backdrop-blur-lg" />
        <Button className="absolute bottom-4 right-4 z-20 rounded-full w-16 h-16" variant="secondary" >
          <FaCamera className="w-full h-full" />
        </Button>
      </div>

      <div className="max-w-5xl flex flex-col gap-5 mx-auto py-8" >

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-opacity-90 rounded-lg shadow-lg">
            <div className="flex justify-between items-center" >
              <h1 className="text-5xl uppercase pb-8 font-bold">{tournament.name}</h1>
              <p className="text-xl text-slate-400">
                Fecha de inicio: {new Date(tournament.dateStart).toLocaleString("es", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </div>
            <p className="text-slate-400 text-xl">{tournament.description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3" >
          <h3 className="text-slate-100 text-2xl font-medium" >
            Juego del torneo
          </h3>
          <div className="flex gap-5 items-center" >
            <Image src={game?.image} className="w-14 h-14" />
            <h4 className="text-slate-400 text-2xl" >{tournament.game}</h4>
          </div>
        </div>

        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" >
                Editar torneo
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-950 max-w-md md:rounded-3xl border-none" >
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-xl" >
                  ¿Estas seguro de eliminar el torneo?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-lg" >
                  Esta acción no se puede deshacer y se eliminará permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="grid grid-cols-2 gap-5" >
                <AlertDialogCancel className="bg-slate-900 text-white" >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction className="text-white bg-red-600" onClick={handleDelete} >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>

      </div>

    </section>
  )
}

export default TorneoAdminPage