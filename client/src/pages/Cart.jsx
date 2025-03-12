import React from 'react'
import CartItems from '../components/CartItems'
import useCart from '../hooks/useCart'
import { Link } from 'react-router';

const Cart = () => {
    const { cart } = useCart();
  
    return (
        <>
            <section className="relative table w-full py-20 lg:py-24 bg-gray-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="grid grid-cols-1 mt-14">
                        <h3 className="text-3xl leading-normal font-semibold">Shopcart</h3>
                    </div>
                    {/* <!--end grid--> */}

                    <div className="relative mt-3">
                        <ul className="tracking-[0.5px] mb-0 inline-block">
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="index.html">Cartzio</a></li>
                            <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">Shopcart</li>
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
                    <div className="grid lg:grid-cols-1">
                        <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
                            <table className="w-full text-start">
                                <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                                    <tr>
                                        <th scope="col" className="p-4 w-4"></th>
                                        <th scope="col" className="text-start p-4 min-w-[220px]">Product</th>
                                        <th scope="col" className="p-4 w-24 min-w-[100px]">Price</th>
                                        <th scope="col" className="p-4 w-56 min-w-[220px]">Qty</th>
                                        <th scope="col" className="p-4 w-24 min-w-[100px]">Total($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.cart?.length !== 0 && cart?.cart?.map((item, index) =>
                                        <CartItems key={index} data={item} />
                                    )}
                                    {cart?.cart?.length == 0 &&
                                       <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
                                       <td className="p-4 text-center" colSpan={5}><div className="qty-icons">
                                              No Items
                                           </div></td>
                                     
                                   </tr>
                                    }
                                    {/* <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
                                        <td className="p-4"><a href="#"><i className="mdi mdi-window-close text-red-600"></i></a></td>
                                        <td className="p-4">
                                            <span className="flex items-center">
                                                <img src="assets/images/shop/fashion-shoes-sneaker.jpg" className="rounded shadow dark:shadow-gray-800 w-12" alt="" />
                                                <span className="ms-3">
                                                    <span className="block font-semibold">Sneaker Shoes</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">$ 160</td>
                                        <td className="p-4 text-center">
                                            <div className="qty-icons">
                                                <button onClick={()=>{}} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus">-</button>
                                                <input min="0" name="quantity"  type="number" className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none w-16 ps-4 quantity" />
                                                <button onClick={()=>{}} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus">+</button>
                                            </div>
                                        </td>
                                        <td className="p-4  text-end">$ 160</td>
                                    </tr>

                                    <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
                                        <td className="p-4"><a href="#"><i className="mdi mdi-window-close text-red-600"></i></a></td>
                                        <td className="p-4">
                                            <span className="flex items-center">
                                                <img src="assets/images/shop/ladies-skirt-pair.jpg" className="rounded shadow dark:shadow-gray-800 w-12" alt="" />
                                                <span className="ms-3">
                                                    <span className="block font-semibold">Ladies Skirt</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">$ 500</td>
                                        <td className="p-4 text-center">
                                            <div className="qty-icons">
                                                <button onClick={()=>{}} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus">-</button>
                                                <input min="0" name="quantity" type="number" className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none w-16 ps-4 quantity" />
                                                <button onClick={()=>{}} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus">+</button>
                                            </div>
                                        </td>
                                        <td className="p-4  text-end">$ 500</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                        {cart?.cart?.length !== 0 &&
                            <div className="grid lg:grid-cols-12 md:grid-cols-2  mt-6 gap-6">
                                <div className="lg:col-span-9 md:order-1 order-3">
                                    <div className="space-x-1">
                                        <a href="#" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center bg-orange-500 text-white rounded-md mt-2">Shop Now</a>
                                        <Link to={"/checkout"} className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white mt-2">Checkout</Link>
                                    </div>
                                </div>

                                <div className="lg:col-span-3 md:order-2 order-1">
                                    <ul className="list-none shadow dark:shadow-gray-800 rounded-md">
                                        <li className="flex justify-between p-4">
                                            <span className="font-semibold text-lg">Subtotal :</span>
                                            <span className="text-slate-400">$ {cart?.cartSubtotal}</span>
                                        </li>
                                        <li className="flex justify-between p-4">
                                            <span className="font-semibold text-lg">Delivery Charge :</span>
                                            <span className="text-slate-400">Free</span>
                                        </li>
                                        {/* <li className="flex justify-between p-4 border-t border-gray-100 dark:border-gray-800">
                                            <span className="font-semibold text-lg">Taxes :</span>
                                            <span className="text-slate-400">$ 150</span>
                                        </li> */}
                                        <li className="flex justify-between font-semibold p-4 border-t border-gray-200 dark:border-gray-600">
                                            <span className="font-semibold text-lg">Total :</span>
                                            <span className="font-semibold">$ {cart?.cartSubtotal}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* <!--end container--> */}

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                        <div className="lg:col-span-5 md:col-span-6">
                            <img src="assets/images/envelope.svg" className="mx-auto d-block" alt="" />
                        </div>

                        <div className="lg:col-span-7 md:col-span-6">
                            <span className="bg-orange-500/5 text-orange-500 text-xs font-bold px-2.5 py-0.5 rounded h-5">Mobile Apps</span>
                            <h4 className="font-semibold text-3xl leading-normal my-4">Available for your <br /> Smartphones</h4>
                            <p className="text-slate-400 max-w-xl mb-0">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>
                            <div className="my-5">
                                <a href="#"><img src="assets/images/app.png" className="m-1 inline-block" alt="" /></a>

                                <a href="#"><img src="assets/images/playstore.png" className="m-1 inline-block" alt="" /></a>
                            </div>

                            <div className="inline-block">
                                <div className="pt-4 flex items-center border-t border-gray-100 dark:border-gray-800">
                                    <i data-feather="smartphone" className="me-2 text-orange-500 h-10 w-10"></i>
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
    )
}

export default Cart