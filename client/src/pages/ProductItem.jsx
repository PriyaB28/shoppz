import React from 'react'
import Ratings from '../components/Ratings'

const ProductItem = () => {
    return (
        <div className="group ">
            <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="../src/assets/shop/black-print-t-shirt.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                    <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-600 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                    <li>
                        <a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a>
                    </li>
                    <li className="mt-1">
                        <a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a>
                    </li>
                    <li className="mt-1">
                        <a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a>
                    </li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                    <li>
                        <a href="#" className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">-40% Off</a>
                    </li>
                </ul>
            </div>

            <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Black Print T-Shirt</a>
                <div className="flex justify-between items-center mt-1">
                    <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                    <Ratings size={16} initialValue={2.5} />
                </div>
            </div>
        </div>
    )
}

export default ProductItem