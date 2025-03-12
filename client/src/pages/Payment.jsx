import React, { useState } from 'react'
import {
    PaymentElement,
    Elements,
    ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const location = useLocation();
    let orderCartData = location.state

    // const [stripePromise, setStripePromise] = useState(() => loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY))

    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',

    };
    return (
        <Elements stripe={stripePromise} options={options} >
            <CheckoutForm orderCartData={orderCartData} />
        </Elements >
    )
}

export default Payment