import { useState } from 'react'
import './App.css'
import { Outlet, Route, Routes, useLocation } from 'react-router'
import { ToastContainer } from 'react-toastify';

import Header from './components/Header'
import Footer from './components/Footer'
import Layout from './components/Layout'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  // const { pathname } = useLocation()

  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* {!hideLayout ?
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
          : <Outlet />}
        <ToastContainer /> */}

        <Routes>
          
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
            <Route path="/about" element={<About />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>

      </QueryClientProvider>
    </>
  )
}

export default App
