import { cn } from "@/lib/utils"

type Props = {
  icon: JSX.Element
  title: string
  description: string
  className?: string
}

function CardFormat({ icon, title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center", className)} >
      <div className="bg-[#810EBA] rounded-full p-5" >
        {icon}
      </div>
      <h3 className='text-2xl text-center font-semibold my-3' >
        {title}
      </h3>
      <p className='text-center max-w-64 text-lg leading-5 text-white/80' >
        {description}
      </p>
    </div>
  )
}

export default CardFormat