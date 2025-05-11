import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  href: string
  icon: React.ReactNode
  text: string
}

function FooterLink({ href, icon, text }: Props) {
  return (
    <li>
      <Link to={href} className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors group">
        <span className="text-purple-500 group-hover:text-purple-400">{icon}</span>
        {text}
        <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      </Link>
    </li>
  )
}

export default FooterLink