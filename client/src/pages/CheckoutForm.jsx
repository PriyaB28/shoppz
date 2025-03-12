import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import useCart from "../hooks/useCart";
import { Link } from "react-router";
import { createPaymentIntentApi, getPaymentMethodsApi, stripePaymentApi } from "../api/backendApi";
import { useQuery } from "@tanstack/react-query";
import { BsCaretLeft } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";

const CheckoutForm = ({ orderCartData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [saveCard, setSaveCard] = useState(false);
    const { cart } = useCart()
    const [clientSecret, setClientSecret] = useState("");
    const [selectedCard, setSelectCard] = useState()
    const [isChecked, setIsChecked] = useState(0)
    const [isNewCard, setIsNewCard] = useState(false)

    const paymentIntent = async (data) => {
        let response = await createPaymentIntentApi(data)
        console.log(response);
        // setClientSecret(response?.data?.clientSecret)
    }


    let { data: cardData, isLoading, isSuccess, error: payMethodError, isError } = useQuery({
        queryKey: ['getPaymentMethods'],
        queryFn: () => getPaymentMethodsApi()
    })

    let cards = cardData?.data?.cards

    // The customer has not entered their payment method.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        const { paymentMethod, error: cardError } = await stripe.createPaymentMethod({
            type: "card",
            card: card,
        });

        if (cardError) {
            console.error("❌ Error creating Payment Method:", cardError);
            return;
        }

        let data = {
            amount: cart?.cartSubtotal,
            currency: "usd",
            paymentMethod: paymentMethod?.id
        }

        paymentIntent(data)

        // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: paymentMethod?.id
        // });


        // console.log(paymentIntent);

        // const { error, token } = await stripe.createToken(card);

        // if (error) {
        //     setError(error.message);
        // } else {
        // if (saveCard) {

        // }
        // else {

        //     let data = {
        //         cardId: token.card.id,
        //         cart: cart?.cart,
        //         addressId: orderCartData?.deliveryAddressId
        //     }
        //     let response = await stripePaymentApi(data)
        //     console.log(response);
        // }

        // Send token.id to your backend to charge the card
        // }
    };

    const handleChange = (e) => {
        setDisable(true)
        if (e.complete) {
            setDisable(false)
        }
    }

    const handleSelectedCard = (e, index) => {
        setSelectCard(e.target.value)
        setIsChecked(index)
    }

    const handlePayment = async () => {
        let data = {
            amount: cart?.cartSubtotal,
            currency: "usd",
            paymentMethod: selectedCard
        }
        paymentIntent(data)
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


            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid lg:grid-cols-12  grid-cols-1 gap-6">
                        <div className="lg:col-span-8">
                            <div className="p-6 rounded-md shadow shadow-slate-600 bg-white dark:bg-slate-900 mt-6">
                                {/* <h6 className="text-slate-400 mb-0">The following addresses will be used on the checkout page by default.</h6> */}

                                {isNewCard &&
                                    <button className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center  h-[46px] border border-orange-500 hover:bg-orange-400 text-white rounded-full " onClick={() => setIsNewCard(false)}>close</button>
                                }
                                {isNewCard &&
                                    <div className="grid  grid-cols-1 gap-6 mt-6 duration-500 ">
                                        <form onSubmit={handleSubmit}>
                                            <CardElement className="payCard" onChange={handleChange} />
                                            <button type="submit" className="pay-button" disabled={!stripe || loading || disable}>
                                                {loading ? "Processing..." : "Pay $" + cart?.cartSubtotal}
                                            </button>
                                            {error && <p style={{ color: "red" }}>{error}</p>}
                                            <input
                                                className="form-check-input !bg-white rounded border-gray-100  text-orange-500 !focus:border-orange-300 focus:ring focus:ring-offset-0 !focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                                type="checkbox"
                                                name='saveCard'
                                                onClick={() => { setSaveCard(true) }}
                                                id="savecard"
                                            />
                                            <label htmlFor="savecard">Save Card for future</label>
                                        </form>

                                    </div>
                                }

                                <div className="grid  grid-cols-1 gap-6 mt-6">
                                    <div className="flex items-center justify-between border-b pb-2">
                                        <h3 className="text-slate-400 mb-0 text-xl">Your Cards</h3>
                                        {!isNewCard &&
                                            <button className=" px-2 font-semibold tracking-wide align-middle duration-500 text-base text-center  h-[40px]  border border-orange-500 hover:bg-orange-400 text-white rounded flex items-center " onClick={() => setIsNewCard(true)}> <PiPlus />  New Card</button>

                                        }
                                    </div>
                                    <div className="flex gap-1">
                                        {cards?.map((item, index) =>
                                            <div key={index} className="flex">
                                                <input
                                                    className="form-check-input !bg-white rounded border-gray-100  text-orange-500 !focus:border-orange-300 focus:ring focus:ring-offset-0 !focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                                    type="radio"
                                                    value={item.id}
                                                    onChange={(e) => handleSelectedCard(e, index)}
                                                    name='address'
                                                    id="sameaddress"
                                                    disabled={!isNewCard ? false : true}
                                                    checked={isNewCard ? false : undefined}
                                                />
                                                {/* {(error.expiryDate || error.number) && (
                                            <div className="sm:text-sm text-xs text-red-600 h-9">
                                                {error.expiryDate
                                                    ? "Please enter valid expiry date"
                                                    : "Please enter valid card number"}
                                            </div>
                                        )} */}
                                                <div
                                                    className="flex w-96 justify-between bg-[#365CCE]   rounded-lg px-7 py-5 transition duration-400 shadow-xl hover:scale-105 md:hover:scale-105  "
                                                >
                                                    <div className="flex gap-1">
                                                        <svg
                                                            height="618.03101"
                                                            viewBox="0 0 1000.008 618.03103"
                                                            width="1000.008"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-8 w-12"
                                                        >
                                                            <g transform="matrix(8.5837610323 0 0 8.5837610323 -2898.73609385976 -2239.50304064073)">
                                                                <path d="m380.20001 268.60001h31.5v56.599998h-31.5z" fill="#ff5f00" />
                                                                <path
                                                                    d="m382.2 296.9c0-11.5 5.4-21.7 13.7-28.3-6.1-4.8-13.8-7.7-22.2-7.7-19.9 0-36 16.1-36 36s16.1 36 36 36c8.4 0 16.1-2.9 22.2-7.7-8.3-6.5-13.7-16.8-13.7-28.3z"
                                                                    fill="#eb001b"
                                                                />
                                                                <path
                                                                    d="m454.2 296.9c0 19.9-16.1 36-36 36-8.4 0-16.1-2.9-22.2-7.7 8.4-6.6 13.7-16.8 13.7-28.3s-5.4-21.7-13.7-28.3c6.1-4.8 13.8-7.7 22.2-7.7 19.9 0 36 16.2 36 36z"
                                                                    fill="#f79e1b"
                                                                />
                                                            </g>
                                                        </svg> <span>Master Card</span> <span className="text-base flex items-center">
                                                            <span>****</span> {item.last4}
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {item.exp_month}/{item.exp_year}
                                                    </span>
                                                </div>
                                            </div>)
                                        }

                                    </div>
                                    {!isNewCard &&
                                        <button className={`py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center  h-[46px]  text-white rounded-full ${!selectedCard ? "bg-orange-400 !cursor-not-allowed" : "bg-orange-500"} `}
                                            disabled={selectedCard ? false : true}
                                            onClick={handlePayment}>Pay {cart?.cartSubtotal}</button>
                                    }
                                </div>
                            </div>

                        </div>
                        {/* <!--end col--> */}


                        <div className="lg:col-span-4">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold">Your Items</h5>

                                    <a href="#" className="bg-orange-500 flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5">{cart?.cart?.length}</a>
                                </div>

                                <div className="mt-4 rounded-md shadow shadow-gray-800">
                                    {cart?.cart?.length !== 0 && cart?.cart?.map((item, index) =>
                                        <div key={index} className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                            <div className='flex gap-1 items-center'>
                                                <img src={item?.productId?.images?.[0]} className='rounded-full' alt="" width={50} />
                                                <div>
                                                    <h5 className="font-semibold">{item?.productId?.name}</h5>
                                                    <span>{item?.quantity} x ${item?.productId?.afterDiscountPrice} </span>
                                                </div>
                                                {/* <p className="text-sm text-slate-400">Brief description</p> */}
                                            </div>

                                            <p className="text-slate-400 font-semibold">${item?.totalPrice}</p>
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
        </>
    );
};

export default CheckoutForm;
