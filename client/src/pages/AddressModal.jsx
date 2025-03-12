import { useMutation } from "@tanstack/react-query";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { FiUser } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa6";

import { addAddressApi } from "../api/backendApi";
import { setCredentials } from "../redux/authSlice";
import useAuth from "../hooks/useAuth";
import { useFormik } from "formik";

import { addressSchema } from "../schema/registerSchema";

const AddressModal = ({ close }) => {
    const { user, dispatch } = useAuth();
   const navigate = useNavigate()

    let phone =
        user.userInfo?.phone == undefined ? "" : user.userInfo?.phone.toString();

    let initialValues = {
        addressLine: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        status: "",
        mobile: phone || "",
    };

    let mutation = useMutation({
        mutationKey: "address",
        mutationFn: (data) => addAddressApi(data),
        onSuccess: (response) => {
            if (response.status == 200) {

                toast.success(response.data.message);
                close(false)
        
                resetForm();
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

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
        validationSchema: addressSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });
 
    return (
        <div
            id="modelConfirm"
            className="fixed  z-[999] inset-0 bg-gray-800 bg-opacity-70 overflow-y-auto h-full w-full px-4 "
        >
            <div className="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-2xl">
                <div className="p-5 rounded-md alert shadow shadow-slate-600 bg-white dark:bg-slate-900">
                    <div className="flex  justify-between">

                        <h5 className="text-lg font-semibold ">Address Detail :</h5>
                        <button
                            type="button"
                            onClick={() => close(false)}
                            className="btn-close !mb-0 !p-0 ms-auto "
                            data-hs-remove-element="#dismiss-alert72"
                            aria-label="Close"
                        >
                            X
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-5">
                            <div className="md:col-span-12">
                                <label className=" font-semibold">
                                    Address : <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                                    placeholder="Address:"
                                    id="address"
                                    name="addressLine"
                                    onChange={handleChange}
                                    value={values.addressLine}
                                    onBlur={handleBlur}
                                    required=""
                                />
                                {touched.addressLine && errors.addressLine ?
                                    <span className="text-red-500 text-sm">{errors.addressLine}</span>
                                    : null
                                }
                            </div>
                            <div className="md:col-span-6">
                                <label className="form-label font-semibold">
                                    Phone : <span className="text-red-600">*</span>
                                </label>
                                <PhoneInput
                                    id="mobile"
                                    inputProps={{
                                        name: "mobile",
                                        onBlur: handleBlur
                                    }}
                                    containerClass="my-container-class !text-slate-600 "
                                    inputClass="!ps-12 !w-full !py-2 !px-3 !h-10 !bg-transparent !dark:bg-slate-900 !text-slate-200 !rounded !outline-none !border  !border-gray-800 !focus:ring-0"
                                    country={'in'}
                                    value={values.mobile}
                                    onChange={(value) => setFieldValue("mobile", value)}

                                />
                                {touched.mobile && errors.mobile ?
                                    <span className="text-red-500 text-sm">{errors.mobile}</span>
                                    : null
                                }
                            </div>

                            <div className="md:col-span-6">
                                <label className="font-semibold">City:</label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    value={values.city}
                                    name="city"
                                    onBlur={handleBlur}>
                                    <option value="USA">USA</option>
                                    <option value="CAD">Canada</option>
                                    <option value="CHINA">China</option>
                                </select>

                                {touched.city && errors.city ?
                                    <span className="text-red-500 text-sm">{errors.city}</span>
                                    : null
                                }
                            </div>

                            <div className="md:col-span-6">
                                <label className="font-semibold">State:</label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    value={values.state}
                                    name="state"
                                    onBlur={handleBlur}>
                                    <option value="CAL">California</option>
                                    <option value="TEX">Texas</option>
                                    <option value="FLOR">Florida</option>
                                </select>
                                {touched.state && errors.state ?
                                    <span className="text-red-500 text-sm">{errors.state}</span>
                                    : null
                                }
                            </div>

                            <div className="md:col-span-6">
                                <label className="font-semibold">Country:</label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    name="country"
                                    value={values.country}
                                    onBlur={handleBlur}
                                >
                                    <option value="USA">USA</option>
                                    <option value="CAD">Canada</option>
                                    <option value="CHINA">China</option>
                                </select>
                                {touched.country && errors.country ?
                                    <span className="text-red-500 text-sm">{errors.country}</span>
                                    : null
                                }
                            </div>


                            <div className="md:col-span-6">
                                <label className=" font-semibold">
                                    Zip Code : <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                                    placeholder="Zip:"
                                    id="pincode"
                                    name="pincode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pincode}
                                    required=""
                                />
                                {touched.pincode && errors.pincode ?
                                    <span className="text-red-500 text-sm">{errors.pincode}</span>
                                    : null
                                }
                            </div>

                            <div className="md:col-span-6">
                                <label className="font-semibold">Status:</label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    name="status"
                                    value={values.status}
                                    onBlur={handleBlur}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                                {touched.status && errors.status ?
                                    <span className="text-red-500 text-sm">{errors.status}</span>
                                    : null
                                }
                            </div>


                            <div className="md:col-span-12">
                                <div className="flex items-center w-full mb-0">
                                    <input
                                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                        type="checkbox"
                                        // value=""
                                        id="sameaddress"
                                    />
                                    <label
                                        className="form-check-label text-slate-400"
                                        htmlFor="sameaddress"
                                    >
                                        Shipping address is the same as my billing address
                                    </label>
                                </div>

                                <div className="flex items-center w-full mb-0">
                                    <input
                                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                        type="checkbox"
                                        // value=""
                                        id="savenexttime"
                                    />
                                    <label
                                        className="form-check-label text-slate-400"
                                        htmlFor="savenexttime"
                                    >
                                        Save this information for next time
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button
                                type="submit"
                                id="submit"
                                className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md mt-5 w-1/2 "
                            >
                                Add Address
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    close(false)
                                    resetForm()
                                }}
                                id="submit"
                                className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-black text-white rounded-md mt-5 w-1/2 "
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    {/* <!--end form--> */}
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
