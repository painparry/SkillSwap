import { useAppSelector } from '@/store/hooks'
import { HeaderUI } from '@/shared/ui/Header/Header'
import { Header } from '@/widgets/Header'
import { Outlet } from 'react-router-dom'

export const HeaderOnlyLayout = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  return (
    <>
      {isAuth ? <Header /> : <HeaderUI />}
      <Outlet />
    </>
  )
}