import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { loginApi } from '../api/backendApi';
import { loginSchema } from "../schema/registerSchema";
import Loader from "../components/Loader";
import GoogleLoginButton from "../components/GoogleLoginButton"

import logo from '../assets/images/home/logo-shoppz.png'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import useAuth from '../hooks/useAuth';
// import useUserDetails from '../hooks/useUserDetails';
import { setCredentials } from '../redux/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { user, dispatch } = useAuth()
  // const { loaded, setLoaded, getUserDetails } = useUserDetails()
  const navigate = useNavigate()

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  };

  useEffect(() => {
    if (user?.userInfo) {
      navigate("/")
    }
  }, [user?.userInfo])

  let mutation = useMutation({
    mutationKey: "login",
    mutationFn: (data) => loginApi(data),
    onSuccess: (response) => {
      console.log(response);

      if (response?.status == 200) {

        dispatch(setCredentials(response?.data?.data))
        // getUserDetails()

        toast.success("Logged in successfully")
        navigate("/")

      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message)
      // toast.error(error.response)
    }
  })

  let initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      mutation.mutate(values)
      // try {
      //   const response = await axios({
      //     ...backendApiEndpoints.login,
      //     data: values
      //   })
      //   if (response.status == 200) {
      //     resetForm()
      //     toast.success("Logged in successfully")
      //     navigate("/")
      //   }
      // } catch (error) {
      //   toast.error(error.response.data.message)
      // }
    },
  });
  const errorsLength = Object.values(errors).length
  return (
    <>
      <section className="md:h-screen py-36 flex items-center bg-orange-500/10 dark:bg-orange-500/20 bg-[url('./src/assets/images/bg-shape.png')] bg-center bg-no-repeat bg-cover text-white">
        <div className="container relative">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
              <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                <div className="relative md:shrink-0">
                  {/* <img className="lg:h-full h-full w-full object-cover md:h-[34rem]" src="./src/assets/images/login.jpg" alt="" /> */}
                  <img className="lg:h-full h-full w-full object-cover md:h-[36rem]" src="./src/assets/images/login.jpg" alt="" />
                </div>

                <div className="p-5 lg:px-20">
                  <div className="text-center">
                    <a href="index.html">
                      {/* <img src="assets/images/logo-dark.png" className="mx-auto block dark:hidden" alt=""/> */}
                      <img src={logo} className="mx-auto hidden dark:block" alt="" width={150} />
                    </a>
                  </div>

                  <form className="text-start lg:py-12 py-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1">
                      <div className="mb-4">
                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                        <input id="LoginEmail" type="email" className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border-2 border-gray-800 focus:border-orange-500" placeholder="name@example.com" value={values.email}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur} />
                        {touched.email && errors.email ?
                          <span className="text-red-500 text-sm">{errors.email}</span>
                          : null
                        }
                      </div>
                      <div className="mb-4">
                        <label className="font-semibold" htmlFor="LoginPassword">
                          Password:
                        </label>

                        <div className="form-icon relative mt-2 ">

                          <input type={showPassword ? "text" : 'password'} className=" w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border-2 border-gray-800 focus:border-orange-500 " placeholder="Password:"
                            autoComplete="on"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                          <button
                            aria-label="button"
                            type="button"
                            className="ti-btn ti-btn-light !mb-0 !rounded-s-none dark:border-white/10 !border-s-0 w-4 h-4 absolute top-3 end-4"
                            onClick={handleShowPassword}
                          >
                            {/* <i className="align-middle ri-eye-off-line"></i> */}
                            {showPassword ? (
                              <FaRegEye />
                            ) : (
                              <FaRegEyeSlash />
                            )}
                          </button>
                        </div>
                        {touched.password && errors.password ?
                          <span className="text-red-500 text-sm">{errors.password}</span>
                          : null
                        }
                      </div>

                      <div className="flex justify-between mb-4">
                        {/* <div className="flex items-center mb-0">
                                                <input className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe"/>
                                                <label className="form-checkbox-label text-slate-400" htmlFor="RememberMe">Remember me</label>
                                            </div> */}
                        <p className="text-slate-400 mb-0"><Link to={"/forgot-password"} className="text-slate-400">Forgot password ?</Link></p>
                      </div>

                      <div className="mb-4">
                        <button
                          type="submit"
                          className={`${errorsLength == 0 ? ' bg-orange-500' : 'bg-orange-400'} py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center text-white rounded-md w-full`}

                        > Login</button>
                      </div>
                      <div className="mb-4">
                        <GoogleLoginButton />
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
      {mutation?.isPending && <Loader />}
    </>
  )
}

export default Login