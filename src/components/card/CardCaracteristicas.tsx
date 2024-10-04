type Props = {
  title: string
  description: string
  children: React.ReactNode
}

function CardCaracteristicas({ description, children, title }: Props) {
  return (
    <article
      className="p-10 rounded-2xl bg-blue-950/25 text-center flex flex-col items-center gap-5
      hover:scale-105 hover:bg-blue-950/50 transition-all duration-300 ease-in-out"
    >
      <div>
        {children}
      </div>
      <h3 className="text-2xl font-semibold" >{title}</h3>
      <p className="text-blue-100/55" >{description}</p>
    </article>
  )
}

export default CardCaracteristicas