import React from 'react'

const ProductItemList = () => {
    return (
        <div className="group relative duration-500 w-full mx-auto">
            <div className="md:flex items-center">
                <div className="relative overflow-hidden md:shrink-0 shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                    <img className="h-full w-full object-cover md:w-48 rounded-md group-hover:scale-110 duration-500" src="../src/assets/shop/black-print-t-shirt.jpg" alt="" />
                    <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                        <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                        <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                        <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-orange-600 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                    </ul>

                    <ul className="list-none absolute top-[10px] start-4">
                        <li><a href="#" className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">-40% Off</a></li>
                    </ul>
                </div>
                <div className="md:ms-6 md:mt-0 mt-4">
                    <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Black Print T-Shirt</a>
                    <p className="text-slate-400 md:block hidden mt-2">Viverra a consectetur Go sporty this vintage navy and white striped.</p>
                    <p className="mt-2">$16.00</p>

                    <ul className="list-none mt-2">
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-red-600 inline-flex align-middle" title="Red"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-indigo-600 inline-flex align-middle" title="Blue"></a></li>
                        <li className="inline"><a href="#" className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-emerald-600 inline-flex align-middle" title="Green"></a></li>
                    </ul>

                    <div className="mt-4">
                        <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-600 text-white rounded-md">Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItemList