import { IconType } from "react-icons"
import Card from "./Card"

type Props = {
  title: string
  subtitle: string
  description: string
  icon: IconType
}

function CardInfo({ title, subtitle, description, icon: Icon }: Props) {
  return (
    <Card className="border-gradient bg-transparent rounded-3xl p-[2px]" >
      <div className="flex flex-col items-center bg-[#18082e] h-full rounded-3xl py-14 px-8" >
        <Icon className="text-6xl text-white pb-3" />
        <div className="pb-2 text-center" >
          <h2 className="text-3xl font-bold text-[#FF00C8]">{title}</h2>
          <h3 className="text-xl font-semibold uppercase text-[#42D1F5]">{subtitle}</h3>
        </div>
        <p className="text-white max-w-52 text-center">{description}</p>
      </div>
    </Card>
  )
}

export default CardInfo