import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import validator from 'validator'

import generateAccessToken from '../utils/generateAccessToken.js'
import generatedOtp from '../utils/generateOtp.js'
import sendMail from "../config/sendEmail.js";
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import forgotPasswordOtp from '../utils/forgetPasswordOtp.js'
import UserModel from "../models/user.model.js";


const registerUser = async (req, res) => {
    try {
        var isEmpty = Object.entries(req.body).length > 0;
        if (!isEmpty) {
            throw new Error("Please provide data");
        }
        const { name, email, password } = req.body

        const alreadyExist = await userModel.findOne({ email })

        if (alreadyExist) {
            throw new Error("User with entered email already exits");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }
        if (password.length < 8) {
            throw new Error("Please enter a strong password");
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = await userModel(payload)
        const user = await newUser.save()

        const imageURL = `${process.env.FRONTEND_IMAGES_URL}/logo.png`;
        const verifyEmailFrontendLink = `${process.env.FRONTEND_URL}/verify-email?code=${user._id}`

        const verficationEmail = await sendMail({
            sendTo: email,
            subject: "Verify your email from shoppz",
            html: verifyEmailTemplate(imageURL, verifyEmailFrontendLink)
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user._id
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user.verify_email) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email before login"
            })
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not registered"
            })
        }
        if (user.status !== "Active") {
            return res.status(400).json({
                success: false,
                message: "User is deactivated. Please contact admin"
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const accessToken = await generateAccessToken(user._id)

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookieOptions)
        return res.json({
            success: true,
            message: "User logged in successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body
        const userExist = await userModel.findOne({ _id: code })
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Verification code is invalid"
            })
        }
        const updateUser = await userModel.updateOne({ _id: code }, {
            verify_email: true
        })

        if (updateUser) {
            return response.json({
                message: "User verified successfully",
                success: true,
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const userExist = await UserModel.findOne({ email })
        if (!userExist) {
            return response.status(400).json({
                message: "Email not registered",
                success: false
            })
        }

        const otp = generatedOtp()
        const date = new Date();
        date.setMinutes(date.getMinutes() + 45); //adding 45 minutes

        // const updateUser = await UserModel.findByIdAndUpdate({ userExist._id }, {
        //     forgot_password_otp: otp,
        //     forgot_password_expiry: date
        // })

        await sendMail({
            sendTo: email,
            subject: "Forgot password otp from shoppz",
            html: forgotPasswordOtp(otp)
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

export { registerUser, loginUser, verifyEmail, forgotPassword }