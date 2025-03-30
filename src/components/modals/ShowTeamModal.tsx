"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaCopy, FaEye } from "react-icons/fa"
import { Team } from "@/app/redux/team/team"
import { CustomToast } from "@/lib/handleToast"

interface Props {
  team: Team | null
}

function ShowTeamModal({ team }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    CustomToast.info("Copiado al portapapeles")
  }

  const getInitials = (name: string) => {
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
  }

  const displayTeam = team || defaultTeam

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-950">
        <DialogHeader>
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={displayTeam.image || undefined} alt={displayTeam.name} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {getInitials(displayTeam.name)}
            </AvatarFallback>
          </Avatar>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            {displayTeam.name || "Equipo sin nombre"}
          </DialogTitle>
          <DialogDescription className="text-center">Información del equipo</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[50px_1fr_30px] items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium text-muted-foreground">
              Capitán
            </label>
            <input
              type="text"
              id="name"
              value={displayTeam.captain || "No asignado"}
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(displayTeam.captain)}
              className="h-8 w-8"
            >
              <FaCopy className="text-muted-foreground hover:text-primary" />
            </Button>
          </div>
          <div className="grid grid-cols-[50px_1fr_30px] items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium text-muted-foreground">
              Teléfono
            </label>
            <input
              type="text"
              id="username"
              value={displayTeam.phone || "No proporcionado"}
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div>
              {displayTeam.phone && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(displayTeam.phone)}
                  className="h-8 w-8"
                >
                  <FaCopy className="text-muted-foreground hover:text-primary" />
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-[50px_1fr] items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium text-muted-foreground">
              Jugadores
            </label>
            {displayTeam.players && displayTeam.players.length > 0 ? (
              <div className="space-y-2 pl-2">
                {displayTeam.players.map((player, index) => (
                  <div className="flex items-center justify-between gap-3" key={index}>
                    <p key={index}>{player}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(player)}
                      className="h-8 w-8"
                    >
                      <FaCopy className="text-muted-foreground hover:text-primary" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pl-6">No hay jugadores asignados</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShowTeamModal

