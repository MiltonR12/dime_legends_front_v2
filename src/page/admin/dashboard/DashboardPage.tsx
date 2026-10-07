import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  Plus,
  BarChart3,
  Target,
  Zap,
} from "lucide-react"
import { Link } from "react-router-dom"
import CardTag from "./components/CardTag"

const dashboardData = {
  stats: {
    totalTournaments: 24,
    totalParticipants: 1847,
    totalRevenue: 15420,
    activeTournaments: 6,
    completedTournaments: 18,
    avgParticipants: 77,
  },
  recentTournaments: [
    {
      id: "1",
      name: "Legends Championship",
      game: "Mobile Legends",
      participants: 128,
      status: "active",
      startDate: "2024-01-15",
      prize: 5000,
    },
    {
      id: "2",
      name: "Storm Warriors Cup",
      game: "Mobile Legends",
      participants: 64,
      status: "upcoming",
      startDate: "2024-01-20",
      prize: 3000,
    },
    {
      id: "3",
      name: "Epic Battle Royale",
      game: "Free Fire",
      participants: 96,
      status: "completed",
      startDate: "2024-01-10",
      prize: 2500,
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Legends Championship - Semifinales",
      date: "2024-01-16",
      time: "20:00",
      type: "match",
    },
    {
      id: "2",
      title: "Storm Warriors Cup - Inscripciones cierran",
      date: "2024-01-18",
      time: "23:59",
      type: "deadline",
    },
    {
      id: "3",
      title: "Epic Masters - Inicio del torneo",
      date: "2024-01-22",
      time: "18:00",
      type: "start",
    },
  ],
  notifications: [
    {
      id: "1",
      message: "5 nuevas inscripciones en Legends Championship",
      type: "info",
      time: "Hace 2 horas",
    },
    {
      id: "2",
      message: "Storm Warriors Cup alcanzó 50% de capacidad",
      type: "success",
      time: "Hace 4 horas",
    },
    {
      id: "3",
      message: "Revisar bracket de Epic Battle Royale",
      type: "warning",
      time: "Hace 1 día",
    },
  ],
}

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Dashboard</h1>
          <p className="mt-1 text-sm text-admin-muted">Gestión de competencias y eventos</p>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            variant="outline"
            className="border-admin-border bg-transparent text-admin-muted hover:bg-admin-surface hover:text-admin-text"
          >
            <Link to="/reportes">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Reportes
            </Link>
          </Button>
          <Button
            asChild
            className="bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover"
          >
            <Link to="/admin/torneo/create">
              <Plus className="h-4 w-4 mr-2" />
              Crear Torneo
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardTag 
          title="Total Torneos"
          value={dashboardData.stats.totalTournaments}
          icon={<Trophy className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Participantes"
          value={dashboardData.stats.totalParticipants}
          icon={<Users className="h-4 w-4 text-admin-muted" />}
        />
        <CardTag
          title="Ingresos Totales"
          value={dashboardData.stats.totalRevenue}
          icon={<DollarSign className="h-4 w-4 text-green-400" />}
        />

        <CardTag
          title="Torneos Activos"
          value={dashboardData.stats.activeTournaments}
          icon={<Zap className="h-4 w-4 text-indigo-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tournaments */}
        <div className="lg:col-span-2">
          <Card className="border-admin-border bg-admin-surface shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-admin-text">Listado</CardTitle>
                  <CardDescription className="text-admin-muted">Torneos recientes</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-admin-border text-admin-muted hover:bg-admin-input hover:text-admin-text"
                >
                  Ver todos
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-admin-muted">
                    <tr className="border-b border-admin-border">
                      <th className="px-6 py-3 font-medium">Nombre</th>
                      <th className="px-4 py-3 font-medium">Juego</th>
                      <th className="px-4 py-3 font-medium">Cupos</th>
                      <th className="px-4 py-3 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentTournaments.map((tournament, index) => (
                      <tr
                        key={tournament.id}
                        className={index === 0 ? "bg-admin-row text-admin-text" : "text-admin-text"}
                      >
                        <td className="px-6 py-3">{tournament.name}</td>
                        <td className="px-4 py-3">{tournament.game}</td>
                        <td className="px-4 py-3">{tournament.participants}</td>
                        <td className={`px-4 py-3 ${index === 0 ? "text-admin-accent" : "text-admin-muted"}`}>
                          {tournament.status === "active"
                            ? "Activo"
                            : tournament.status === "upcoming"
                              ? "Próximo"
                              : "Cerrado"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="border-admin-border bg-admin-surface shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-admin-text">
                <Calendar className="h-5 w-5 text-admin-muted" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-admin-input">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${event.type === "match" ? "bg-green-400" : event.type === "deadline" ? "bg-red-400" : "bg-blue-400"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-admin-text">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-admin-muted" />
                      <span className="text-xs text-admin-muted">
                        {event.date} - {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-admin-border bg-admin-surface shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-admin-text">
                <AlertCircle className="h-5 w-5 text-admin-muted" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-admin-input">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${notification.type === "info"
                        ? "bg-blue-400"
                        : notification.type === "success"
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-admin-text">{notification.message}</p>
                    <span className="text-xs text-admin-muted">{notification.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-admin-border bg-admin-surface shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-admin-text">
                <Target className="h-5 w-5 text-admin-muted" />
                Estadísticas Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-admin-muted">Promedio de participantes</span>
                  <span className="font-medium text-admin-text">{dashboardData.stats.avgParticipants}</span>
                </div>
                <Progress value={77} className="h-2 bg-admin-input" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-admin-muted">Tasa de finalización</span>
                  <span className="font-medium text-admin-text">94%</span>
                </div>
                <Progress value={94} className="h-2 bg-admin-input" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-admin-muted">Satisfacción promedio</span>
                  <span className="flex items-center gap-1 font-medium text-admin-text">
                    4.8 <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </span>
                </div>
                <Progress value={96} className="h-2 bg-admin-input" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
