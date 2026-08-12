import { StoreProvider } from './providers/StoreProvider'
import { AppRouter } from './providers/RouterProvider'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import '../assets/styles/fonts.css'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StoreProvider>
  )
}