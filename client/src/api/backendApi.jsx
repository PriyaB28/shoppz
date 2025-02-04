
import axios from "../utils/Axios"
import backendApiEndpoints from "../api/backendApiEndpoints";

const registerApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.register,
        data: data
    })

    return response
}
const verifyEmailOtpApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.verifyEmail,
        data: data
    })

    return response
}
const loginApi = async (data) => {
    // try {
    const response = await axios({
        ...backendApiEndpoints.login,
        data: data
    })

    return response
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
}

const googleLoginApi = async (data) => {
    console.log("g api");
    
    const response = await axios({
        ...backendApiEndpoints.googleLogin,
        data
    })
    return response
}

const forgotPasswordOtpApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.forgotPasswordOtp,
        data: data
    })

    return response
}

const verifyForgotPasswordEmailApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.verifyForgotPasswordEmail,
        data: data
    })

    return response
}

const resetPasswordApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.resetPassword,
        data: data
    })

    return response
}

const updateUserProfileApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.updateUserProfile,
        data: data
    })

    return response
}

const uploadAvatar = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.uploadAvatar,
        data: data
    })

    return response
}

const logoutApi = async (data) => {
    const response = await axios({
        ...backendApiEndpoints.logout
    })

    return response
}


const userDetailsApi = async () => {

    const response = await axios({
        ...backendApiEndpoints.userDetails
    })

    return response
}

export { registerApi, forgotPasswordOtpApi, verifyEmailOtpApi, loginApi,googleLoginApi, resetPasswordApi, verifyForgotPasswordEmailApi, updateUserProfileApi, uploadAvatar, logoutApi, userDetailsApi }