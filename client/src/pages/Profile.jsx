import React, { useEffect } from "react";
import { useFormik } from "formik";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import useAuth from "../hooks/useAuth";
import { profileSchema } from "../schema/registerSchema";
import UserProfileMenu from "../components/UserProfileMenu"

import { FiUser } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import Loader from "../components/Loader";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfileApi } from "../api/backendApi";
import { setCredentials } from "../redux/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
    const { user, dispatch } = useAuth();
    console.log(user);

    let phone = user.userInfo?.phone == undefined ? "" : user.userInfo?.phone.toString()

    let initialValues = {
        name: user.userInfo?.name || "",
        email: user.userInfo?.email || "",
        phone: phone || "",
    };

    let mutation = useMutation({
        mutationKey: "profile",
        mutationFn: (data) => updateUserProfileApi(data),
        onSuccess: (response) => {
            if (response.status == 200) {
                console.log(response);

                dispatch(setCredentials(response.data.data))
                toast.success("Profile updated")
                // let userData = response.data.data
                // dispatch(setCredentials(userData))
                // navigate("/verify-email")
                resetForm()
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

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
        validationSchema: profileSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log("values", values);
            mutation.mutate(values)
        },
    });


    return (
        <>
            <section className="relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]">
                <div className="md:container container-fluid relative">
                    <div className="relative overflow-hidden md:rounded-md shadow dark:shadow-gray-700 h-52 bg-[url('../src/assets/images/pages.jpg')] bg-center bg-no-repeat bg-cover"></div>
                </div>
                {/* <!--end container--> */}

                <div className="container relative md:mt-24 mt-16">
                    <div className="md:flex">
                        <UserProfileMenu />

                        <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                                <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                                        <div>
                                            <label className="form-label font-medium">
                                                Name : <span className="text-red-600">*</span>
                                            </label>
                                            <div className="form-icon relative mt-2">

                                                <FiUser className="w-4 h-4 absolute top-3 start-4" />
                                                <input
                                                    type="text"
                                                    className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                    placeholder="Name:"
                                                    id="name"
                                                    value={values?.name}
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.name && errors.name ?
                                                    <span className="text-red-500 text-sm">{errors.name}</span>
                                                    : null
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <label className="form-label font-medium">
                                                Your Email : <span className="text-red-600">*</span>
                                            </label>
                                            <div className="form-icon relative mt-2">
                                                {/* <i
                                                data-feather="mail"
                                                className="w-4 h-4 absolute top-3 start-4"
                                            ></i> */}
                                                <FaRegEnvelope className="w-4 h-4 absolute top-3 start-4" />
                                                <input
                                                    type="email"
                                                    className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                    placeholder="Email"
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
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">
                                                Phone No. :
                                            </label>
                                            <div className="form-icon relative mt-2">
                                                <i
                                                    data-feather="phone"
                                                    className="w-4 h-4 absolute top-3 start-4"
                                                ></i>
                                                {/* <input
                                                id="number"
                                                type="number"
                                                className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                placeholder="Phone :"
                                                value={values.phone}
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            /> */}
                                                <PhoneInput
                                                    id="phone"
                                                    inputProps={{
                                                        name: "phone",
                                                        onBlur: handleBlur
                                                    }}
                                                    containerClass="my-container-class !text-slate-600 "
                                                    inputClass="!ps-12 !w-full !py-2 !px-3 !h-10 !bg-transparent !dark:bg-slate-900 !text-slate-200 !rounded !outline-none !border  !border-gray-800 !focus:ring-0"
                                                    country={'in'}
                                                    value={values.phone}
                                                    onChange={(value) => setFieldValue("phone", value)}

                                                />
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div className="mt-4">
                                            <h5 className="text-lg font-semibold mb-4">Change password :</h5>

                                            <div className="grid grid-cols-1 gap-5">
                                                <div>
                                                    <label className="form-label font-medium">New password :</label>
                                                    <div className="form-icon relative mt-2">
                                                        <i data-feather="key" className="w-4 h-4 absolute top-3 start-4"></i>
                                                        <input type="password" className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" placeholder="New password" autoComplete="" />
                                                    </div>
                                                </div>

                                                {/* <div>
                                                    <label className="form-label font-medium">Re-type New password :</label>
                                                    <div className="form-icon relative mt-2">
                                                        <i data-feather="key" className="w-4 h-4 absolute top-3 start-4"></i>
                                                        <input type="password" className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" placeholder="Re-type New password" required="" />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    {/* <!--end grid--> */}

                                    {/* <!--end row--> */}

                                    <button
                                        type="submit"
                                        id="submit"
                                        name="send"
                                        className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md mt-5"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                                {/* <!--end form--> */}
                            </div>
                        </div>
                    </div>
                    {/* <!--end grid--> */}
                </div>
                {/* <!--end container--> */}
            </section>
            {mutation?.isPending && <Loader />}
        </>
    );
};

export default Profile;
