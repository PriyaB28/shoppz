import axios from "../utils/Axios";
import backendApiEndpoints from "../api/backendApiEndpoints";

const registerApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.register,
    data: data,
  });

  return response;
};
const verifyEmailOtpApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.verifyEmail,
    data: data,
  });

  return response;
};
const loginApi = async (data) => {
  // try {
  const response = await axios({
    ...backendApiEndpoints.login,
    data: data,
  });

  return response;
  // } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //         // Log specific errors for debugging
  //         if (error.response.status === 401) {
  //             console.log('401 Unauthorized handled.');
  //         } else {
  //             console.error('Error:', error.response.status, error.response.data);
  //         }
  //     } else if (error.request) {
  //         console.error('No response from server:', error.request);
  //     } else {
  //         console.error('Error setting up request:', error.message);
  //     }
  // }
};

const googleLoginApi = async (data) => {
  console.log("g api");

  const response = await axios({
    ...backendApiEndpoints.googleLogin,
    data,
  });
  return response;
};

const forgotPasswordOtpApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.forgotPasswordOtp,
    data: data,
  });

  return response;
};

const verifyForgotPasswordEmailApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.verifyForgotPasswordEmail,
    data: data,
  });

  return response;
};

const resetPasswordApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.resetPassword,
    data: data,
  });

  return response;
};

const updateUserProfileApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.updateUserProfile,
    data: data,
  });

  return response;
};

const uploadAvatar = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.uploadAvatar,
    data: data,
  });

  return response;
};

const logoutApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.logout,
  });
  
  return response;
};

const userDetailsApi = async () => {
  const response = await axios({
    ...backendApiEndpoints.userDetails,
  });
  
  return response;
};

const onBoardingLinkApi = async () => {
  const response = await axios({
    ...backendApiEndpoints.accountLink,
  });
  
  return response;
};

const onBoardingStatusApi = async () => {
  const response = await axios({
    ...backendApiEndpoints.accountStatus,
  });
  
  return response;
};

const getSellerStripeBanksApi = async () => {
  const response = await axios({
    ...backendApiEndpoints.accountBanks,
  });
  
  return response;
};

const createBankAccountApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.createBankAccount,
    data: data,
  });

  return response;
};

const deleteBankAccountApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.deleteBankAccount,
    data: data,
  });

  return response;
};

const createPaymentIntentApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.createPaymentIntent,
    data: data,
  });

  return response;
};

const getPaymentMethodsApi = async (page = 1, limit = 4) => {

  const response = await axios({
    ...backendApiEndpoints.getPaymentMethods,
  });
  return response;
};

const getCategoriesApi = async (page = 1, limit = 4) => {
  let url = backendApiEndpoints.categories.url + `?page=${page}&limit=${limit}`;
  const response = await axios({
    ...backendApiEndpoints.categories,
    url,
  });
  return response;
};

const addCategoryApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.addCategory,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const updateCategoryApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.updateCategory,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const getCategoryByIdApi = async (id) => {
  const url = backendApiEndpoints.categoryById.url + "/" + id;
  
  const response = await axios({
    ...backendApiEndpoints.categoryById,
    url,
  });
  return response;
};

const deleteCategoryByIdApi = async (id) => {
  const url = backendApiEndpoints.deleteCategory.url + "/" + id;
  
  const response = await axios({
    ...backendApiEndpoints.deleteCategory,
    url,
  });
  return response;
};

const addSubCategoryApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.addSubCategory,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const getSubCategoriesApi = async (page = 1, limit = 4) => {
  let url = backendApiEndpoints.subCategories.url + `?page=${page}&limit=${limit}`;
  const response = await axios({
    ...backendApiEndpoints.subCategories,
    url,
  });
  return response;
};


const getSubCategoryByIdApi = async (id) => {
  const url = backendApiEndpoints.subCategoryById.url + "/" + id;
  
  const response = await axios({
    ...backendApiEndpoints.subCategoryById,
    url,
  });
  return response;
};


const updateSubCategoryApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.updateSubCategory,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const deleteSubCategoryByIdApi = async (id) => {
  const url = backendApiEndpoints.deleteSubCategory.url + "/" + id;
  
  const response = await axios({
    ...backendApiEndpoints.deleteSubCategory,
    url,
  });
  return response;
};

const addProductApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.addProduct,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
const getProductsApi = async (page = 1, limit = 4) => {
  let url = backendApiEndpoints.products.url + `?page=${page}&limit=${limit}`;
  const response = await axios({
    ...backendApiEndpoints.products,
    url,
  });
  return response;
};

const getProductByIdApi = async (id) => {
  const url = backendApiEndpoints.productById.url + "/" + id;
  
  const response = await axios({
    ...backendApiEndpoints.productById,
    url,
  });
  return response;
};

const updateProductApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.updateProduct,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const addItemCartApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.addItemCart,
    data: data
  });
  return response;
};

const getCartItemsApi = async () => {
  const response = await axios({
    ...backendApiEndpoints.cartItems,
  });
  
  return response;
};

const deleteCartItemApi = async (data) => {
  
  const response = await axios({
    ...backendApiEndpoints.deleteCartItem,
    data,
  });
  return response;
};

const emptyCartApi = async (data) => {
  
  const response = await axios({
    ...backendApiEndpoints.emptyCart,
    data,
  });
  return response;
};

const updateCartItemQtyApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.updateCartItemQty,
    data: data
  });
  return response;
};

const addAddressApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.addAddress,
    data: data
  });
  return response;
};


const getAddressesApi = async () => {
  const response = await axios({
    ...backendApiEndpoints.addresses,
  });
  return response;
};

const createOrderApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.createOrder,
    data: data
  });
  return response;
};

const stripePaymentApi = async (data) => {
  const response = await axios({
    ...backendApiEndpoints.stripePayment,
    data: data
  });
  return response;
};


export {
  registerApi,
  forgotPasswordOtpApi,
  verifyEmailOtpApi,
  loginApi,
  googleLoginApi,
  resetPasswordApi,
  verifyForgotPasswordEmailApi,
  updateUserProfileApi,
  uploadAvatar,
  logoutApi,
  userDetailsApi,
  onBoardingLinkApi,
  onBoardingStatusApi,
  getSellerStripeBanksApi,
  createBankAccountApi,
  deleteBankAccountApi,
  createPaymentIntentApi,
  getPaymentMethodsApi,
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  getCategoryByIdApi,
  deleteCategoryByIdApi,
  addSubCategoryApi,
  getSubCategoriesApi,
  getSubCategoryByIdApi,
  updateSubCategoryApi,
  deleteSubCategoryByIdApi,
  addProductApi,
  getProductsApi,
  getProductByIdApi,
  updateProductApi,
  addItemCartApi,
  getCartItemsApi,
  deleteCartItemApi,
  emptyCartApi,
  updateCartItemQtyApi,
  addAddressApi,
  getAddressesApi,
  createOrderApi,
  stripePaymentApi
};
