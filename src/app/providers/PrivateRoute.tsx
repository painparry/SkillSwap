import { useAppSelector } from '@/store/hooks'
import { Navigate, useLocation } from 'react-router-dom'

type PrivateRouteProps = {
  onlyUnAuth?: boolean
  children: React.ReactElement
}

export const PrivateRoute = ({ onlyUnAuth,  children }: PrivateRouteProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const location = useLocation()

  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to="/login" state={{ from: location }} />
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' }

    return <Navigate replace to={from} />
  }


  return children
}
