import React from 'react'


import logo from '../assets/images/home/logo-shoppz.png'

import { FaHeart } from "react-icons/fa";
import { forgotPasswordSchema } from '../schema/registerSchema';
import { Link, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordOtpApi } from '../api/backendApi';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import { setCredentials } from '../redux/authSlice';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuth()
    const mutation = useMutation({
        mutationKey: "forgotPassword",
        mutationFn: (data) => forgotPasswordOtpApi(data),
        onSuccess: (response) => {
            if (response.status == 200) {
                resetForm()
                toast.success("Email verification otp sent to your entered email.")                
                dispatch(setCredentials(response.data.data))
                navigate("/verify-forgot-email")
            }
        },
        onError: (error) => {
            console.log(error);
            //   toast.error()
        }
    })

    let initialValues = {
        email: "",
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            // console.log('values', values)
            mutation.mutate(values)
        },
    });


    const errorsLength = Object.values(errors).length

    const year = new Date().getFullYear()

    return (
        <>
            <section className="md:h-screen py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 bg-[url('../src/assets/images/bg-shape.png')] bg-center bg-no-repeat bg-cover">
                <div className="container relative">
                    <div className="grid grid-cols-1">
                        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                            <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                                <div className="relative md:shrink-0">
                                    <img className="lg:h-full h-full w-full object-cover md:h-[34rem]" src="../src/assets/images/forgot-password.jpg" alt="" />
                                </div>

                                <div className="p-8 lg:px-20">
                                    <div className="text-center">
                                        <a href="index.html">

                                            <img src={logo} className="mx-auto hidden dark:block" width={150} alt="" />
                                        </a>
                                    </div>

                                    <form className="text-start lg:py-12 py-8" onSubmit={handleSubmit}>
                                        <p className="text-slate-400 mb-6">Please enter your email address. You will receive a link to create a new password via email.</p>
                                        <div className="grid grid-cols-1">
                                            <div className="mb-4">
                                                <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                                <input
                                                    id="LoginEmail"
                                                    type="email"
                                                    className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border-2 border-gray-800 focus:border-orange-500"
                                                    placeholder="name@example.com"
                                                    value={values.email}
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.email && errors.email ?
                                                    <span className="text-red-500 text-sm">{errors.email}</span>
                                                    : null
                                                }
                                            </div>

                                            <div className="mb-4">
                                                <button
                                                    type="submit"
                                                    className={`${errorsLength == 0 ? ' bg-orange-500' : 'bg-orange-300'} py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center text-white rounded-md w-full`}

                                                > Send</button>
                                            </div>

                                            <div className="text-center">
                                                <span className="text-slate-400 me-2">Remember your password ? </span><Link to={"/login"} className="text-black dark:text-white font-bold inline-block">Sign in</Link>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-center">
                                        <p className="mb-0 text-slate-400">© {year} Shoppz. Design with <FaHeart className='inline' /> by <a href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {mutation?.isPending && <Loader />}
        </>
    )
}

export default ForgotPassword