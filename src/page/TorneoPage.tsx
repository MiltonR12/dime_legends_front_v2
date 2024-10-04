import { getBattlesThunk } from "@/app/redux/battle/battleSlice"
import { getTeamByTournamentThunk } from "@/app/redux/team/teamSlice"
import { getTournamentIdThunk } from "@/app/redux/tournament/tournamentSlice"
import { RootState, useAppDispatch } from "@/app/store"
import CardShowBattle from "@/components/card/CardShowBattle"
import CardShowTorneo from "@/components/card/CardShowTorneo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { transformBrackets } from "@/payments/brackets"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { Bracket } from 'react-brackets'

function TorneoPage() {

  const { tournament, loading } = useSelector((state: RootState) => state.tournament)
  const { teams } = useSelector((state: RootState) => state.team)
  const { battles } = useSelector((state: RootState) => state.battle)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const brackets = transformBrackets(battles)

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

  return (
    <main className="pt-24" >
      {loading ? <p>Cargando...</p> :
        <Tabs defaultValue="principal" className="container mx-auto" >
          <TabsList className="bg-secondary" >
            <TabsTrigger className="bg-oscuro" value="principal">
              Principal
            </TabsTrigger>
            <TabsTrigger className="bg-oscuro " value="battle">
              Batallas / Equipos
            </TabsTrigger>
            <TabsTrigger className="bg-oscuro" value="brackets">
              Brackets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="principal">
            {tournament && <CardShowTorneo torneo={tournament} />}
          </TabsContent>
          <TabsContent value="battle">
            <CardShowBattle battles={battles} teams={teams} />
          </TabsContent>
          <TabsContent value="brackets">
            <Bracket rounds={brackets} />
          </TabsContent>
        </Tabs>
      }
    </main>
  )
}

export default TorneoPage