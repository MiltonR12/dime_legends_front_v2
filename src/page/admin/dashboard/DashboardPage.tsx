import { useAuth } from "@/hooks/auth"
import { isOrganizer } from "@/lib/roles"
import OrganizerDashboard from "./components/OrganizerDashboard"
import PlayerDashboard from "./components/PlayerDashboard"

function DashboardPage() {
  const { user } = useAuth()
  if (!user) return null
  return isOrganizer(user) ? <OrganizerDashboard /> : <PlayerDashboard />
}

export default DashboardPage
