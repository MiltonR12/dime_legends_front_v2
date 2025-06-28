import { getListTournamentThunk } from "@/app/redux/tournament/tournamentSlice"
import { type RootState, useAppDispatch } from "@/app/store"
import CardTorneo from "@/components/card/CardTorneo"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import torneos_fondo from "@/assets/imgs/fondo/torneos.jpg"
import CardTorneoSkeleton from "@/components/skeleton/CardTorneoSkeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Search, Filter, Calendar, Gamepad2, Flame } from "lucide-react"

function TorneoListPage() {
  const { listTournaments, isLoading } = useSelector((state: RootState) => state.tournament)
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [gameFilter, setGameFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    dispatch(getListTournamentThunk())
  }, [dispatch])

  // Filter tournaments based on search and filters
  const filteredTournaments = listTournaments.filter((tournament) => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGame = gameFilter === "all" || tournament.game === gameFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "free" && !tournament.payment) ||
      (statusFilter === "paid" && tournament.payment)

    return matchesSearch && matchesGame && matchesStatus
  })

  const uniqueGames = [...new Set(listTournaments.map((t) => t.game))]

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-black pb-10">
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/40 to-black z-10"></div>
        <img src={torneos_fondo} alt="torneos" className="w-full h-full absolute object-cover" />

        <div className="relative z-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-lg">
              Gaming Platform
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
            TORNEOS
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto">
            Únete a la competencia más emocionante y demuestra tus habilidades
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-4 relative z-30">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-700/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Filtros y Búsqueda</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input
                placeholder="Buscar torneos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-purple-700/50 text-white placeholder:text-purple-300"
              />
            </div>

            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger className="bg-slate-900/50 border-purple-700/50 text-white">
                <Gamepad2 className="h-4 w-4 mr-2 text-purple-400" />
                <SelectValue placeholder="Todos los juegos" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-purple-700">
                <SelectItem value="all" className="text-white">
                  Todos los juegos
                </SelectItem>
                {uniqueGames.map((game) => (
                  <SelectItem key={game} value={game} className="text-white">
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-900/50 border-purple-700/50 text-white">
                <Trophy className="h-4 w-4 mr-2 text-purple-400" />
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-purple-700">
                <SelectItem value="all" className="text-white">
                  Todos
                </SelectItem>
                <SelectItem value="active" className="text-white">
                  Activos
                </SelectItem>
                <SelectItem value="free" className="text-white">
                  Gratuitos
                </SelectItem>
                <SelectItem value="paid" className="text-white">
                  De pago
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearchTerm("")
                setGameFilter("all")
                setStatusFilter("all")
              }}
              variant="outline"
              className="border-purple-700 text-purple-300 hover:bg-purple-900/30"
            >
              Limpiar filtros
            </Button>
          </div>
        </div>

        {/* Tournament List Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Lista de Torneos</h2>
              <p className="text-purple-300">
                {filteredTournaments.length} torneo{filteredTournaments.length !== 1 ? "s" : ""} encontrado
                {filteredTournaments.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
            <Flame className="h-4 w-4 mr-2" />
            ¡Nuevos torneos cada semana!
          </Badge>
        </div>

        {/* Tournament Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <CardTorneoSkeleton key={i} />)
          ) : filteredTournaments.length > 0 ? (
            filteredTournaments.map((torneo) => <CardTorneo key={torneo._id} torneo={torneo} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No se encontraron torneos</h3>
              <p className="text-purple-300 mb-6">Intenta ajustar tus filtros de búsqueda</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setGameFilter("all")
                  setStatusFilter("all")
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Ver todos los torneos
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default TorneoListPage
