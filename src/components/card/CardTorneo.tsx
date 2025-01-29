import { ListTournament } from "@/app/redux/tournament/tournament"
import { ListaGamesImage } from "@/payments/games"
import { Link } from "react-router-dom"

type Props = {
  torneo: ListTournament
}

function CardTorneo({ torneo }: Props) {

  const date = new Date(torneo.dateStart)
  const game = ListaGamesImage.find(game => game.name === torneo.game)

  return (
    <article className="rounded-2xl max-w-3xl overflow-hidden shadow-lg" >
      <div className="relative" >
        <img src={torneo.image} alt={torneo.name} className="w-full h-[180px] md:h-[250px] object-cover" />
        <div className="absolute right-2 bottom-2 p-1 bg-rosePrimary rounded-full" >
          <img src={game?.image} alt={game?.name} className="w-20 h-20 rounded-full object-cover" />
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 bg-[#2B0C52]" >

        <div className="px-3 py-2 border-2 border-white/60 rounded-2xl md:rounded-3xl" >
          <div className="flex flex-col text-center items-center " >
            <p className="md:text-2xl font-mono uppercase px-2" >
              {date.toLocaleString('es-ES', { month: 'short' })}
            </p>
            <span className="text-2xl md:text-3xl font-bold" >{date.getDate()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full" >
          <h3 className="text-white capitalize text-xl line-clamp-1 md:text-2xl" >{torneo.name}</h3>
          <div className="flex justify-between text-white/60" >
            <p className="text-sm md:text-base" >{torneo.teamsCount}/50 Equipos</p>
            <p className="text-sm md:text-base" >Plataforma - {torneo.game}</p>
          </div>
          <div className="flex justify-between items-center pt-2 text-white/60" >
            {torneo.payment ?
              <p className="text-xl" >Costo - <span className="text-white" >{torneo.payment.account}</span> Bs</p> : <p className="text-white text-xl" >Gratis</p>}
            <Link to={`/torneo/${torneo._id}`} className="bg-[#AA1EF1] py-2 px-4 rounded-2xl text-white" >
              Registrarse Ahora
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CardTorneo