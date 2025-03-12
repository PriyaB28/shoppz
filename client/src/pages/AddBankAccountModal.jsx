import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from 'react-toastify';

import { useFormik } from "formik";
import { useStripe } from "@stripe/react-stripe-js";
import * as Yup from 'yup'
import { createBankAccountApi } from "../api/backendApi";
import Loader from "../components/Loader"

const AddBankAccountModal = ({ close,refetch }) => {
    const stripe = useStripe();

    let initialValues = {
        account_holder_name: "",
        account_holder_type: "individual",
        routing_number: "",
        account_number: "",
        country: "us",
        currency: "usd",
    };

    let mutation = useMutation({
        mutationKey: "createAccount",
        mutationFn: async (data) => {
            data.account_number = data.account_number.toString()
            data.routing_number = data.routing_number.toString()
            if (!stripe) {
                return;
            }
            const { token, error } = await stripe.createToken("bank_account", data)
            return token
        },
        onSuccess: async (response) => {
            if (response.id) {
                let data = {
                    token: response.id
                }

                let bankResponse = await createBankAccountApi(data)
                if (bankResponse?.data?.account?.id) {
                    close(false)
                    refetch()
                    resetForm();
                }

            }
        },
        onError: (error) => {
            let errorMessage = error.response.data.message ? error.response.data.message : error.message
            toast.error(errorMessage);
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
        validationSchema: Yup.object({
            account_holder_name: Yup.string()
                .required('This field is required'),
            account_number: Yup.string()
                .matches(/^\d*$/, 'Only numbers are allowed') // Validate that only digits are allowed
                .required('This field is required'),
            routing_number: Yup.string() // Validate that only digits are allowed
                .required('Routing number is required'),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            let data = new FormData();
            for (const element in values) {
                data.append(element, values[element])
            }
            data.append("test", "test")
            mutation.mutate(values);
        },
    });

    const handleInputChange = (e) => {
        let value = e.target.value;

        // Regex allows only digits (0-9)
        if (/^\d*$/.test(value)) {
            // Example: Ensure it's always 5 digits
            const paddedValue = value.padStart(5, '0'); // Adjust to required length
            setFieldValue('account_number', paddedValue);
        }
    };

    return (
        <>
        <div
            id="modelConfirm"
            className="fixed  z-[999] inset-0 bg-gray-800 bg-opacity-70 overflow-y-auto h-full w-full px-4 "
        >
            <div className="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-2xl">
                <div className="p-5 rounded-md alert shadow shadow-slate-600 bg-white dark:bg-slate-900">
                    <div className="flex  justify-between">

                        <h5 className="text-lg font-semibold ">Add Bank Account :</h5>
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
                            <div className="md:col-span-6">
                                <label className=" font-semibold">
                                    Account Holder Name  : <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                                    placeholder="Name:"
                                    id="account_holder_name"
                                    name="account_holder_name"
                                    onChange={handleChange}
                                    value={values.account_holder_name}
                                    onBlur={handleBlur}
                                    required=""
                                />
                                {touched.account_holder_name && errors.account_holder_name ?
                                    <span className="text-red-500 text-sm">{errors.account_holder_name}</span>
                                    : null
                                }
                            </div>
                            <div className="md:col-span-6">
                                <label className=" font-semibold">
                                    Account Holder Type : <span className="text-red-600">*</span>
                                </label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    defaultValue={values.account_holder_type}
                                    name="account_holder_type"
                                    onBlur={handleBlur}>
                                    <option value="individual">Individual</option>
                                    <option value="company">Company</option>
                                </select>
                                {touched.account_holder_type && errors.account_holder_type ?
                                    <span className="text-red-500 text-sm">{errors.account_holder_type}</span>
                                    : null
                                }
                            </div>
                            <div className="md:col-span-6">
                                <label className=" font-semibold">
                                    Routing Number : <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                                    placeholder="Name:"
                                    id="routing_number"
                                    name="routing_number"
                                    onChange={handleChange}
                                    value={values.routing_number}
                                    onBlur={handleBlur}
                                    required=""
                                />
                                {touched.routing_number && errors.routing_number ?
                                    <span className="text-red-500 text-sm">{errors.routing_number}</span>
                                    : null
                                }
                            </div>
                            <div className="md:col-span-6">
                                <label className=" font-semibold">
                                    Accounting Number : <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    min="0"
                                    className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                                    placeholder="Name:"
                                    id="account_number"
                                    name="account_number"
                                    onChange={handleInputChange}
                                    value={values.account_number}
                                    onBlur={handleBlur}
                                    required=""
                                />
                                {touched.account_number && errors.account_number ?
                                    <span className="text-red-500 text-sm">{errors.account_number}</span>
                                    : null
                                }
                            </div>


                            <div className="md:col-span-6">
                                <label className="font-semibold">Country:</label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    name="country"
                                    defaultValue={values.country}
                                    onBlur={handleBlur}
                                >
                                    <option value="us">USA</option>
                                    <option value="ca">Canada</option>
                                    <option value="ch">China</option>
                                    <option value="in">INDIA</option>
                                    <option value="au">Australia</option>
                                </select>
                                {touched.country && errors.country ?
                                    <span className="text-red-500 text-sm">{errors.country}</span>
                                    : null
                                }
                            </div>
                            <div className="md:col-span-6">
                                <label className="font-semibold">Currency:</label>
                                <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" onChange={handleChange}
                                    name="currency"
                                    defaultValue={values.currency}
                                    onBlur={handleBlur}
                                >
                                    <option value="usd">USD</option>
                                    <option value="inr">INR</option>
                                    <option value="aud">AUD</option>
                                </select>
                                {touched.currency && errors.currency ?
                                    <span className="text-red-500 text-sm">{errors.currency}</span>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button
                                type="submit"
                                id="submit"
                                className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md mt-5 w-1/2 "
                            >
                                Add Bank Account
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
            {mutation.isPending && <Loader />}
            </>
    );
};

export default AddBankAccountModal;
