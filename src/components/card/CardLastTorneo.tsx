import Card from './Card'

type Props = {
  title: string
  description: string
  date: string
  image: string
}

function CardLastTorneo({ date, description, image, title }: Props) {
  return (
    <Card className='max-w-max border-l-4 border-primary' >
      <div className='flex gap-5 ' >
        <img src={image} alt="" className='w-48 h-48 object-cover object-left' />
        <div>
          <h3 className='text-4xl mb-3 font-bold' >
            {title}
          </h3>
          <p className='text-lg text-zinc-200' >
            {description}
          </p>
          <p className='text-lg text-zinc-200' >
            {date}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default CardLastTorneo