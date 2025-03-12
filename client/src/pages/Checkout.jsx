import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { createOrderApi, emptyCartApi, getAddressesApi, stripePaymentApi } from '../api/backendApi'
import { FiEdit, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import useCart from '../hooks/useCart'
import AddressModal from './AddressModal'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../redux/cartSlice'
import { Link, useNavigate } from 'react-router'
import { loadStripe } from "@stripe/stripe-js"


const Checkout = () => {

    const [selectedAddress, setSelectAddress] = useState()
    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false)
    const [isChecked, setIsChecked] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useCart()
    // console.log(cart?.cart);

    let { data } = useQuery({
        queryKey: ['getAddresses', isOpenAddressModal],
        queryFn: () => getAddressesApi()
    })

    let addresses = data?.data?.data


    useEffect(() => {
        // console.log(addresses?.[0]);
        setSelectAddress(addresses?.[0]?._id)
    }, [addresses])
    // useEffect(() => {
    //     console.log(cart?.cart?.length);
    //     if (cart?.cart?.length == 0) {
    //         navigate("/product-listing")
    //     }
    // }, [cart])
    const handleSelectedAddress = (e, index) => {
        setSelectAddress(e.target.value)
        setIsChecked(index)
    }

    const handleCashOnDelivery = async (params) => {
        let data = {
            products: cart?.cart,
            paymentId: "",
            paymentStatus: "COD",
            deliveryAddressId: selectedAddress,
            totalAmt: cart?.cartSubtotal
        }

        let response = await createOrderApi(data)
        console.log(response);
        if (response.status == 200) {
            toast.success("Order created successfully")
            let cartResponse = await emptyCartApi()
            if (cartResponse.status == 200) {
                dispatch(getCartItems())
                navigate("/success", {
                    state: {
                        text: "Order"
                    }
                })
            }
        }

    }

    const handleStripePayment = async (params) => {
        try {
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripePublicKey)
            let data = {
                products: cart?.cart,
                paymentId: "",
                paymentStatus: "COD",
                deliveryAddressId: selectedAddress,
                totalAmt: cart?.cartSubtotal
            }
            let response = await stripePaymentApi(data)
            console.log(response);
            stripePromise.redirectToCheckout({ sessionId: response?.data?.data?.id })

        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <section className="relative table w-full py-16 lg:py-20 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 mt-14">
                        <h3 className="text-3xl leading-normal font-semibold">Checkout</h3>
                    </div>
                    {/* <!--end grid--> */}

                    <div className="relative mt-3">
                        <ul className="tracking-[0.5px] mb-0 inline-block">
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="index.html">Cartzio</a></li>
                            <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">Checkout</li>
                        </ul>
                    </div>
                </div>
                {/* <!--end container--> */}
            </section>
            {/* <!--end section--> */}
            {/* <!-- End Hero --> */}

            {/* <!-- Start --> */}
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                        <div className="lg:col-span-8">
                            <div className="p-6 rounded-md shadow shadow-slate-600 bg-white dark:bg-slate-900 mt-6">
                                <h6 className="text-slate-400 mb-0">The following addresses will be used on the checkout page by default.</h6>
                                <div className="grid  grid-cols-1 gap-6 mt-6">
                                    <div className="">
                                        <div className=" mb-4 flex justify-between items-center">
                                            <h5 className="text-xl font-medium">Billing Address:</h5>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsOpenAddressModal(true)
                                                }}
                                                id="submit"
                                                name="send"
                                                className="py-2 px-5  font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500/60 text-white rounded-md flex items-center gap-1"
                                            >
                                                <FiEdit />
                                                Add Address
                                            </button>
                                        </div>
                                        <div className="pt-2 border-t !border-gray-200 h-80 overflow-scroll">
                                            {/* <p className="text-lg font-medium mb-2">Jesus Zamora</p> */}
                                            {addresses?.map((item, index) =>

                                                <div key={index} className={`flex gap-1 shadow-md shadow-slate-700 mb-3 p-2 hover:bg-slate-800 ${isChecked == index ? "bg-slate-800" : ""}`}>

                                                    <input
                                                        className="form-check-input rounded border-gray-100  text-orange-500 !focus:border-orange-300 focus:ring focus:ring-offset-0 !focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                                        type="radio"
                                                        value={item._id}
                                                        onChange={(e) => handleSelectedAddress(e, index)}
                                                        name='address'
                                                        id="sameaddress"
                                                        checked={isChecked == index ? true : false}
                                                    />
                                                    <ul className="list-none  ">

                                                        <li className="flex">

                                                            <FiMapPin className='me-2 mt-2' />
                                                            <p className="text-slate-400">{item?.addressLine}, {item?.city}, <br /> {item?.state}, {item?.country} {item?.pincode}</p>
                                                        </li>

                                                        <li className="flex mt-1">

                                                            <FiPhone className='me-2 mt-2' />
                                                            <p className="text-slate-400">+{item.mobile}</p>
                                                        </li>
                                                    </ul>
                                                    {/* <a href="#" className="text-orange-500 text-lg">
                                                        <FaEdit /> </a> */}

                                                </div>
                                            )}

                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                        {/* <!--end col--> */}

                        <div className="lg:col-span-4">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold">Your Cart</h5>

                                    <a href="#" className="bg-orange-500 flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5">{cart?.cart?.length}</a>
                                </div>

                                <div className="mt-4 rounded-md shadow shadow-gray-800">
                                    {cart?.cart?.length !== 0 && cart?.cart?.map((item, index) =>
                                        <div key={index} className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                            <div className='flex gap-1 items-center'>
                                                <img src={item?.productId?.images?.[0]} className='rounded-full' alt="" width={50} />
                                                <h5 className="font-semibold">{item?.productId?.name}</h5>
                                                {/* <p className="text-sm text-slate-400">Brief description</p> */}
                                            </div>

                                            <p className="text-slate-400 font-semibold">$ {item?.totalPrice}</p>
                                        </div>
                                    )}
                                    {/* <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                        <div>
                                            <h5 className="font-semibold">Second product</h5>
                                            <p className="text-sm text-slate-400">Brief description</p>
                                        </div>

                                        <p className="text-slate-400 font-semibold">$ 18</p>
                                    </div>
                                    <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                        <div>
                                            <h5 className="font-semibold">Third item</h5>
                                            <p className="text-sm text-slate-400">Brief description</p>
                                        </div>

                                        <p className="text-slate-400 font-semibold">$ 20</p>
                                    </div> */}
                                    {/* <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 text-green-600">
                                        <div>
                                            <h5 className="font-semibold">Promo code</h5>
                                            <p className="text-sm text-green-600">EXAMPLECODE</p>
                                        </div>

                                        <p className="text-red-600 font-semibold">-$ 10</p>
                                    </div> */}
                                    <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                        <div>
                                            <h5 className="font-semibold">Total (USD)</h5>
                                        </div>

                                        <p className="font-semibold">$ {cart?.cartSubtotal}</p>
                                    </div>
                                </div>

                                <div className="subcribe-form mt-6">
                                    <form className="relative max-w-xl">
                                        <input type="email" id="subcribe" name="email" className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800" placeholder="Promo code" />
                                        <button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-orange-500 text-white rounded-full">Redeem</button>
                                    </form>
                                    <div className="mt-4">
                                        {/* <button type="button" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center border border-orange-500 hover:bg-orange-500 text-white rounded-md w-full mb-2"
                                        onClick={handleStripePayment}
                                        >Pay Online</button> */}
                                        <Link to={"/payment"} state={ {
                                                deliveryAddressId: selectedAddress,
                                            }} className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center border border-orange-500 hover:bg-orange-500 text-white rounded-md w-full mb-2"
                                        >Pay Online</Link>
                                        <button type="button" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center border border-orange-500 hover:bg-orange-500 text-white rounded-md w-full"
                                            onClick={handleCashOnDelivery}
                                        >Cash on Delivery</button>
                                    </div>
                                    {/* <!--end form--> */}
                                </div>
                            </div>
                        </div>
                        {/* <!--end col--> */}
                    </div>
                    {/* <!--end grid--> */}
                </div>
                {/* <!--end container--> */}

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                        <div className="lg:col-span-5 md:col-span-6">
                            <img src="../src/assets/images/checkout.svg" className="mx-auto d-block" alt="" />
                        </div>

                        <div className="lg:col-span-7 md:col-span-6">
                            <span className="bg-orange-500/5 text-orange-500 text-xs font-bold px-2.5 py-0.5 rounded h-5">Mobile Apps</span>
                            <h4 className="font-semibold text-3xl leading-normal my-4">Available for your <br /> Smartphones</h4>
                            <p className="text-slate-400 max-w-xl mb-0">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>
                            <div className="my-5">
                                <a href="#">
                                    <img src="../src/assets/images/apple.png" className="m-1 inline-block" alt="" />
                                </a>

                                <a href="#">
                                    <img src="../src/assets/images/google.png" className="m-1 inline-block" alt="" />
                                </a>
                            </div>

                            <div className="inline-block">
                                <div className="pt-4 flex items-center border-t border-gray-100 dark:border-gray-700">

                                    <HiMiniDevicePhoneMobile className="me-2 text-orange-500 h-10 w-10" />
                                    <div className="content">
                                        <h6 className="text-base font-medium">Install app now on your cellphones</h6>
                                        <a href="#" className="text-orange-500">Learn More <i className="mdi mdi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--end gird--> */}
                </div>
                {/* <!--end container--> */}
            </section>
            {isOpenAddressModal && <AddressModal close={setIsOpenAddressModal} />}
        </>
    )
}

export default Checkout