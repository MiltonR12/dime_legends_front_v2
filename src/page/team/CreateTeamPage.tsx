import { Navigate, useParams } from "react-router-dom"
import CreateTeamForm from "@/components/form/CreateTeamForm"
import Card from "@/components/card/Card"
import wanwan from "@/assets/imgs/personajes/wanwan_skin.png"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { RootState, useAppDispatch } from "@/app/store"
import { getTournamentIdThunk } from "@/app/redux/tournament/tournamentSlice"

function CreateTeamPage() {

  const { id } = useParams()
  const { tournament } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getTournamentIdThunk(id))
    }
  }, [id, dispatch])

  if (!id) {
    return <Navigate to="/torneos" />
  }

  if (!tournament) {
    return <h1>404 Not Found</h1>
  }

  return (
    <main className="pt-24 pb-10 min-h-screen flex items-center overflow-hidden justify-center section_funtiona relative" >
      <Card className="bg-transparent w-full  border-none z-10" >
        <h1 className="text-white font-semibold mb-5 text-3xl text-center" >
          Registrar equipo
        </h1>
        {id && <CreateTeamForm id={id} torneo={tournament} />}
      </Card>
      <img src={wanwan} alt="wanwan" className="absolute bottom-0 -right-[500px] z-0 h-full opacity-90" />
    </main>
  )
}

export default CreateTeamPage