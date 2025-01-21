import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface Props extends React.HTMLProps<HTMLImageElement> {
  src?: string
}

function Imagen({ src, className, ...args }: Props) {
  return (
    <Avatar className={className} >
      <AvatarImage src={src} {...args} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default Imagen