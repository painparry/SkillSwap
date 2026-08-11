import { useAppSelector } from '@/store/hooks'
import { HeaderUI } from '@/shared/ui/Header/Header'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  return (
    <>
      {isAuth ? <Header /> : <HeaderUI />}
      <Outlet />
      <Footer />
    </>
  )
}