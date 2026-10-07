import { useParams } from "react-router-dom"
import { useTournament } from "@/hooks/tournament"

function AdminTorneoPage() {

  const { id } = useParams()
  useTournament(id)

  return (
    <div>AdminTorneoPage</div>
  )
}

export default AdminTorneoPage
