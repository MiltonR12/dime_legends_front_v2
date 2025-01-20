
type Props = {
  image: string
  name: string
  description: string
}

function CardCreator({ image, name, description }: Props) {
  return (
    <article className="flex flex-col items-center justify-center gap-3" >
      <img src={image} alt="" className="rounded-full object-cover w-28 h-28 mx-auto" />
      <h4 className="text-white font-semibold text-xl" >{name}</h4>
      <p className="text-white/60 text-center leading-5 max-w-64" >{description}</p>
    </article>
  )
}

export default CardCreator