import { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import Header from './components/Header'
// import Footer from './components/Footer'
import AdminLayout from "./pages/portal/layout/Layout";
import Product from "./pages/portal/products";
import ProductForm from "./pages/portal/products/Form";
import Category from "./pages/portal/categories";
import CategoryForm from "./pages/portal/categories/Form";
import SubCategory from "./pages/portal/subCategories";
import SubCategoryForm from "./pages/portal/subCategories/Form";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ForgotPasswordOtpVerification from "./pages/ForgotPasswordOtpVerification";
import { userDetailsApi } from "./api/backendApi";
import useAuth from "./hooks/useAuth";
import { setCredentials } from "./redux/authSlice";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { useDispatch } from "react-redux";
import { getCartItems } from "./redux/cartSlice";
import Address from "./pages/Address";
import SellerBanks from "./pages/SellerBanks";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Payment from "./pages/Payment";

function App() {
  const { user, dispatch: userDispatch } = useAuth();
  const dispatch = useDispatch()
  // const { pathname } = useLocation()

  const fetchUserDetails = async () => {
    try {
      const userData = await userDetailsApi();
      if (userData.status == 200) {
        console.log(userData);
        
        userDispatch(setCredentials(userData.data.data));
      }

    } catch (error) {
      userDispatch(setCredentials(null));
      console.log(error);

      // toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (user?.userInfo) {
      dispatch(getCartItems())
    }
  }, [user?.userInfo]);


  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* {!hideLayout ?
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
          : <Outlet />}
         */}

        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Product />} />

            <Route path="category" element={<Category />} />
            <Route path="add-category" element={<CategoryForm />} />
            <Route path="edit-category/:id" element={<CategoryForm />} />

            <Route path="sub-category" element={<SubCategory />} />
            <Route path="add-sub-category" element={<SubCategoryForm />} />
            <Route path="edit-sub-category/:id" element={<SubCategoryForm />} />

            <Route path="product" element={<Product />} />
            <Route path="add-product" element={<ProductForm />} />
            <Route path="edit-product/:id" element={<ProductForm />} />

          </Route>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product-listing" element={<ProductListing />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/address" element={<Address />} />
            <Route path="/home" element={<Navigate to={"/"} />} />
            <Route path="bank-accounts" element={<SellerBanks />} />
            <Route path="payment" element={<Payment />} />
            <Route path="success" element={<PaymentSuccess />} />
            <Route path="cancel" element={<PaymentCancel />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<OtpVerification />} />
          <Route
            path="/verify-forgot-email"
            element={<ForgotPasswordOtpVerification />}
          />
          <Route path="*" element={<NotFound />} />
          {/* <Route element={<PublicRoute />}>
           
          </Route> */}
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
