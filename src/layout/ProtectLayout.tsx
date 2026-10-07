import { useAuth } from '@/hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectLayout() {

  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return null

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectLayout