import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';

import { resetPasswordSchema } from '../schema/registerSchema'
import Loader from '../components/Loader'

import logo from '../assets/images/home/logo-shoppz.png'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { resetPasswordApi } from '../api/backendApi';
import useAuth from '../hooks/useAuth';
import { setCredentials } from '../redux/authSlice';

const ResetPassword = () => {

    const { user, dispatch } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user?.email) {
            toast.error("User not found")
            navigate("/login")
        }
    }, [])

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    };

    let mutation = useMutation({
        mutationKey: "resetPassword",
        mutationFn: (data) => resetPasswordApi(data),
        onSuccess: (data) => {
            if (data.status == 200) {
                resetForm()
                toast.success("Password changed successfully.")
                dispatch(setCredentials(null))
                navigate("/login")
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.response.data.message)
        }
    })

    let initialValues = {
        password: "",
        confirmPassword: ""
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues: initialValues,
        validationSchema: resetPasswordSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            // console.log('values', values)
            values = {
                ...values, ...user
            }
            mutation.mutate(values)
        },
    });


    const errorsLength = Object.values(errors).length
    const year = new Date().getFullYear()


    return (
        <>
            <section className="md:h-screen py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 bg-[url('../src/assets/images/bg-shape.png')] bg-center bg-no-repeat bg-cover text-white">
                <div className="container relative">
                    <div className="grid grid-cols-1">
                        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                            <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                                <div className="relative md:shrink-0">
                                    <img
                                        className="h-full w-full object-cover md:h-[44rem]"
                                        src="../src/assets/images/forgot-password.jpg"
                                        alt=""
                                    />
                                </div>

                                <div className="px-8 py-5 lg:px-20">
                                    <div className="text-center mt">
                                        <a href="index.html">
                                            <img
                                                src={logo}
                                                className="mx-auto hidden dark:block"
                                                alt=""
                                                width={150}
                                            />
                                        </a>
                                    </div>

                                    <form
                                        className="text-start lg:py-16 py-8"
                                        onSubmit={handleSubmit}
                                    >
                                        <p className="text-slate-400 mb-6 text-center">Please enter your new password</p>
                                        <div className="grid grid-cols-1">


                                            <div className="mb-4">
                                                <label className="font-semibold" htmlFor="LoginPassword">
                                                    Password:
                                                </label>

                                                <div className="form-icon relative mt-2 ">

                                                    <button
                                                        aria-label="button"
                                                        type="button"
                                                        className="ti-btn ti-btn-light !mb-0 !rounded-s-none dark:border-white/10 !border-s-0 w-4 h-4 absolute top-3 start-4"
                                                        onClick={handleShowPassword}
                                                    >
                                                        {/* <i className="align-middle ri-eye-off-line"></i> */}
                                                        {showPassword ? (
                                                            <FaRegEye />
                                                        ) : (
                                                            <FaRegEyeSlash />
                                                        )}
                                                    </button>
                                                    <input type={showPassword ? "text" : 'password'} className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border-2 border-gray-800 focus:border-orange-500 " placeholder="Password:"
                                                        autoComplete="on"
                                                        value={values.password}
                                                        name="password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                </div>
                                                {touched.password && errors.password ?
                                                    <span className="text-red-500 text-sm">{errors.password}</span>
                                                    : null
                                                }
                                            </div>
                                            <div className="mb-4">
                                                <label className="font-semibold" htmlFor="confirmPassword">
                                                    Confirm Password:
                                                </label>

                                                <div className="form-icon relative mt-2 ">

                                                    <button
                                                        aria-label="button"
                                                        type="button"
                                                        className="ti-btn ti-btn-light !mb-0 !rounded-s-none dark:border-white/10 !border-s-0 w-4 h-4 absolute top-3 start-4"
                                                        onClick={handleShowConfirmPassword}
                                                    >
                                                        {/* <i className="align-middle ri-eye-off-line"></i> */}
                                                        {showConfirmPassword ? (
                                                            <FaRegEye />
                                                        ) : (
                                                            <FaRegEyeSlash />
                                                        )}
                                                    </button>
                                                    <input type={showConfirmPassword ? "text" : 'password'} className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border-2 border-gray-800 focus:border-orange-500 " placeholder="Confirm Password:"
                                                        autoComplete="on"
                                                        value={values.confirmPassword}
                                                        name="confirmPassword"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                </div>
                                                {touched.confirmPassword && errors.confirmPassword ?
                                                    <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                                                    : null
                                                }
                                            </div>

                                            <div className="mb-4">
                                                <button
                                                    type="submit"
                                                    className={`${errorsLength == 0 ? ' bg-orange-500' : 'bg-orange-300'} py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center text-white rounded-md w-full`}

                                                > Register</button>
                                            </div>

                                            {/* <div className="text-center">
                                            <span className="text-slate-400 me-2">
                                                Already have an account ?{" "}
                                            </span>{" "}
                                            <Link
                                                to={"/login"}
                                                className="text-black dark:text-white font-bold inline-block"
                                            >
                                                Sign in
                                            </Link>
                                        </div> */}
                                        </div>
                                    </form>

                                    <div className="text-center">
                                        <p className="mb-0 text-slate-400">
                                            © {year}{" "}
                                            Cartzio. Design with
                                            <FaHeart className='inline ms-1' /> by{" "}
                                            <a
                                                href="https://shreethemes.in/"
                                                target="_blank"
                                                className="text-reset"
                                            >
                                                Shreethemes
                                            </a>
                                            .
                                        </p>
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

export default ResetPassword