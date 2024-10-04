import { RootState } from '@/app/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectLayout() {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectLayout