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
    }
}

export default backendApiEndpoints