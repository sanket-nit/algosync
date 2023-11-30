import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace={true} />
  )
}

export default RequireAuth
