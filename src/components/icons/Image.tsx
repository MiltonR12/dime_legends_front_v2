import { cn } from "@/lib/utils"
import { RiTeamFill } from "react-icons/ri"

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  src?: string | null
  alt: string
}

export const ImageTable = ({ src, className, ...props }: Props) => {
  if (!src) return <RiTeamFill className="w-10 h-10 text-white" />
  return <img src={src} className={cn("w-10 h-10 rounded-full", className)} {...props} />
}