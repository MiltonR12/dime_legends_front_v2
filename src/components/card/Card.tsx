import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function Card({ children, className, ...args }: Props) {
  return (
    <div className={cn('bg-blue-950/50 p-5 rounded-xl max-w-lg', className)} {...args}>
      {children}
    </div>
  )
}

export default Card