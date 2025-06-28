import type { ListTournament } from "@/app/redux/tournament/tournament"
import { ListaGamesImage } from "@/payments/games"
import { Link } from "react-router-dom"
import Image from "../ui/Image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Gamepad2, Clock, Star, Flame, Zap, ArrowRight } from "lucide-react"

type Props = {
  torneo: ListTournament
}

function CardTorneo({ torneo }: Props) {

  const date = new Date(torneo.dateStart)
  const game = ListaGamesImage.find((game) => game.name === torneo.game)

  const today = new Date()
  const daysUntil = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const isUpcoming = daysUntil > 0
  const isToday = daysUntil === 0

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-sm border border-purple-700/30 shadow-[0_8px_32px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] transition-all duration-500">

      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={torneo.image || "/placeholder.svg"}
          alt={torneo.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-lg">
            <Gamepad2 className="h-3 w-3 mr-1" />
            {torneo.game}
          </Badge>
        </div>

        <div className="absolute top-4 right-4">
          {isToday ? (
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-none shadow-lg animate-pulse">
              <Flame className="h-3 w-3 mr-1" />
              ¡HOY!
            </Badge>
          ) : isUpcoming ? (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none shadow-lg">
              <Clock className="h-3 w-3 mr-1" />
              {daysUntil} día{daysUntil !== 1 ? "s" : ""}
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-none shadow-lg">
              Finalizado
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="p-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
            <Image
              src={game?.image || "/placeholder.svg"}
              alt={game?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Date and Title */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <div className="text-center">
              <p className="text-xs font-medium text-purple-300 uppercase tracking-wide">
                {date.toLocaleString("es-ES", { month: "short" })}
              </p>
              <p className="text-xl font-bold text-white">{date.getDate()}</p>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
              {torneo.name}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                {date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-700/30">
            <Users className="h-4 w-4 text-blue-400" />
            <div>
              <p className="text-sm text-blue-300">Equipos</p>
              <p className="font-bold text-white">{torneo.teamsCount || 0}/50</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-700/30">
            <Trophy className="h-4 w-4 text-green-400" />
            <div>
              <p className="text-sm text-green-300">Premio</p>
              <p className="font-bold text-white">{torneo.payment ? `${torneo.payment.account} Bs` : "Gratis"}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <Link to={`/torneo/${torneo._id}`} className="flex items-center justify-center gap-2">
              <Star className="h-4 w-4" />
              <span>Inscribirse</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-purple-300 pt-2 border-t border-purple-800/30">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>Plataforma: {torneo.game}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CardTorneo
