import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Trophy,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  Plus,
  Eye,
  BarChart3,
  Gamepad2,
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
    <div className="space-y-6 px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Dashboard
          </h1>
          <p className="text-purple-300 mt-1">Gestiona tus torneos y revisa el rendimiento</p>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            variant="outline"
            className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30 hover:text-white"
          >
            <Link to="/reportes">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Reportes
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
          >
            <Link to="/torneo/create">
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
          icon={<Trophy className="h-4 w-4 text-purple-400" />}
        />
        <CardTag
          title="Participantes"
          value={dashboardData.stats.totalParticipants}
          icon={<Users className="h-4 w-4 text-pink-400" />}
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
          <Card className="bg-gradient-to-br from-purple-950 to-black border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-400" />
                    Torneos Recientes
                  </CardTitle>
                  <CardDescription className="text-purple-300">Gestiona tus torneos más recientes</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30"
                >
                  Ver todos
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData.recentTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="flex items-center justify-between p-4 bg-purple-900/20 rounded-lg border border-purple-800/30 hover:bg-purple-900/30 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{tournament.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-purple-300">{tournament.game}</span>
                        <Separator orientation="vertical" className="h-3 bg-purple-700" />
                        <span className="text-sm text-purple-300">{tournament.participants} participantes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">${tournament.prize}</div>
                      <Badge
                        variant={
                          tournament.status === "active"
                            ? "default"
                            : tournament.status === "upcoming"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          tournament.status === "active"
                            ? "bg-green-600/20 text-green-400 border-green-600/50"
                            : tournament.status === "upcoming"
                              ? "bg-blue-600/20 text-blue-400 border-blue-600/50"
                              : "bg-gray-600/20 text-gray-400 border-gray-600/50"
                        }
                      >
                        {tournament.status === "active"
                          ? "Activo"
                          : tournament.status === "upcoming"
                            ? "Próximo"
                            : "Completado"}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="bg-gradient-to-br from-purple-950 to-black border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${event.type === "match" ? "bg-green-400" : event.type === "deadline" ? "bg-red-400" : "bg-blue-400"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-purple-400" />
                      <span className="text-xs text-purple-300">
                        {event.date} - {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-gradient-to-br from-purple-950 to-black border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-purple-400" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${notification.type === "info"
                        ? "bg-blue-400"
                        : notification.type === "success"
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{notification.message}</p>
                    <span className="text-xs text-purple-400">{notification.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-purple-950 to-black border-purple-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                Estadísticas Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-300">Promedio de participantes</span>
                  <span className="text-white font-medium">{dashboardData.stats.avgParticipants}</span>
                </div>
                <Progress value={77} className="h-2 bg-purple-900/30" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-300">Tasa de finalización</span>
                  <span className="text-white font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2 bg-purple-900/30" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-300">Satisfacción promedio</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    4.8 <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </span>
                </div>
                <Progress value={96} className="h-2 bg-purple-900/30" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
