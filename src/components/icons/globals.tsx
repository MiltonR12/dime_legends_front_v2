import register from '@/assets/svg/home/register.svg'
import { cn } from '@/lib/utils'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { MdSystemSecurityUpdateGood } from 'react-icons/md'
import { BiMedal } from "react-icons/bi";
import { RiLuggageDepositFill } from 'react-icons/ri'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> { }
interface PropsIcon extends IconProps { }
interface PropsDiv extends React.HTMLAttributes<HTMLDivElement> { }

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

export const DownloadIcon = (props: PropsIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export const CircleIcon = ({ className, ...rest }: PropsDiv) => {
  return <div
    className={cn("mt-1 min-w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500", className)}
    {...rest}
  />
}