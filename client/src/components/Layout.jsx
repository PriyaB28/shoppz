import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <div className="client bg-slate-900">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout