import type { Team } from "@/app/redux/team/team"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Users, Crown } from "lucide-react"

type Props = {
  teamA: Team | null
  teamB: Team | null
  date: string
  round?: number
  group?: string
  status?: "upcoming" | "live" | "finished"
  winner?: string | null
}

function CardBattle({ teamA, teamB, date, round = 1, group = "A", winner = null }: Props) {

  const battleDate = new Date(date)

  const getTeamInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Card className="bg-transparent border border-purple-800/50 backdrop-blur-sm overflow-hidden hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-purple-500 text-purple-300 text-xs"
            >
              Ronda {round}
            </Badge>
            <Badge
              variant="outline"
              className={cn("border-purple-500 text-purple-300 text-xs",
                group === "A" ? "bg-green-500 text-white" : "bg-yellow-400 text-white"
              )}
            >
              Grupo {group}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            <div className="flex flex-col md:flex-row items-center gap-4" >
              <div className="relative">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-purple-600 shadow-lg">
                  <AvatarImage src={teamA?.image || "/placeholder.svg"} alt={teamA?.name || "Team A"} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-700 to-pink-700 text-white text-lg font-bold">
                    {teamA ? getTeamInitials(teamA.name) : "?"}
                  </AvatarFallback>
                </Avatar>

                {winner === teamA?._id && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                    <Crown className="h-6 w-6 text-yellow-900" />
                  </div>
                )}
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2">
                  {teamA?.name || "Equipo por definir"}
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-2 text-purple-300">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{teamA?.players?.length || 0} jugadores</span>
                </div>
                {teamA?.captain && <p className="text-xs text-purple-400 mt-1">Cap: {teamA.captain}</p>}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-4 py-6 md:py-0">
              <div className="relative" >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50" />
                <div className="relative bg-gradient-to-r from-purple-700 to-pink-700 rounded-full p-4 border-2 border-purple-500">
                  <span className="text-lg md:text-xl font-black text-white">VS</span>
                </div>
              </div>

              <div className="mt-4 flex gap-5 items-center text-center">
                <div className="flex items-center justify-center gap-1 text-purple-300">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {battleDate.toLocaleDateString("es", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 text-purple-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {battleDate.toLocaleTimeString("es", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center gap-4"  >
              <div className="text-center md:text-right flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2">
                  {teamB?.name || "Equipo por definir"}
                </h3>
                <div className="flex items-center justify-center md:justify-end gap-2 text-purple-300">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{teamB?.players?.length || 0} jugadores</span>
                </div>
                {teamB?.captain && <p className="text-xs text-purple-400 mt-1">Cap: {teamB.captain}</p>}
              </div>

              <div className="relative">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-purple-600 shadow-lg">
                  <AvatarImage src={teamB?.image || "/placeholder.svg"} alt={teamB?.name || "Team B"} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-700 to-pink-700 text-white text-lg font-bold">
                    {teamB ? getTeamInitials(teamB.name) : "?"}
                  </AvatarFallback>
                </Avatar>

                {winner === teamB?._id && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                    <Crown className="h-6 w-6 text-yellow-900" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
      </CardContent>
    </Card>
  )
}

export default CardBattle
