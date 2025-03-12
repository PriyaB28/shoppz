import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import UserProfileMenu from '../components/UserProfileMenu'
import AddBankAccountModal from '../pages/AddBankAccountModal'
import { deleteBankAccountApi, getSellerStripeBanksApi, onBoardingLinkApi, onBoardingStatusApi } from '../api/backendApi'
import { setCredentials } from '../redux/authSlice';
import useAuth from '../hooks/useAuth';

import { BsBank } from "react-icons/bs";
import { PiDotsSixVerticalThin } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const SellerBanks = () => {
    let [linkQuery, setLinkQuery] = useState(false)
    let { user } = useAuth()
    // let [onBoardStatus, setOnBoardStatus] = useState(user?.userInfo?.onBoarded)
    let dispatch = useDispatch()

    let [isOpenAddBankAccountModal, setIsOpenAddBankAccountModal] = useState(false)

    // console.log(user?.userInfo?.onBoarded);

    let { data, isLoading, isSuccess, error, isError } = useQuery({
        queryKey: ['getStripeBoardLink'],
        queryFn: () => onBoardingLinkApi(),
        enabled: linkQuery
    })

    if (isSuccess) {
        window.open(data?.data?.url, '_blank', 'noopener,noreferrer');
    }

    let { data: onBoardStatusData, isLoading: isLoading1, isSuccess: isSuccess1, isError: isError1, error: error1 } = useQuery({
        queryKey: ['getSellerBoardingStatus'],
        queryFn: async () => {
            let response = await onBoardingStatusApi()
            if (response.status == 200) {
                dispatch(setCredentials(response?.data?.data))
                return true;
            }
        },
    })

    let { data: banks, isLoading: bankIsLoading, isSuccess: bankIsSuccess, isError: isError2, error: error2, refetch } = useQuery({
        queryKey: ['getSellerStripeBanks'],
        queryFn: () => getSellerStripeBanksApi(),
    })

    let bankData = banks?.data?.accounts || [];


    if (isError || isError1 || isError2) {
        let errorMessage = error || error1 || error2
        toast.error(errorMessage?.response?.data?.message)
    }

    const handleCreateAccountLink = async (params) => {
        if (!linkQuery) {
            setLinkQuery(true)
            return
        }
        setLinkQuery(false)
    }

    const handleDeleteBankAccount = async (id) => {

        try {
            let data = {
                bankId: id
            }
            const response = await deleteBankAccountApi(data)

            if (response.status == 200) {
                refetch()
                toast.success(response?.data?.message)
            }


        } catch (error) {
            let errorMessage = error.response.data.message ? error.response.data.message : error.message
            toast.error(errorMessage);
        }
    }
    return (
        <>
            <section className="relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]">
                <div className="md:container container-fluid relative">
                    <div className="relative overflow-hidden md:rounded-md shadow dark:shadow-gray-700 h-52 bg-[url('../src/assets/images/pages.jpg')] bg-center bg-no-repeat bg-cover"></div>
                </div>
                {/* <!--end container--> */}

                <div className="container relative md:mt-16 mt-16">
                    <div className="md:flex">
                        <UserProfileMenu />

                        <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                            {/* <div className="p-6 rounded-md shadow shadow-slate-600 bg-white dark:bg-slate-900">
                                <h5 className="text-lg font-semibold mb-4">Address Detail :</h5>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpenAddressModal(true)
                                    }}
                                    id="submit"
                                    name="send"
                                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md mt-5"
                                >
                                    Add Address
                                </button>
                                <!--end form-->
                            </div> */}

                            <div className="p-6 rounded-md shadow shadow-slate-600 bg-white dark:bg-slate-900 mt-6">
                                {/* <h6 className="text-slate-400 mb-0">The following addresses will be used on the checkout page by default.</h6> */}
                                <div className="grid  grid-cols-1 gap-6 mt-6">
                                    <div className="">
                                        <div className=" mb-3 flex justify-between ">
                                            <h5 className="text-xl font-medium">Bank Accounts:</h5>
                                            <div>
                                                {!user?.userInfo?.onBoarded &&
                                                    <button
                                                        type="button"
                                                        onClick={handleCreateAccountLink}
                                                        id="submit"
                                                        name="send"
                                                        className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md "
                                                    >
                                                        onBoardAccount
                                                    </button>
                                                }
                                                {
                                                    user?.userInfo?.onBoarded &&
                                                    <>
                                                        <button
                                                            type="button"
                                                            id="submit"
                                                            name="send"
                                                            className="py-1 px-3 inline-block font-semibold tracking-wide align-middle duration-500  text-center bg-green-600 text-white me-1 rounded-md pointer-events-none"
                                                            disabled
                                                        >
                                                            onBoarded Success
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsOpenAddBankAccountModal(true)}
                                                            id="submit"
                                                            name="send"
                                                            className="py-1 px-3 inline-block font-semibold tracking-wide align-middle duration-500  text-center bg-orange-500 text-white rounded-md "
                                                        >
                                                            Add Bank Account
                                                        </button>
                                                    </>

                                                }
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t !border-gray-200 ">
                                            {/* <p className="text-lg font-medium mb-2">Jesus Zamora</p> */}
                                            {bankData?.map((item, index) =>
                                                <div key={index} className='shadow-md shadow-slate-700 mb-3 p-2'>
                                                    <ul className="list-none  ">
                                                        <li className="flex justify-between items-center">
                                                            <div className='flex gap-1 items-center'>
                                                                <div className='p-2 bg-slate-500/35 rounded'>
                                                                    <BsBank size={20} />
                                                                </div>
                                                                {/* <FiMapPin className='me-2 mt-2' /> */}
                                                                <div>
                                                                    <h6 className="text-slate-400 ms-1">{item.bank_name}</h6>
                                                                    <div className='flex gap-1'>

                                                                        <span className='flex items-center'><PiDotsSixVerticalThin />{item.routing_number}</span>
                                                                        <span className='flex items-center'><PiDotsSixVerticalThin />**** {item.last4}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button className='text-red-600' onClick={() => {
                                                                handleDeleteBankAccount(item.id)
                                                            }}>
                                                                <RiDeleteBin5Line />
                                                            </button>
                                                        </li>


                                                    </ul>
                                                    <a href="#" className="text-orange-500 text-lg">
                                                        {/* <FaEdit /> */}
                                                    </a>

                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* <div className="">
                                <div className="flex items-center mb-4 justify-between">
                                    <h5 className="text-xl font-medium">Shipping Address:</h5>
                                    <a href="#" className="text-orange-500 text-lg"><i data-feather="edit" className="size-4"></i></a>
                                </div>
                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-lg font-medium mb-2">Jesus Zamora</p>

                                    <ul className="list-none">
                                        <li className="flex">
                                            <i data-feather="map-pin" className="size-4 me-2 mt-1"></i>
                                            <p className="text-slate-400">C/54 Northwest Freeway, Suite 558, <br /> Houston, USA 485</p>
                                        </li>

                                        <li className="flex mt-1">
                                            <i data-feather="phone" className="size-4 me-2 mt-1"></i>
                                            <p className="text-slate-400">+123 897 5468</p>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!--end grid--> */}
                </div>
                {/* <!--end container--> */}
            </section>
            {/* {mutation?.isPending && <Loader />} */}
            {isOpenAddBankAccountModal &&
                <Elements stripe={stripePromise}>
                    <AddBankAccountModal close={setIsOpenAddBankAccountModal} refetch={refetch} />
                </Elements>
            }
        </>
    )
}

export default SellerBanks