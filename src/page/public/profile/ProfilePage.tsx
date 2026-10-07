import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/auth"
import { isOrganizer } from "@/lib/roles"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

function ProfilePage() {
  const { user } = useAuth()
  if (!user) return null

  const organizer = isOrganizer(user)
  const initial = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0c0c14] px-4 text-admin-text">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <Avatar className="h-28 w-28 border border-admin-border">
          <AvatarImage src={user.image || undefined} alt="" />
          <AvatarFallback className="bg-admin-surface text-xl text-admin-text">{initial}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h1>
          <p className="mt-1 text-sm text-admin-muted">{user.email}</p>
        </div>
        {!organizer && (
          <Button asChild className="bg-admin-accent text-white hover:bg-admin-accent-hover">
            <Link to="/admin/organizador">Pedir página de organizador</Link>
          </Button>
        )}
        <Link to="/" className="text-sm text-admin-muted hover:text-admin-text">Volver al inicio</Link>
      </div>
    </main>
  )
}

export default ProfilePage
