import { getListTournamentThunk } from "@/app/redux/tournament/tournamentSlice"
import { RootState, useAppDispatch } from "@/app/store"
import CardTorneo from "@/components/card/CardTorneo"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import torneos_fondo from '@/assets/imgs/fondo/torneos.jpg'
import CardTorneoSkeleton from "@/components/skeleton/CardTorneoSkeleton"

function TorneoListPage() {

  const { listTournaments, isLoading } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListTournamentThunk())
  }, [dispatch])

  return (
    <main className="min-h-screen bg-[#1D023E] pb-10" >

      <div className="flex items-center justify-center relative h-[40vh] sm:h-[50vh] md:h-[70vh]" >
        <img src={torneos_fondo} alt="torneos" className="w-full h-full absolute object-cover" />
        <h2 className="text-white text-7xl font-semibold z-10" >
          TORNEOS
        </h2>
      </div>

      <div className="px-3 md:px-5 max-w-[1800px] mx-auto" >

        <h2 className="text-white py-4 md:py-8 text-2xl md:text-4xl font-medium" >
          LISTA DE TORNEOS
        </h2>

        <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(450px,1fr))] gap-10" >
          {isLoading ?
            Array.from({ length: 6 }).map((_, i) => <CardTorneoSkeleton key={i} />)
            : listTournaments.map((torneo) => <CardTorneo key={torneo._id} torneo={torneo} />)}
        </div>
      </div>
    </main>
  )
}

export default TorneoListPage