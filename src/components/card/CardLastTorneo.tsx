type Props = {
  title: string
  description: string
  date: Date
  image: string
  game: string
}

function CardLastTorneo({ date, description, image, title, game }: Props) {

  return (
    <article className="w-full max-w-[550px] rounded-2xl overflow-hidden shadow-lg" >
      <div className="relative" >
        <img src={image} alt={title} className="w-full h-[250px] object-cover" />
      </div>
      <div className="flex items-center gap-5 p-3 bg-[#2B0C52]" >

        <div className="p-3 border-2 border-white/60 rounded-3xl" >
          <div className="flex flex-col text-center items-center" >
            <p className="text-xl xl:text-2xl uppercase" >{date.toLocaleString('es-ES', { month: 'long' })}</p>
            <span className="text-3xl xl:text-4xl font-bold" >{date.getDate()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full" >
          <h3 className="text-white capitalize text-2xl" >{title}</h3>
          <div className="flex justify-between text-white/60" >
            <p className="text-sm xl:text-base" >30/50 Equipos</p>
            <p className="text-sm xl:text-base" >Plataforma - {game}</p>
          </div>
          <div className="flex justify-between items-center pt-2 text-white/60" >
            <p className="text-sm xl:text-base" >{description}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CardLastTorneo