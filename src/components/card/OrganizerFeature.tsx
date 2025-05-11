type Props = {
  icon: React.ReactNode
  title: string
}

function OrganizerFeature({ icon, title }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-pink-900/50">{icon}</div>
      <p className="text-white">{title}</p>
    </div>
  )
}

export default OrganizerFeature