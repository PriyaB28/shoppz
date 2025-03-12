import React from 'react'
import { Navigate, Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

import Cookies from 'js-cookie';

// const ProtectedRoute = ({ allowedRoles }) => {

//     const userInfo = true;
//     const role = "ADMIN"
//     const userHasRequireRole = userInfo && Array.isArray(allowedRoles) && allowedRoles.includes(role)

//     if (!userInfo) {
//         return <Navigate to={"/login"} />
//     }

//     if (userInfo && !userHasRequireRole) {
//         return <Navigate to='/register' />
//     }

//     return (
//         <>
//             <Header />
//             <Outlet />
//             <Footer />
//         </>
//     )
// }

const ProtectedRoute = () => {
    let roles = ["SELLER","USER"]
    let { user } = useAuth()
    let role = user?.userInfo?.role
    // console.log(role);
    // return
    if (role && roles.includes(role)) {
        return (
            <>
                <Header />
                <div className="client bg-slate-900">
                    <Outlet />
                    </div>
                <Footer />
            </>
        )

    } else {
        return <Navigate to={"/login"} replace />
    }
}
export default ProtectedRoute