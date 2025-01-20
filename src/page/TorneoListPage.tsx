import { getListTournamentThunk } from "@/app/redux/tournament/tournamentSlice"
import { RootState, useAppDispatch } from "@/app/store"
import CardTorneo from "@/components/card/CardTorneo"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import torneos_fondo from '@/assets/imgs/fondo/torneos.jpg'

function TorneoListPage() {

  const { listTournaments } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListTournamentThunk())
  }, [dispatch])

  return (
    <main className="pt-20 min-h-screen bg-[#1D023E] pb-20" >

      <div className="flex items-center justify-center relative h-96" >
        <img src={torneos_fondo} alt="torneos" className="max-h-[400px] w-full absolute object-cover" />
        <h2 className="text-white text-7xl font-semibold z-10" >
          TORNEOS
        </h2>
      </div>

      <div className="container" >

        <h2 className="text-white py-8 text-4xl md:text-4xl font-medium" >
          LISTA DE TORNEOS
        </h2>

        <div className="flex gap-5 flex-wrap" >
          {listTournaments.map((torneo) => (
            <CardTorneo key={torneo._id} torneo={torneo} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default TorneoListPage