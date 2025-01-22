import React from 'react'
import { Navigate, Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProtectedRoute = ({  allowedRoles }) => {

    const userInfo = true;
    const role = "ADMIN"
    const userHasRequireRole = userInfo && Array.isArray(allowedRoles) && allowedRoles.includes(role)

    if (!userInfo) {
        return <Navigate to={"/login"} />
    }

    if (userInfo && !userHasRequireRole) {
        return <Navigate to='/register' />
    }

    return (
        <>
            <Header />
            <Outlet/>
            <Footer />
        </>
    )
}

export default ProtectedRoute