import React from 'react'
import { RiShoppingBag4Line } from "react-icons/ri";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


const SidebarFilter = () => {
    return (
        <div className="md:col-span-3 sm:col-span-4">
            <div className="rounded shadow shadow-gray-600 p-4 sticky top-20">
                <h5 className="text-xl font-medium">Filter</h5>

                <form className="mt-4">
                    <div>
                        <label htmlFor="searchname" className="font-medium">Search:</label>
                        <div className="relative mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search absolute size-4 top-[9px] end-4"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" className="h-9 sm:w-36 md:w-full rounded px-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 focus:ring-0 outline-none" name="s" id="searchItem" placeholder="Search..." />
                        </div>
                    </div>
                </form>

                <div className="mt-4 sidebar-filter">
                    <h5 className="font-medium">Brands:</h5>
                    <div className="  max-h-20 overflow-y-scroll " id='scroll'>
                        <ul className="list-none mt-2">
                            <li className="ms-0">
                                <input
                                    id="defaultCheck1"
                                    type="checkbox"
                                    className="form-checkbox appearance-none rounded h-4 w-4 me-2 cursor-pointer bg-red-100 border-red-300 text-red-600  outline-none  checked:bg-orange-500 transition"
                                />

                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Fashion
                                </label>
                            </li>
                            <li className="ms-0">
                                <input
                                    id="defaultCheck1"
                                    type="checkbox"
                                    className="form-checkbox appearance-none rounded h-4 w-4 me-2 cursor-pointer bg-red-100 border-red-300 text-red-600  outline-none  checked:bg-orange-500 transition"
                                />

                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Electronics
                                </label>
                            </li>
                            <li className="ms-0">
                                <input
                                    id="defaultCheck1"
                                    type="checkbox"
                                    className="form-checkbox appearance-none rounded h-4 w-4 me-2 cursor-pointer bg-red-100 border-red-300 text-red-600  outline-none  checked:bg-orange-500 transition"
                                />

                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Bags
                                </label>
                            </li>
                            <li className="ms-0">
                                <input
                                    id="defaultCheck1"
                                    type="checkbox"
                                    className="form-checkbox appearance-none rounded h-4 w-4 me-2 cursor-pointer bg-red-100 border-red-300 text-red-600  outline-none  checked:bg-orange-500 transition"
                                />

                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Footwears
                                </label>
                            </li>
                            <li className="ms-0">
                                <input
                                    id="defaultCheck1"
                                    type="checkbox"
                                    className="form-checkbox appearance-none rounded h-4 w-4 me-2 cursor-pointer bg-red-100 border-red-300 text-red-600  outline-none  checked:bg-orange-500 transition"
                                />

                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Groceries
                                </label>
                            </li>
                            <li className="ms-0">
                                <input
                                    id="defaultCheck1"
                                    type="checkbox"
                                    className="form-checkbox appearance-none rounded h-4 w-4 me-2 cursor-pointer bg-red-100 border-red-300 text-red-600  outline-none  checked:bg-orange-500 transition"
                                />

                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Jewellery
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4">
                    <h5 className="font-medium">Price:</h5>
                    <div className='mt-4'>
                        <RangeSlider
                            id="range-slider-gradient"
                            className="margin-lg"
                            rangeSlideDisabled={true}
                            min={0}
                            max={1000}
                        />
                    </div>
                    <div className="flex items-center justify-between pt-  h-8 text-sm">
                        <div> $0 </div>

                        <div> $1000 </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h5 className="font-medium">Colors:</h5>
                    <ul className="list-none mt-2">
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-red-600 inline-flex align-middle" title="Red"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-indigo-600 inline-flex align-middle" title="Blue"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-emerald-600 inline-flex align-middle" title="Green"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-slate-900 inline-flex align-middle" title="Black"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-gray-400 inline-flex align-middle" title="Gray"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-orange-600 inline-flex align-middle" title="Orange"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-violet-600 inline-flex align-middle" title="Purple"></a></li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h5 className="font-medium">Brands:</h5>
                    <ul className="list-none mt-2">
                        <li className="ms-0">
                            <a className="text-slate-400 dark:text-gray-100" href="/shop-grid-left-sidebar">
                                <RiShoppingBag4Line className=' inline text-orange-500 me-2' />
                                Alexander McQueen</a>
                        </li>
                        <li className="ms-0">
                            <a className="text-slate-400 dark:text-gray-100" href="/shop-grid-left-sidebar">
                                <RiShoppingBag4Line className=' inline text-orange-500 me-2' />
                                Alexander Wang</a>
                        </li>
                        <li className="ms-0">
                            <a className="text-slate-400 dark:text-gray-100" href="/shop-grid-left-sidebar">
                                <RiShoppingBag4Line className=' inline text-orange-500 me-2' />
                                Allegra K</a>
                        </li>
                        <li className="ms-0">
                            <a className="text-slate-400 dark:text-gray-100" href="/shop-grid-left-sidebar">
                                <RiShoppingBag4Line className=' inline text-orange-500 me-2' />
                                AllSaints</a>
                        </li>
                        <li className="ms-0">
                            <a className="text-slate-400 dark:text-gray-100" href="/shop-grid-left-sidebar">
                                <RiShoppingBag4Line className=' inline text-orange-500 me-2' />
                                Badgley Mischka</a>
                        </li>
                        <li className="ms-0">
                            <a className="text-slate-400 dark:text-gray-100" href="/shop-grid-left-sidebar">
                                <RiShoppingBag4Line className=' inline text-orange-500 me-2' />
                                Baldinini</a>
                        </li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h5 className="font-medium">Sizes:</h5>
                    <ul className="list-none mt-2">
                        <li className="inline"><a href="#" className="size-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">S</a></li>
                        <li className="inline"><a href="#" className="size-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">M</a></li>
                        <li className="inline"><a href="#" className="size-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">L</a></li>
                        <li className="inline"><a href="#" className="size-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">XL</a></li>
                        <li className="inline"><a href="#" className="w-10 h-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">2XL</a></li>
                        <li className="inline"><a href="#" className="w-10 h-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">3XL</a></li>
                        <li className="inline"><a href="#" className="w-10 h-7 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-gray-50 hover:border-slate-900 dark:hover:border-gray-100 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100">4XL</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SidebarFilter