import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CustomToast } from "@/lib/handleToast"
import type { Team } from "@/app/redux/team/team"
import { Eye, Copy, Check, User, Phone, Users, X, Shield } from "lucide-react"

interface Props {
  team: Team | null
  trigger?: React.ReactNode
}

function ShowTeamModal({ team, trigger }: Props) {

  const [isOpen, setIsOpen] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    CustomToast.info("Copiado al portapapeles")
    setCopiedField(field)
  }

  const getInitials = (name: string) => {
    if (!name) return ""
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const defaultTeam = {
    name: "Equipo de ejemplo",
    captain: "Juan Pérez",
    phone: "123-456-7890",
    players: ["Carlos Rodríguez", "Ana Martínez", "Miguel López"],
    image: null,
    _id: "default-id",
    status: "active",
  }

  const displayTeam = team || defaultTeam

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-purple-400 hover:text-white hover:bg-purple-900/50"
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border border-slate-700 p-0 max-w-2xl">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-900 to-slate-800 p-6 pb-24 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 h-8 w-8 rounded-full text-slate-300 hover:text-white hover:bg-slate-700/50"
            >
              <X className="h-4 w-4" />
            </Button>

            <DialogTitle className="text-xl font-bold text-white text-center">
              Información del Equipo
            </DialogTitle>
            <DialogDescription className="hidden" >hola</DialogDescription>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-24 z-10">
            <Avatar className="h-24 w-24 border-4 border-slate-900 shadow-xl">
              <AvatarImage src={displayTeam.image || undefined} alt={displayTeam.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-700 to-pink-700 text-white">
                {getInitials(displayTeam.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-1">{displayTeam.name}</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">Capitán</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(displayTeam.captain, "captain")}
                    className="h-8 text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    {copiedField === "captain" ? (
                      <Check className="h-4 w-4 mr-1 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copiedField === "captain" ? "Copiado" : "Copiar"}
                  </Button>
                </div>
                <p className="text-white font-medium mt-1 pl-7">{displayTeam.captain || "No asignado"}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">Teléfono</span>
                  </div>
                  {displayTeam.phone && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(displayTeam.phone, "phone")}
                      className="h-8 text-slate-300 hover:text-white hover:bg-slate-700"
                    >
                      {copiedField === "phone" ? (
                        <Check className="h-4 w-4 mr-1 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      {copiedField === "phone" ? "Copiado" : "Copiar"}
                    </Button>
                  )}
                </div>
                <p className="text-white font-medium mt-1 pl-7">{displayTeam.phone || "No proporcionado"}</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-medium text-slate-300">Jugadores</span>
                </div>

                {displayTeam.players && displayTeam.players.length > 0 ? (
                  <div className="space-y-2 pl-1">
                    {displayTeam.players.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-slate-700/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-300" />
                          <span className="text-white">{player}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(player, `player-${index}`)}
                          className="h-7 w-7 text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          {copiedField === `player-${index}` ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4 text-slate-400">
                    <p>No hay jugadores asignados</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShowTeamModal
