import { getTournamentThunk } from "@/app/redux/tournament/tournamentSlice"
import { RootState, useAppDispatch } from "@/app/store"
import CardTorneo from "@/components/card/CardTorneo"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { TfiCup } from "react-icons/tfi";

function TorneoListPage() {

  const { tournaments } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTournamentThunk())
  }, [dispatch])

  return (
    <main className="pt-20 min-h-screen" >
      <div className="container" >
        <div className="flex items-center gap-5 justify-center mb-10" >
          <TfiCup className="text-white text-6xl" />
          <h2 className="text-secondary text-center text-4xl font-semibold" >
            Lista de torneos
          </h2>
          <TfiCup className="text-white text-6xl" />
        </div>

        <div className="flex flex-shrink-0" >
          {tournaments.map((torneo) => (
            <CardTorneo key={torneo._id} torneo={torneo} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default TorneoListPage