import register from '@/assets/svg/home/register.svg'
import { cn } from '@/lib/utils'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { MdSystemSecurityUpdateGood } from 'react-icons/md'
import { BiMedal } from "react-icons/bi";
import { RiLuggageDepositFill } from 'react-icons/ri'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> { }
interface PropsIcon extends IconProps { }

export const RegisterIcon = ({ className, ...rest }: Props) => {
  return <img src={register} alt="register" className={cn("w-12", className)} {...rest} />
}

export const BankDepositIcon = ({ className, ...rest }: PropsIcon) => {
  return <RiLuggageDepositFill className={cn("w-12 h-12", className)} {...rest} />
}

export const CompleteIcon = ({ className, ...rest }: PropsIcon) => {
  return <MdSystemSecurityUpdateGood className={cn("w-12 h-12", className)} {...rest} />
}

export const MedalIcon = ({ className, ...rest }: PropsIcon) => {
  return <BiMedal className={cn("w-12 h-12", className)} {...rest} />
}