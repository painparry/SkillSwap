import { StoreProvider } from './providers/StoreProvider'
import { AppRouter } from './providers/RouterProvider'
import './styles/global.css'
import '../assets/styles/fonts.css'



import { HeaderUI } from '../shared/ui/Header/Header';



export function App() {
  return (
    <StoreProvider>
      <HeaderUI />
      <AppRouter />
    </StoreProvider>
  )
}
