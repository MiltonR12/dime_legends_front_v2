type Pros = {
  title: string
  url: string
  icon: React.ReactNode
  description: string
}

function CommunityLink({ title, url, icon, description }: Pros) {
  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
        <div className="mt-1 p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">{icon}</div>
        <div>
          <p className="text-white group-hover:text-purple-300 transition-colors">{title}</p>
          <p className="text-xs text-purple-400">{description}</p>
        </div>
      </a>
    </li>
  )
}

export default CommunityLink