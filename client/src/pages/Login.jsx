import { Link } from 'react-router'
import logo from '../assets/images/home/logo-shoppz.png'
const Login = () => {
  return (
    <section className="md:h-screen py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 bg-[url('./src/assets/images/bg-shape.png')] bg-center bg-no-repeat bg-cover text-white">
      <div className="container relative">
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center">
              <div className="relative md:shrink-0">
                <img className="lg:h-full h-full w-full object-cover md:h-[34rem]" src="./src/assets/images/login.jpg" alt="" />
              </div>

              <div className="p-8 lg:px-20">
                <div className="text-center">
                  <a href="index.html">
                    {/* <img src="assets/images/logo-dark.png" className="mx-auto block dark:hidden" alt=""/> */}
                    <img src={logo} className="mx-auto hidden dark:block" alt="" width={150} />
                  </a>
                </div>

                <form className="text-start lg:py-12 py-8">
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" for="LoginEmail">Email Address:</label>
                      <input id="LoginEmail" type="email" className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" placeholder="name@example.com" />
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" for="LoginPassword">Password:</label>
                      <input id="LoginPassword" type="password" className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" placeholder="Password:" />
                    </div>

                    <div className="flex justify-between mb-4">
                      {/* <div className="flex items-center mb-0">
                                                <input className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe"/>
                                                <label className="form-checkbox-label text-slate-400" for="RememberMe">Remember me</label>
                                            </div> */}
                      <p className="text-slate-400 mb-0"><a href="forgot-password.html" className="text-slate-400">Forgot password ?</a></p>
                    </div>

                    <div className="mb-4">
                      <input type="submit" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md w-full" value="Login / Sign in" />
                    </div>

                    <div className="text-center">
                      <span className="text-slate-400 me-2">Don't have an account ?</span>
                      <Link to={"/register"} className="text-black dark:text-white font-bold inline-block">Sign Up</Link>
                    </div>
                  </div>
                </form>

                <div className="text-center">
                  <p className="mb-0 text-slate-400">© <script>document.write(new Date().getFullYear())</script> Cartzio. Design with <i className="mdi mdi-heart text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login