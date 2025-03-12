export const BASE_URL = "http://localhost:8000/"

const backendApiEndpoints = {
    register: {
        url: 'api/user/register',
        method: "post"
    },
    verifyEmail: {
        url: "api/user/verify-email",
        method: "post"
    },
    login: {
        url: "api/user/login",
        method: "post"
    },
    googleLogin: {
        url: "api/user/google-login",
        method: "post"
    },
    forgotPasswordOtp: {
        url: "api/user/verify-forgot-password",
        method: "post"
    },
    verifyForgotPasswordEmail: {
        url: "api/user/verify-forgot-password-otp",
        method: "post"
    },
    resetPassword: {
        url: "api/user/reset-password",
        method: "put"
    },
    updateUserProfile: {
        url: "api/user/update-user",
        method: "put"
    },
    uploadAvatar: {
        url: "api/user/upload-avatar",
        method: "put"
    },
    logout: {
        url: "api/user/logout",
        method: "get"
    },
    userDetails: {
        url: "api/user/user-details"
    },
    accountLink: {
        url: "api/user/get-account-link"
    },
    accountStatus: {
        url: "api/user/get-account-status"
    },
    accountBanks: {
        url: "api/user/get-account-banks"
    },
    createBankAccount: {
        url: "api/user/create-bank-account",
        method:"post"
    },
    deleteBankAccount: {
        url: "api/user/delete-bank-account",
        method:"post"
    },
    createPaymentIntent: {
        url: "api/order/create-payment-intent",
        method:"post"
    },
    getPaymentMethods: {
        url:"api/user/payment-methods",
    },
    categories: {
        url: "api/category"
    },
    addCategory: {
        url: "api/category",
        method: "post"
    },
    updateCategory: {
        url: "api/category",
        method:"put"
    },
    categoryById: {
        url: "api/category",
        method:"get"
    },
    deleteCategory: {
        url: "/api/category",
        method:"delete"
    },
    subCategories: {
        url: "api/sub-category"
    },
    addSubCategory: {
        url: "api/sub-category",
        method: "post"
    },
    updateSubCategory: {
        url: "api/sub-category",
        method:"put"
    },
    subCategoryById: {
        url: "api/sub-category",
        method:"get"
    },
    deleteSubCategory: {
        url: "/api/sub-category",
        method:"delete"
    },
    addProduct: {
        url: "api/product",
        method: "post"
    },
    products: {
        url: "api/product"
    },
    productById: {
        url: "api/product",
        method:"get"
    },
    updateProduct: {
        url: "api/product",
        method:"put"
    },
    addItemCart: {
        url: "api/cart",
        method:"post"
    },
    cartItems: {
        url:"api/cart",
    },
    deleteCartItem: {
        url: "/api/cart",
        method:"delete"
    },
    emptyCart: {
        url: "/api/cart/empty-cart",
        method:"delete"
    },
    updateCartItemQty: {
        url: "api/cart",
        method:"put"
    },
    addAddress: {
        url: "api/address",
        method:"post"
    },
    addresses: {
        url: "api/address",
    },
    createOrder: {
        url: "api/order",
        method:"post"
    },
    stripePayment: {
        url: "api/order/payment",
        method:"post"
    }
}

export default backendApiEndpoints