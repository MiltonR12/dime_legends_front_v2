import { Tournament } from "@/app/redux/tournament/tournament"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

type Props = {
  torneo: Tournament
}

function CardTorneo({ torneo }: Props) {

  return (
    <div className="bg-fondo flex flex-col gap-5 p-5 rounded-2xl border-secondary 
      border-4 w-96 hover:scale-105 transition ease-in-out duration-500 select-none" >
      <h3 className="text-3xl font-bold text-secondary mb-5 line-clamp-1 text-center" >
        {torneo.name}
      </h3>
      <div>
        <img src={torneo.image} alt="" className="object-cover object-center w-full h-[200px]" />
      </div>
      <div>
        <h3 className="text-secondary font-semibold" >
          Descripción:
        </h3>
        <p className="text-info line-clamp-3" >
          {torneo.description}
        </p>
      </div>
      <div>
        <div className="flex justify-between" >
          <h3 className="text-secondary font-semibold" >
            Fecha de inicio:
          </h3>
          <p className="text-info" >
            {new Date(torneo.dateStart).toLocaleDateString("es", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>
        <div className="flex justify-between" >
          <h3 className="text-secondary font-semibold" >
            Juego
          </h3>
          <p className="text-info" >
            {torneo.game}
          </p>
        </div>
      </div>
      <Button asChild variant="orange" size="lg" className="font-semibold text-2xl" >
        <Link to={`/torneo/${torneo._id}`} >
          Ver torneo
        </Link>
      </Button>
    </div>
  )
}

export default CardTorneo