
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';

import UserProfileMenu from '../components/UserProfileMenu';

import AddressModal from './AddressModal';
import { useQuery } from '@tanstack/react-query';
import { getAddressesApi } from '../api/backendApi';
import { FaEdit } from 'react-icons/fa';
import { FaMapPin } from 'react-icons/fa6';
import { FiMapPin, FiPhone } from 'react-icons/fi';

const Address = () => {

    let [isOpenAddressModal, setIsOpenAddressModal] = useState(false)

    let { data } = useQuery({
        queryKey: ['getAddresses', isOpenAddressModal],
        queryFn: () => getAddressesApi()
    })
    let addresses = data?.data?.data

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
                            <div className="p-6 rounded-md shadow shadow-slate-600 bg-white dark:bg-slate-900">
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
                                {/* <!--end form--> */}
                            </div>

                            <div className="p-6 rounded-md shadow shadow-slate-600 bg-white dark:bg-slate-900 mt-6">
                                <h6 className="text-slate-400 mb-0">The following addresses will be used on the checkout page by default.</h6>
                                <div className="grid  grid-cols-1 gap-6 mt-6">
                                    <div className="">
                                        <div className=" mb-3 ">
                                            <h5 className="text-xl font-medium">Billing Address:</h5>
                                        </div>
                                        <div className="pt-2 border-t !border-gray-200 ">
                                            {/* <p className="text-lg font-medium mb-2">Jesus Zamora</p> */}
                                            {addresses?.map((item, index) => 
                                                <div key={index} className='flex justify-between shadow-md shadow-slate-700 mb-3 p-2'>
                                                    <ul className="list-none  ">
                                                        <li className="flex">
                                                           
                                                            <FiMapPin className='me-2 mt-2'/>
                                                            <p className="text-slate-400">{item?.addressLine}, {item?.city}, <br /> {item?.state}, {item?.country} {item?.pincode}</p>
                                                        </li>

                                                        <li className="flex mt-1">
                                                          
                                                            <FiPhone className='me-2 mt-2'/>
                                                            <p className="text-slate-400">+{item.mobile}</p>
                                                        </li>
                                                    </ul>
                                                    <a href="#" className="text-orange-500 text-lg">
                                                        <FaEdit /> </a>
                                                    
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
            {isOpenAddressModal && <AddressModal close={setIsOpenAddressModal} />}
        </>
    )
}

export default Address