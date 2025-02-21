import { getTournamentIdThunk } from "@/app/redux/tournament/tournamentSlice"
import { useAppDispatch } from "@/app/store"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function AdminTorneoPage() {

  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) dispatch(getTournamentIdThunk(id))
  }, [dispatch, id])

  return (
    <div>AdminTorneoPage</div>
  )
}

export default AdminTorneoPage