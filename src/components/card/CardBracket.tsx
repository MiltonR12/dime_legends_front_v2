import { motion } from "framer-motion"
import { winnerBattleThunk } from "@/app/redux/battle/battleSlice"
import { useAppDispatch } from "@/app/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Crown, Users, Check, Calendar, Clock, LandPlot } from "lucide-react"

type Team = {
  id: string
  name?: string
  image?: string | null
  winner: boolean
}

type Props = {
  id: string
  position: number
  teamOne: Team
  teamTwo: Team
  date?: string
}

function CardBracket({ position, teamOne, teamTwo, id, date }: Props) {

  const dispatch = useAppDispatch()

  const winnerBattle = (winner: string | null) => {
    dispatch(winnerBattleThunk({ id, winner }))
  }

  const getTeamInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleString("es", { weekday: "short", day: "numeric", month: "short" }),
      time: date.toLocaleString("es", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const dateInfo = date ? formatDate(date) : null

  return (
    <TooltipProvider>
      <div className="text-white select-none w-96 mx-2 py-2 flex items-center rounded-lg">
        <div className="p-2 w-full max-w-80 mx-auto">

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                className={`flex items-center justify-between p-2 rounded border transition-all duration-200 ${teamOne.winner
                  ? "bg-green-900/30 border-green-500/50"
                  : "bg-slate-800/30 border-slate-700/50 hover:border-purple-500/50"
                  }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="relative">
                    <Avatar className="h-6 w-6 border border-purple-500/50">
                      <AvatarImage src={teamOne.image || "/placeholder.svg"} alt={teamOne.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-700 to-pink-700 text-white text-xs">
                        {teamOne.name ? getTeamInitials(teamOne.name) : <Users className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                    {teamOne.winner && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <Crown className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium truncate">{teamOne.name || "TBD"}</span>
                </div>


                <Button
                  onClick={() => winnerBattle(!teamOne.winner ? teamOne.id : null)}
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 rounded-full border transition-all duration-200 ${teamOne.winner
                    ? "bg-green-500 border-green-400 text-white hover:bg-green-600"
                    : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:border-purple-400"
                    }`}
                >
                  {teamOne.winner ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-slate-900 border-purple-700">
              <div className="text-sm">
                <p className="font-medium text-white">{teamOne.name || "Equipo por definir"}</p>
                <p className="text-purple-300">Equipo 1</p>
                {teamOne.winner && (
                  <p className="text-green-400 flex items-center gap-1 mt-1">
                    <Crown className="h-3 w-3" /> Ganador
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                className={`flex items-center justify-between p-2 rounded border transition-all duration-200 ${teamTwo.winner
                  ? "bg-green-900/30 border-green-500/50"
                  : "bg-slate-800/30 border-slate-700/50 hover:border-purple-500/50"
                  }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="relative">
                    <Avatar className="h-6 w-6 border border-purple-500/50">
                      <AvatarImage src={teamTwo.image || "/placeholder.svg"} alt={teamTwo.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-700 to-pink-700 text-white text-xs">
                        {teamTwo.name ? getTeamInitials(teamTwo.name) : <Users className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                    {teamTwo.winner && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <Crown className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium truncate">{teamTwo.name || "TBD"}</span>
                </div>

                <Button
                  onClick={() => winnerBattle(!teamTwo.winner ? teamTwo.id : null)}
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 rounded-full border transition-all duration-200 ${teamTwo.winner
                    ? "bg-green-500 border-green-400 text-white hover:bg-green-600"
                    : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:border-purple-400"
                    }`}
                >
                  {teamTwo.winner ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-slate-900 border-purple-700">
              <div className="text-sm">
                <p className="font-medium text-white">{teamTwo.name || "Equipo por definir"}</p>
                <p className="text-purple-300">Equipo 2</p>
                {teamTwo.winner && (
                  <p className="text-green-400 flex items-center gap-1 mt-1">
                    <Crown className="h-3 w-3" /> Ganador
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>

          {dateInfo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-slate-800/50 px-3 py-1 border-t border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 text-purple-300">
                    <LandPlot className="h-3 w-3" />
                    <span className="text-xs font-medium">{position + 1}º</span>
                    <div className="w-10" >

                    </div>
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs font-medium">{dateInfo.day}</span>
                    <Clock className="h-3 w-3 ml-1" />
                    <span className="text-xs font-medium">{dateInfo.time}</span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 border-purple-700">
                <div>
                  <div>
                    <h3 className="bg-slate-900 p-2 text-2xl text-center font-semibold">
                      Nº {position + 1}
                    </h3>
                  </div>
                  <p className="font-medium text-xl text-white">Fecha del enfrentamiento</p>
                  <p className="text-purple-300 text-lg">{new Date(date || "").toLocaleTimeString("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    weekday: "long",
                  })}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

export default CardBracket