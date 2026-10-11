import { Link } from "react-router-dom"
import { Calendar, Clock, Plus, Trophy, Users, Zap } from "lucide-react"
import { useTournamentSummary } from "@/hooks/tournament"
import { formatDate } from "@/lib/date"
import type { SummaryTournament, TournamentSummary } from "@/app/api/tournament/tournament.types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CardTag from "./CardTag"

const PHASE: Record<SummaryTournament["phase"], string> = {
  inscription: "Inscripción",
  running: "En curso",
  finished: "Finalizado",
}

function OrganizerSummary({ summary }: { summary: TournamentSummary }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Dashboard</h1>
          <p className="mt-1 text-sm text-admin-muted">Tus torneos</p>
        </div>
        <Button asChild className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover">
          <Link to="/admin/torneo/create">
            <Plus className="mr-2 h-4 w-4" />
            Crear Torneo
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CardTag title="Torneos" value={summary.tournaments} icon={<Trophy className="h-4 w-4 text-admin-muted" />} />
        <CardTag title="En inscripción" value={summary.inscription} icon={<Users className="h-4 w-4 text-admin-muted" />} />
        <CardTag title="En curso" value={summary.running} icon={<Zap className="h-4 w-4 text-indigo-400" />} />
        <CardTag title="Equipos aceptados" value={summary.acceptedTeams} icon={<Users className="h-4 w-4 text-admin-muted" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-admin-border bg-admin-surface shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-admin-text">Tus torneos</CardTitle>
            <CardDescription className="text-admin-muted">
              {summary.list.length === 0 ? "Todavía no tienes torneos." : "Ordenados por fecha"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {summary.list.length === 0 ? (
              <p className="px-6 pb-6 text-sm text-admin-muted">
                <Link to="/admin/torneo/create" className="text-admin-accent hover:underline">
                  Crea el primero
                </Link>
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-admin-muted">
                    <tr className="border-b border-admin-border">
                      <th className="px-6 py-3 font-medium">Nombre</th>
                      <th className="px-4 py-3 font-medium">Juego</th>
                      <th className="px-4 py-3 font-medium">Fase</th>
                      <th className="px-4 py-3 font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.list.map((item) => (
                      <tr key={item._id} className="border-b border-admin-border text-admin-text last:border-0">
                        <td className="px-6 py-3">
                          <Link to={`/admin/torneo/${item._id}`} className="font-medium hover:text-admin-accent">
                            {item.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3">{item.game}</td>
                        <td className="px-4 py-3">{PHASE[item.phase]}</td>
                        <td className="px-4 py-3 text-admin-muted">{formatDate(item.dateStart, "short")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-admin-border bg-admin-surface shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-admin-text">
                <Clock className="h-5 w-5 text-admin-muted" />
                Por validar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {summary.pending.length === 0 ? (
                <p className="text-sm text-admin-muted">No hay inscripciones por validar.</p>
              ) : (
                summary.pending.map((item) => (
                  <Link
                    key={`${item.tournamentId}-${item.teamId}`}
                    to={`/admin/torneo/equipos/${item.tournamentId}`}
                    className="block rounded-lg bg-admin-input p-3 hover:text-admin-accent"
                  >
                    <p className="text-sm font-medium text-admin-text">{item.team}</p>
                    <p className="mt-1 text-xs text-admin-muted">{item.tournament}</p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-admin-border bg-admin-surface shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-admin-text">
                <Calendar className="h-5 w-5 text-admin-muted" />
                Próximas fechas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {summary.upcoming.length === 0 ? (
                <p className="text-sm text-admin-muted">No hay torneos por delante.</p>
              ) : (
                summary.upcoming.map((item) => (
                  <Link
                    key={item._id}
                    to={`/admin/torneo/${item._id}`}
                    className="block rounded-lg bg-admin-input p-3"
                  >
                    <p className="truncate text-sm font-medium text-admin-text">{item.name}</p>
                    <p className="mt-1 text-xs text-admin-muted">
                      {formatDate(item.dateStart, "short")} · {PHASE[item.phase]}
                    </p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function OrganizerDashboard() {
  const { data, isLoading, isError } = useTournamentSummary()

  if (isLoading) return <p className="text-sm text-admin-muted">Cargando...</p>
  if (isError || !data) return <p className="text-sm text-admin-muted">No se pudo cargar el resumen.</p>

  return <OrganizerSummary summary={data} />
}

export default OrganizerDashboard
