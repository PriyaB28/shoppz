import React from 'react'

import logo from '../assets/images/home/logo-shoppz.png'
import { MdOutlineChevronRight } from "react-icons/md";
import { GoMail } from "react-icons/go";

const Footer = () => {
  return (
    // <!-- Footer Start -->
    <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="py-[60px] px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                {/* <div className="lg:col-span-3 md:col-span-12"> */}
                <div className="lg:col-span-3 md:col-span-3">
                  <a href="#" className="text-[22px] focus:outline-none">
                    <img src={logo} alt="" width={100} height={50} />
                  </a>
                  <p className="mt-6 text-gray-300">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>
                  <ul className="list-none mt-6">
                    <li className="inline">
                      <a href="https://dribbble.com/shreethemes" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><i data-feather="dribbble" className="h-4 w-4 align-middle" title="dribbble"></i></a>
                    </li>
                    <li className="inline">
                      <a href="http://linkedin.com/company/shreethemes" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><i data-feather="linkedin" className="h-4 w-4 align-middle" title="Linkedin"></i></a>
                    </li>
                    <li className="inline">
                      <a href="https://www.facebook.com/shreethemes" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><i data-feather="facebook" className="h-4 w-4 align-middle" title="facebook"></i></a>
                    </li>
                    <li className="inline">
                      <a href="https://www.instagram.com/shreethemes/" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><i data-feather="instagram" className="h-4 w-4 align-middle" title="instagram"></i></a>
                    </li>
                    <li className="inline">
                      <a href="https://x.com/shreethemes" target="_blank" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"><i data-feather="twitter" className="h-4 w-4 align-middle" title="twitter"></i></a>
                    </li>
                    <li className="inline">
                      <a href="mailto:support@shreethemes.in" className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300">
                        <i data-feather="mail" className="h-4 w-4 align-middle" title="email"></i></a>
                    </li>
                  </ul>
                  {/* <!--end icon--> */}
                </div>
                {/* <!--end col--> */}

                {/* <div className="lg:col-span-6 md:col-span-12"> */}
                <div className="lg:col-span-6 md:col-span-6">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">Shopping & Clothes</h5>

                  <div className="grid md:grid-cols-12 grid-cols-1">
                    <div className="md:col-span-4">
                      <ul className="list-none footer-list mt-6">
                        <li><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Men</a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Jackets & Coats </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Jeans </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/>  Loungewear </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Polo shirts </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Shirts</a>
                        </li>
                      </ul>
                    </div>
                    {/* <!--end col--> */}

                    <div className="md:col-span-4">
                      <ul className="list-none footer-list mt-6">
                        <li><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Shorts </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Suits Swimwear </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> T-shirts </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Tracksuits </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Trousers</a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Shirts</a>
                        </li>
                      </ul>
                    </div>
                    {/* <!--end col--> */}

                    <div className="md:col-span-4">
                      <ul className="list-none footer-list mt-6">
                        <li><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> My account </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Order History </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Wish List </a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Newsletter</a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Affiliate</a>
                        </li>
                        <li className="mt-[10px]"><a href="#" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><MdOutlineChevronRight/> Returns</a>
                        </li>
                      </ul>
                    </div>
                    {/* <!--end col--> */}
                  </div>
                </div>

                {/* <div className="lg:col-span-3 md:col-span-4"> */}
                <div className="lg:col-span-3 md:col-span-3">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">Newsletter</h5>
                  <p className="mt-6">Sign up and receive the latest tips via email.</p>
                  <form>
                    <div className="grid grid-cols-1">
                      <div className="my-3">
                        <label className="form-label">Write your email <span className="text-red-600">*</span></label>
                        <div className="form-icon relative mt-2">
                          <GoMail className="size-4 absolute top-3 start-4"/>
                          <i data-feather="mail" className="size-4 absolute top-3 start-4"></i>
                          <input type="email" className="ps-12 rounded w-full py-2 px-3 h-10 bg-gray-800 border-0 text-gray-100 focus:shadow-none focus:ring-0 placeholder:text-gray-200 outline-none" placeholder="Email" name="email" required=""/>
                        </div>
                      </div>

                      <button type="submit" id="submitsubscribe" name="send" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md">Subscribe</button>
                    </div>
                  </form>
                </div>
                {/* <!--end col--> */}
              </div>
              {/* <!--end grid--> */}
            </div>
            {/* <!--end col--> */}
          </div>
        </div>
        {/* <!--end grid--> */}

        <div className="grid grid-cols-1">
          <div className="py-[30px] px-0 border-t border-slate-800">
            {/* <div className="grid lg:grid-cols-4 md:grid-cols-2"> */}
            <div className="grid lg:grid-cols-4 md:grid-cols-4">
              <div className="flex items-center lg:justify-center">
                <i className="mdi mdi-truck-check-outline align-middle text-lg mb-0 me-2"></i>
                <h6 className="mb-0 font-medium">Free delivery</h6>
              </div>
              {/* <!--end content--> */}

              <div className="flex items-center lg:justify-center">
                <i className="mdi mdi-archive align-middle text-lg mb-0 me-2"></i>
                <h6 className="mb-0 font-medium">Non-contact shipping</h6>
              </div>
              {/* <!--end content--> */}

              <div className="flex items-center lg:justify-center">
                <i className="mdi mdi-cash-multiple align-middle text-lg mb-0 me-2"></i>
                <h6 className="mb-0 font-medium">Money-back quarantee</h6>
              </div>
              {/* <!--end content--> */}

              <div className="flex items-center lg:justify-center">
                <i className="mdi mdi-shield-check align-middle text-lg mb-0 me-2"></i>
                <h6 className="mb-0 font-medium">Secure payments</h6>
              </div>
              {/* <!--end content--> */}
            </div>
            {/* <!--end grid--> */}
          </div>
          {/* <!--end--> */}
        </div>
        {/* <!--end grid--> */}
      </div>
      {/* <!--end container--> */}

      <div className="py-[30px] px-0 border-t border-slate-800">
        <div className="container relative text-center">
          <div className="grid md:grid-cols-2 items-center">
            <div className="md:text-start text-center">
              <p className="mb-0">© <script>document.write(new Date().getFullYear())</script> Cartzio. Design with <i className="mdi mdi-heart text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</a>.</p>
            </div>

            <ul className="list-none md:text-end text-center mt-6 md:mt-0 flex flex-row-reverse gap-1">
              <li className="inline">
                <a href="#"><img src="../src/assets/images/home/payments/american-express.jpg" className="max-h-6 rounded inline" title="American Express" alt="" /></a>
              </li>
              <li className="inline">
                <a href="#"><img src="../src/assets/images/home/payments/discover.jpg" className="max-h-6 rounded inline" title="Discover" alt="" /></a>
              </li>
              <li className="inline">
                <a href="#"><img src="../src/assets/images/home/payments/mastercard.jpg" className="max-h-6 rounded inline" title="Master Card" alt="" /></a>
              </li>
              <li className="inline">
                <a href="#"><img src="../src/assets/images/home/payments/paypal.jpg" className="max-h-6 rounded inline" title="Paypal" alt="" /></a>
              </li>
              <li className="inline">
                <a href="#"><img src="../src/assets/images/home/payments/visa.jpg" className="max-h-6 rounded inline" title="Visa" alt="" /></a>
              </li>
            </ul>
          </div>
          {/* <!--end grid--> */}
        </div>
        {/* <!--end container--> */}
      </div>
    </footer>
  )
}

export default Footer