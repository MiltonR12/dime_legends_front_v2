import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

function Card({ children, className, ...args }: Props) {
  return (
    <div className={cn('bg-violetPrimary border border-white/60 p-5 rounded-xl overflow-hidden',
      className)} {...args}>
      {children}
    </div>
  )
}

export default Card