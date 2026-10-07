import { useParams } from "react-router-dom"
import BracketCanvas from "@/components/bracket/BracketCanvas"

function AdminBracketPage() {
  const { id } = useParams()
  if (!id) return null

  return (
    <div className="h-[calc(100vh-6rem)] min-h-[520px] w-full">
      <BracketCanvas tournamentId={id} />
    </div>
  )
}

export default AdminBracketPage
