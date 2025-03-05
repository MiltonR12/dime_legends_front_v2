import { FaEye } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FaCopy } from "react-icons/fa";
import { Button } from "../ui/button";
import { CustomToast } from "@/lib/handleToast";

type Props = {
  captain: string
  players: string[]
}

function ShowTeamModal({ captain, players }: Props) {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    CustomToast.info("Copiado al portapapeles")
  }

  return (
    <Dialog>
      <DialogTrigger>
        <FaEye className="text-lg cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-oscuro" >
        <DialogHeader>
          <DialogTitle className="text-center mb-5" >
            Informacion del equipo
          </DialogTitle>
          <DialogDescription>
            Aqui puedes ver la informacion del equipo.
          </DialogDescription>
          <p>Captain: {captain}</p>
          <div>
            <h3 className="text-primary text-lg font-semibold" >
              Jugadores
            </h3>

            {
              players.map((player, index) => (
                <div key={index} className="flex justify-between items-center" >
                  <p>Player: {player}</p>
                  <Button onClick={() => copyToClipboard(player)} >
                    <FaCopy/>
                  </Button>
                </div>
              ))
            }
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ShowTeamModal