import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useMutation } from '@tanstack/react-query';

import Loader from "../components/Loader"
import useAuth from '../hooks/useAuth';
import { verifyForgotPasswordEmailApi } from '../api/backendApi';
import { setCredentials } from '../redux/authSlice';
import { toast } from 'react-toastify'
import { useNavigate } from "react-router"

const ForgotPasswordOtpVerification = () => {
    const [otp, setOtp] = useState('');
    const { user, dispatch } = useAuth()
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationKey: "otp",
        mutationFn: async (data) => {
            data = {
                otp: data, ...user
            }
            return verifyForgotPasswordEmailApi(data)
        },
        onSuccess: (response) => {

            if (response.status && response.status == 200) {
                toast.success("Email verified successfully")
                navigate("/reset-password")
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    return (
        <>
            <div className="dark:bg-orange-500/20 bg-[url('./src/assets/images/bg-shape.png')] bg-center bg-no-repeat bg-cover relative flex min-h-screen flex-col justify-center overflow-hidden  py-12 text-white">
                <div className="relative dark:bg-slate-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email {user?.email}</p>
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div className="flex flex-col space-y-16">
                                    <div className=" flex flex-row items-center justify-between mx-auto w-full max-w-auto">
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                            inputStyle={`!w-16 text-black text-center px-1 outline-none rounded-xl border border-gray-200 text-4xl py-4 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700`}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                mutation.mutate(otp)
                                            }} className={`${otp.length < 6 ? "bg-orange-400" : "bg-orange-600"} flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5  border-none text-white text-sm shadow-sm`} disabled={otp.length < 6 ? "disabled" : ""}>
                                                Verify Account
                                            </button>
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {mutation?.isPending && <Loader />}
        </>
    )
}

export default ForgotPasswordOtpVerification