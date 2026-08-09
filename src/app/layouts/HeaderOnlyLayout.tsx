import { Header } from "@/widgets/Header"
import { Outlet } from "react-router-dom"

export const HeaderOnlyLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}