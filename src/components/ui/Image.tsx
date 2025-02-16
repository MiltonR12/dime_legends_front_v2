import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { IconType } from "react-icons"

type Props = {
  src?: string | null
  className?: string
  alt?: string
  noImage?: string | IconType
}

function Image({ src, className, noImage: NoImagen = "CN", alt }: Props) {

  if (src === null) {
    return <Avatar className={cn("w-10 h-10", className)} >
      <AvatarFallback>
        {typeof NoImagen === 'string' ? NoImagen : <NoImagen className="text-gray-400 text-xl" />}
      </AvatarFallback>
    </Avatar>
  }

  return (
    <Avatar className={cn("w-10 h-10", className)} >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        {typeof NoImagen === 'string' ? NoImagen : <NoImagen className="text-gray-400 text-xl" />}
      </AvatarFallback>
    </Avatar>
  )
}

export default Image