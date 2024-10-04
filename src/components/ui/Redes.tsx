import { Link } from 'react-router-dom'

type Props = {
  title: string
  url: string
  children: React.ReactNode
}

function Redes({ children, title, url }: Props) {
  return (
    <div className='' >
      <Link to={url} className='flex gap-5 items-center text-lg hover:text-primary transition-colors' >
        <span>
          {children}
        </span>
        <span>
          {title}
        </span>
      </Link>
    </div>
  )
}

export default Redes