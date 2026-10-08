import { useAuth } from '@/hooks/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectLayout() {

  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        <span className="sr-only">Cargando sesión</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />
  }

  return <Outlet />
}

export default ProtectLayout
