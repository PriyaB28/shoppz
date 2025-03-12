import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { logoutApi, uploadAvatar } from '../api/backendApi'
import useUserDetails from '../hooks/useUserDetails'
import { Link } from 'react-router'

const UserProfileMenu = () => {
    const { user } = useAuth()
    const { loaded, setLoaded, getUserDetails } = useUserDetails()

    const [image,setImage] = useState(user.userInfo.avatar)
    const handleLogout = async () => {
        try {
            const response = await logoutApi()
            console.log("logout", response)
            // if (response.data.success) {
            //     if (close) {
            //         close()
            //     }
            //     dispatch(logout(null))
            //     toast.success(response.data.message)
            //     navigate("/login")
            // }
        } catch (error) {
            console.log(error);

            // toast.error(error)
        }
    }

    const handleUploadProfileImage = async(e) => {
        const file = e.target.files[0]
        // console.log(file);
        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar', file)
        try {

            const result = await uploadAvatar(formData)
            if (result.status == 200) {

                setImage(result.data.data.avatar)
                getUserDetails()
                toast.success("Image uploaded successfully")
            }
            
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message)
        }
    }

    let name = user.userInfo.name.charAt(0).toUpperCase() + user.userInfo.name.slice(1);
    return (
        <div className="lg:w-1/4 md:w-1/3 md:px-3">
            <div className="relative md:-mt-48 -mt-32">
                <div className="p-6 rounded-md mt-10 shadow shadow-slate-600 bg-white dark:bg-slate-900">
                    <div className="profile-pic text-center mb-5">
                        <input
                            id="pro-img"
                            name="avatar"
                            type="file"
                            className="hidden"
                            onChange={handleUploadProfileImage}
                        />
                        <div>
                            <div className="relative h-28 w-28 mx-auto">
                                <img
                                    src={image}
                                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                                    id="avatar"
                                    alt=""
                                />
                                <label
                                    className="absolute inset-0 cursor-pointer"
                                    htmlFor="pro-img"
                                ></label>
                            </div>

                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">{name}</h5>
                                <p className="text-slate-400">{user.userInfo.email }</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <ul
                            className="list-none sidebar-nav mb-0 pb-0"
                            id="navmenu-nav"
                        >
                            <li className="navbar-item account-menu">
                                <a
                                    href="user-account.html"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="airplay" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Account</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <Link
                                    to={"/address"}
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="edit" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Billing Info</h6>
                                </Link>
                            </li>

                            {user?.userInfo?.role == "SELLER" ? 
                             <li className="navbar-item account-menu">
                             <Link
                                 to={"/bank-accounts"}
                                 className="navbar-link text-slate-400 flex items-center py-2 rounded"
                             >
                                 <span className="me-2 mb-0">
                                     <i data-feather="edit" className="size-4"></i>
                                 </span>
                                 <h6 className="mb-0 font-medium">Bank Accounts</h6>
                             </Link>
                         </li>
:""
                        }

                            <li className="navbar-item account-menu">
                                <a
                                    href="user-payment.html"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="credit-card" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Payment</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <a
                                    href="user-invoice.html"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="file-text" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Invoice</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <a
                                    href="user-social.html"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="share-2" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Social Profile</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <a
                                    href="user-notification.html"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="bell" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Notifications</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <a
                                    href="user-setting.html"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="settings" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Settings</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <button
                                    type='button'
                                    onClick={handleLogout}
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <i data-feather="log-out" className="size-4"></i>
                                    </span>
                                    <h6 className="mb-0 font-medium">Sign Out</h6>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileMenu