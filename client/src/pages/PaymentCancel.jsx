import React from 'react'
import { Link } from 'react-router'

const PaymentCancel = () => {
    return (
        <section className="relative bg-orange-500/5">
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                        <div className="text-center">
                            <a href="index.html">
                                <img src="../src/assets/images/home/logo-shoppz.png" className="mx-auto w-36 h-12" alt="" /></a>
                        </div>
                        <div className="title-heading text-center my-auto">
                            <img src="../src/assets/images/order-cancel.png" className="mx-auto w-72" alt="" />
                            <h1 className="mt-8 mb-6 md:text-5xl text-3xl font-bold">Order Cancel</h1>
                            <p className="text-slate-400 text-lg">Hello, Harry!

                                Your order is cancelled. </p>

                            <div className="mt-4">
                                <Link to={"/"} className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white rounded-md">Back to Home</Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="mb-0 text-slate-400">© <script>document.write(new Date().getFullYear())</script> Cartzio. Design with <i className="mdi mdi-heart text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</a>.</p>
                        </div>
                    </div>
                </div>
                {/* <!--end grid--> */}
            </div>
            {/* <!--end container--> */}
        </section>
    )
}

export default PaymentCancel