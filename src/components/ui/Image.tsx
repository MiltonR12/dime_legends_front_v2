import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Props = {
  src?: string | null
  className?: string
}

function Image({ src, className }: Props) {

  if (src === null) {
    return <Avatar className={cn("w-10 h-10", className)} >
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  }

  return (
    <Avatar className={cn("w-10 h-10", className)} >
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default Image