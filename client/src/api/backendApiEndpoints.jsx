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
        method:"post"
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
}

export default backendApiEndpoints