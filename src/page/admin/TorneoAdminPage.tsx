import { getTeamByTournamentThunk } from "@/app/redux/team/teamSlice"
import { RootState, useAppDispatch } from "@/app/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate, useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TableTeam from "@/components/admin/TableTeam"
import TableHorario from "@/components/admin/TableHorario"
import { getBattlesThunk } from "@/app/redux/battle/battleSlice"
import { Button } from "@/components/ui/button"

function TorneoAdminPage() {

  const { id } = useParams()
  const { myTournaments } = useSelector((state: RootState) => state.tournament)
  const currentTournament = myTournaments.find(tournament => tournament._id === id)
  const { teams, isLoading } = useSelector((state: RootState) => state.team)
  const { battles } = useSelector((state: RootState) => state.battle)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getTeamByTournamentThunk(id))
      dispatch(getBattlesThunk(id))
    }
  }, [dispatch, id])

  if (!currentTournament) {
    return <Navigate to='/admin' />
  }

  return (
    <section className="p-5 grid grid-rows-[auto_1fr] h-[calc(100vh-200px)]" >
      <div className="flex justify-between items-center p-3 pb-8 rounded-xl" >
        <h3 className="text-3xl capitalize font-bold text-white" >
          {currentTournament.name}
        </h3>
        <Button asChild variant="rose" >
          <Link to='/torneo/create' >
            Crear Nuevo Torneo
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="teams">
        <TabsList className="bg-fondo" >
          <TabsTrigger value="teams">Administrar Equipos</TabsTrigger>
          <TabsTrigger value="gameDate">Administrar Horarios</TabsTrigger>
        </TabsList>
        <TabsContent value="teams" className="h-full" >
          {isLoading ? <p>Cargando...</p> : id && <TableTeam id={id} data={teams} />}
        </TabsContent>
        <TabsContent value="gameDate">
          <TableHorario data={battles} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default TorneoAdminPage