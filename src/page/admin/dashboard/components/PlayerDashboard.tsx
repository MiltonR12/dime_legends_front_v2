import { Link } from "react-router-dom"
import { useMyTeams } from "@/hooks/team"
import type { OwnedTeam } from "@/app/api/team/team.types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const STATUS: Record<string, string> = {
  pending: "Pendiente",
  active: "Aceptado",
  inactive: "Retirado",
}

const NO_TEAMS: OwnedTeam[] = []

function PlayerDashboard() {
  const { data: teams = NO_TEAMS, isLoading, isError } = useMyTeams()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Dashboard</h1>
          <p className="mt-1 text-sm text-admin-muted">Tus equipos</p>
        </div>
        <Button asChild className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover">
          <Link to="/admin/organizador">Pedir página de organizador</Link>
        </Button>
      </div>

      {isLoading ? <p className="text-sm text-admin-muted">Cargando...</p> : null}
      {isError ? <p className="text-sm text-admin-muted">No se pudieron cargar tus equipos.</p> : null}

      {!isLoading && !isError && teams.length === 0 ? (
        <Card className="border-admin-border bg-admin-surface shadow-none">
          <CardContent className="py-8">
            <p className="text-sm text-admin-muted">Todavía no tienes equipos.</p>
            <Link to="/torneos" className="mt-3 inline-block text-sm text-admin-accent hover:underline">
              Ver torneos
            </Link>
          </CardContent>
        </Card>
      ) : null}

      {!isLoading && !isError && teams.length > 0 ? (
        <div className="grid gap-4">
          {teams.map((team) => (
            <Card key={team._id} className="border-admin-border bg-admin-surface shadow-none">
              <CardHeader>
                <CardTitle className="text-admin-text">{team.name}</CardTitle>
                <CardDescription className="text-admin-muted">Capitán: {team.captain}</CardDescription>
              </CardHeader>
              <CardContent>
                {(team.inscriptions ?? []).length === 0 ? (
                  <p className="text-sm text-admin-muted">Sin inscripciones.</p>
                ) : (
                  <ul className="space-y-2">
                    {team.inscriptions?.map((row) => (
                      <li key={row.tournament._id} className="flex items-center justify-between gap-3 text-sm">
                        <Link to={`/torneo/${row.tournament._id}`} className="text-admin-text hover:text-admin-accent">
                          {row.tournament.name}
                        </Link>
                        <span className="text-admin-muted">{STATUS[row.status] ?? row.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default PlayerDashboard
