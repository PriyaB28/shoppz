import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)
  const { pathname } = useLocation()
  const hideLayout = pathname == "/register" || pathname == "/login"

  return (
    <>
      {!hideLayout ?
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
        : <Outlet />}
    </>
  )
}

export default App
