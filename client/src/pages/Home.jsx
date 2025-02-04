import React from 'react'

const home = () => {
  return (
    <>
      {/* <!-- Start Hero --> */}
      <section className="relative md:flex table w-full items-center md:h-screen py-36 bg-emerald-500/5 bg-[url('../src/assets/images/home/bg3.png')] md:bg-top bg-center bg-no-repeat bg-cover">
        <div className="container relative">
          <div className="grid grid-cols-1 justify-center">
            <div className="text-center">
              <span className="uppercase font-semibold text-lg">New Collection</span>
              <h4 className="md:text-6xl text-4xl md:leading-normal leading-normal font-bold my-3">The Gift Suite</h4>
              <p className="text-lg">Our latest collection of essential basics.</p>

              <div className="mt-6">
                <a href="#" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-slate-900 dark:bg-orange-500 text-white rounded-md">Shop Now <i className="mdi mdi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          {/* <!--end grid--> */}
        </div>
        {/* <!--end container--> */}
      </section>

      {/* <!-- Start --> */}
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid grid-cols-1 justify-center text-center mb-6">
            <h5 className="font-semibold text-3xl leading-normal mb-4">Shop The Collections</h5>
            <p className="text-slate-400 max-w-xl mx-auto">Shop the latest products from the most popular collections</p>
          </div>
          {/* <!--end grid--> */}

          <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 grid-cols-1 pt-6 gap-6">
            <a href="#" className="text-center hover:text-orange-500">
              <img src="../src/assets/images/home/mens-ware.jpg" className="rounded-full shadow dark:shadow-gray-800" width={201} height={201} alt="" />
              <span className="text-xl font-medium mt-3 block">Men's Wear</span>
            </a>

            <a href="#" className="text-center hover:text-orange-500">
              <img src="../src/assets/images/home/ladies-ware.jpg" className="rounded-full shadow dark:shadow-gray-800" width={201} height={201} alt="" />
              <span className="text-xl font-medium mt-3 block">Ladies Wear</span>
            </a>

            <a href="#" className="text-center hover:text-orange-500">
              <img src="../src/assets/images/home/kids-ware.jpg" className="rounded-full shadow dark:shadow-gray-800" width={201} height={201} alt="" />
              <span className="text-xl font-medium mt-3 block">Kids Wear</span>
            </a>

            <a href="#" className="text-center hover:text-orange-500">
              <img src="../src/assets/images/home/smart-watch.jpg" className="rounded-full shadow dark:shadow-gray-800" width={201} height={201} alt="" />
              <span className="text-xl font-medium mt-3 block">Smart Watch</span>
            </a>

            <a href="#" className="text-center hover:text-orange-500">
              <img src="../src/assets/images/home/sunglasses.jpg" className="rounded-full shadow dark:shadow-gray-800" width={201} height={201} alt="" />
              <span className="text-xl font-medium mt-3 block">Sunglasses</span>
            </a>
          </div>
          {/* <!--end grid--> */}
        </div>
        {/* <!--end container--> */}

        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 justify-center text-center mb-6">
            <h5 className="font-semibold text-3xl leading-normal mb-4">New Arrival Products</h5>
            <p className="text-slate-400 max-w-xl mx-auto">Shop the latest products from the most popular collections</p>
          </div>
          {/* <!--end grid--> */}

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-6 gap-6">
            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/black-print-t-shirt.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">-40% Off</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Black Print T-Shirt</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/fashion-shoes-sneaker.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">New</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Fashion Shoes Sneaker</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/men-white-espadrilles-slip-shoes.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Mens White Slip Shoes</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/luxurious-bag.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Ladies Luxurious Bag</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/ladies-1.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Ladies Green Top</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/ladies-2.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Ladies Onepiece Wear</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/mens-jecket.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">Featured</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Mens Brown Jecket</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/sweater-t-shirt.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Sweater T-Shirt</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/trendy-t-shirt2.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Trendy T-shirt</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/men-sun-glasses.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">New</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Men Sun Glasses</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/women-s-white-low-heel-shoes.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">-25% Off</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Women White Low Heel Shoes</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/casual-men-shorts.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">Featured</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Black Print T-Shirt</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}
          </div>
          {/* <!--end grid--> */}
        </div>
        {/* <!--end container--> */}

        <div className="container-fluid relative md:mt-24 mt-16">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden py-24 px-4 md:px-10 bg-orange-600 bg-[url('../../assets/images/hero/bg3.html')] bg-center bg-no-repeat bg-cover">
              <div className="absolute inset-0 bg-[url('../../assets/images/hero/bg-shape.html')] bg-center bg-no-repeat bg-cover"></div>
              <div className="grid grid-cols-1 justify-center text-center relative z-1">
                <h3 className="text-4xl leading-normal tracking-wide font-bold text-white">End of Season Clearance <br /> Sale upto 30%</h3>
                <div id="countdown" className="mt-6">
                  <ul className="count-down list-none inline-block space-x-1">
                    <li id="days" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow shadow-gray-100 inline-block text-center text-white"></li>
                    <li id="hours" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow shadow-gray-100 inline-block text-center text-white"></li>
                    <li id="mins" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow shadow-gray-100 inline-block text-center text-white"></li>
                    <li id="secs" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow shadow-gray-100 inline-block text-center text-white"></li>
                    <li id="end" className="h1"></li>
                  </ul>
                </div>
                <div className="mt-4">
                  <a href="sale.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-white text-orange-500 rounded-md"><i className="mdi mdi-cart-outline"></i> Shop Now</a>
                </div>
              </div>
              {/* <!--end grid--> */}
            </div>
          </div>
        </div>
        {/* <!--end container--> */}

        <div className="container relative md:mt-24 mt-16">
          <div className="grid items-end md:grid-cols-2 mb-6">
            <div className="md:text-start text-center">
              <h5 className="font-semibold text-3xl leading-normal mb-4">Popular Items</h5>
              <p className="text-slate-400 max-w-xl">Popular items in this week</p>
            </div>

            <div className="md:text-end hidden md:block">
              <a href="shop-grid.html" className="text-slate-400 hover:text-orange-500">See More Items <i className="mdi mdi-arrow-right"></i></a>
            </div>
          </div>
          {/* <!--end grid--> */}

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-6 gap-6">
            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/luxurious-bag2.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>

                <ul className="list-none absolute top-[10px] start-4">
                  <li><a href="#" className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">New</a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Orange Luxurious Bag</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/smart-watch.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Smart Watch</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/white-sandals-summer-footwear.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">White Sandals</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}

            <div className="group">
              <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <img src="assets/images/shop/ladies-skirt-pair.jpg" className="group-hover:scale-110 duration-500" alt="" />

                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                  <a href="shop-cart.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">Add to Cart</a>
                </div>

                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                  <li><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="heart" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="shop-item-detail.html" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="eye" className="size-4"></i></a></li>
                  <li className="mt-1"><a href="#" className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><i data-feather="bookmark" className="size-4"></i></a></li>
                </ul>
              </div>

              <div className="mt-4">
                <a href="product-detail-one.html" className="hover:text-orange-500 text-lg font-medium">Ladies Skirt</a>
                <div className="flex justify-between items-center mt-1">
                  <p>$16.00 <del className="text-slate-400">$21.00</del></p>
                  <ul className="font-medium text-amber-400 list-none">
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                    <li className="inline"><i className="mdi mdi-star"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!--end content--> */}
          </div>
          {/* <!--end grid--> */}

          <div className="grid grid-cols-1 mt-6">
            <div className="text-center md:hidden block">
              <a href="shop-grid.html" className="text-slate-400 hover:text-orange-500">See More Items <i className="mdi mdi-arrow-right"></i></a>
            </div>
          </div>
        </div>
        {/* <!--end container--> */}
      </section>
    </>
  )
}

export default home