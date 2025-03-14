import validator from 'validator'

import userModel from "../models/user.model.js";
import generatedOtp from '../utils/generateOtp.js'
import sendMail from "../config/sendEmail.js";
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import UserModel from "../models/user.model.js";
import { generateTokenAndCookies } from '../utils/generateTokenAndCookies.js';
import oauth2Client from '../utils/googleClient.js';
import Stripe from "../config/stripe.js"

import twilio from "twilio"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerUser = async (req, res) => {
    try {
        const imageURL = `${process.env.FRONTEND_IMAGES_URL}/logo.png`;

        var isEmpty = Object.entries(req.body).length > 0;
        if (!isEmpty) {
            throw new Error("Please provide data");
        }
        const { name, email, password } = req.body

        if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }

        if (password.length < 8) {
            throw new Error("Please enter a strong password");
        }
        const userExist = await userModel.findOne({
            email
        })

        if (userExist) {
            throw new Error("User with entered email already exits");
        }

        // const salt = await bcryptjs.genSalt(10)
        // const hashedPassword = await bcryptjs.hash(password, salt)

        const otp = generatedOtp()

        const stripeCustomer = await Stripe.customers.create({
            name: name,
            email: email,
        });

        const payload = {
            customerId: stripeCustomer.id,
            name,
            email,
            password,
            verificationCode: otp,
            verificationCodeExpireAt: Date.now() + 5 * 60 * 1000
        }
        const newUser = await userModel(payload)
        const user = await newUser.save()

        await sendVerificationEmail(imageURL, user, otp, res)

        const userData = {
            id: user._id,
            email: user.email
        }
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: userData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const sendVerificationEmail = async (imageURL, { _id, email }, otp, res) => {
    try {
        const verifyEmailFrontendLink = `${process.env.FRONTEND_URL}/verify-email?code=${_id}`
        await sendMail({
            sendTo: email,
            subject: "Email verification OTP  from shoppz",
            html: verifyEmailTemplate(imageURL, otp)
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
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not registered"
            })
        }
        if (!user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email before login."
            })
        }
        if (user.status !== "Active") {
            return res.status(400).json({
                success: false,
                message: "User is deactivated. Please contact admin"
            })
        }
        const checkPassword = await user.comparePassword(password)

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }
        user.lastLoginDate = new Date()
        await user.save()
        generateTokenAndCookies(res, user._id)

        // const cookieOptions = {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "None"
        // }
        const { password: pw, ...rest } = user._doc
        // res.cookie('accessToken', accessToken, cookieOptions)
        return res.json({
            success: true,
            message: "User logged in successfully",
            data: rest
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const googleLogin = async (req, res) => { //create a common function for social logins by passing id and type of social login from frontend
    try {
        console.log(req.body);
        let code = req.body.code
        const { tokens } = await oauth2Client.getToken(code)
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
        console.log(email, name, picture);
        // oauth2Client.setCredentials(tokens);
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name,
                email,
                avatar: picture,
                isEmailVerified: true,
                isGoogleLoggedIn: true
            });
        }

        generateTokenAndCookies(res, user._id)
        const { password: pw, ...rest } = user._doc
        // res.cookie('accessToken', accessToken, cookieOptions)
        return res.json({
            success: true,
            message: "User logged in successfully",
            data: rest
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
        const { otp, id, email } = req.body

        const user = await userModel.findOne({
            _id: id,
            verificationCode: otp,
            verificationCodeExpireAt: { $gt: Date.now() },
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }

        if (user.isEmailVerified) {
            return res.json({
                success: true,
                message: "Email already verified"
            })
        }

        user.isEmailVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpireAt = null;
        const userSave = await user.save();

        if (userSave) {
            return res.json({
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

const forgotPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body
        const userExist = await UserModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        if (!userExist.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email before forgot password"
            })
        }

        // const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        //     expiresIn: "4m",
        // });
        const otp = generatedOtp()

        userExist.resetPasswordCode = otp
        userExist.resetPasswordCodeExpireAt = Date.now() + 5 * 60 * 1000
        const user = await userExist.save()

        // const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        await sendMail({
            sendTo: email,
            subject: "Reset password otp from shoppz",
            html: verifyEmailTemplate("", otp)
        })
        res.json({
            success: true,
            message: "User verified",
            data: {
                email
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }


}


const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { otp, email } = req.body

        const user = await userModel.findOne({
            email,
            resetPasswordCode: otp,
            resetPasswordCodeExpireAt: { $gt: Date.now() },
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }

        user.resetPasswordCode = null;
        user.resetPasswordCodeExpireAt = null;
        const userSave = await user.save();

        if (userSave) {
            return res.json({
                message: "Email verified successfully",
                success: true,
                data: { email }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body

        // const decode = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET_KEY, function (err, decoded) {
        //     if (err) {
        //         throw new Error("Reset token expired");
        //     }
        //     return decoded
        // })
        // let email = decode.email

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not registered",
                success: false
            })
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email "
            })
        }

        // const salt = await bcryptjs.genSalt(10)
        // const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = password
        await user.save();

        res.json({
            success: true,
            message: "Passsword reset successfull",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId //auth middleware
        const { name, email, phone, password } = req.body

        let hashPassword = ""

        if (password) {
            const checkOldPassword = userModel.comparePassword(password)
            if (checkOldPassword) {
                throw new Error("New password must be different from old password");
            }
        }

        const updateUser = await UserModel.findOneAndUpdate({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(phone && { phone: phone }),
            ...(password && { password: hashPassword })
        }, {
            new: true
        })

        const { password: pw, ...rest } = updateUser._doc
        return res.json({
            message: "Updated successfully",
            success: true,
            data: rest
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

const uploadAvatar = async (req, res) => {
    try {
        const userId = req.userId // auth middlware
        const image = req.file  // multer middleware

        const existingAvatarPath = await UserModel.findById(userId)
        let oldAvatar = path.parse(existingAvatarPath.avatar).base
        let unlinkPath = path.dirname(__dirname) + "/tmp/uploads/" + oldAvatar

        fs.unlink(unlinkPath, (err) => {
            console.log(err);
        })

        const imagePath = image.path.replaceAll("\\", "/").replace("tmp", "")
        let imageURL = req.protocol + '://' + req.get('host') + imagePath;

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: imageURL
        })

        if (!updateUser) {
            throw new Error("Unable to upload Image");
        }

        return res.json({
            message: "upload profile",
            success: true,
            data: {
                _id: userId,
                avatar: imageURL
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const logout = async (req, res) => {
    try {
        const userid = req.userId //middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie("token", cookiesOption)

        // const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
        //     refresh_token : ""
        // })

        return res.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


const userDetails = async (req, res) => {
    try {
        const userId = req.userId
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        return res.json({
            success: true,
            data: {
                ...user._doc, password: null
            },
            message: "user details fetched"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const sendOtp = async (req, res) => {
    try {
        const { number } = req.body
        if (!number) {
            throw new Error("Please provide number");
        }
        const otp = generatedOtp()

        await client.messages.create({
            body: otp,
            from: process.env.TWILIO_FROM_NUMBER,
            to: number,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const stripeOnboardAccountLink = async (req, res) => {
    try {

        const userId = req.userId

        const userDetails = await userModel.findById(userId);
        if (!userDetails) {
            throw new Error("User not found");
        }

        let accountId = "";
        if (!userDetails.accountId) {
            const account = await Stripe.accounts.create({
                type: "custom",
                email: userDetails?.email
            });
            userDetails.accountId = account.id
            userDetails.save()
            accountId = account.id
        }
        accountId = userDetails.accountId


        const accountLink = await Stripe.accountLinks.create({
            account: accountId,
            refresh_url: "http://localhost:5173/bank-accounts",
            return_url: "http://localhost:5173/bank-accounts",
            type: "account_onboarding",
        });

        return res.json({
            success: true,
            url: accountLink.url,
            message: "user details fetched"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getStripeAccountStatus = async (req, res) => {
    try {
        const userId = req.userId
        const userDetails = await userModel.findById(userId)
        if (!userDetails) {
            throw new Error("User not found");
        }

        const account = await Stripe.accounts.retrieve(userDetails.accountId);
        if (account.payouts_enabled) {
            userDetails.onBoarded = true
            userDetails.save()
        }

        return res.json({
            success: true,
            data: userDetails,
            message: "account details fetched"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const stripeOnboardAccountDelLink = async (req, res) => {

    // const accounts = await Stripe.accounts.list({

    // });
    //     console.log(accounts);
    //     return
    const deleted = await Stripe.accounts.del('acct_1QyreO2KunZ48vGp');
    const deleted1 = await Stripe.accounts.del('acct_1QyrmPRrOb1dS0kd');
    const deleted2 = await Stripe.accounts.del('acct_1QysNwRs38vbRkIH');
    // const deleted3 = await Stripe.accounts.del('acct_1Qyt5R2Kgtw0zxmx');
    // const deleted4 = await Stripe.accounts.del('acct_1QyrRhRxL2EwsUeb');
    // const deleted5 = await Stripe.accounts.del('acct_1QyrRr2L5HlcrTR2');
    return;
}

const getUserStripeBanks = async (req, res) => {
    try {
        const userId = req.userId
        const userDetails = await userModel.findById(userId);
        const externalAccounts = await Stripe.accounts.listExternalAccounts(
            userDetails.accountId,
            {
                object: 'bank_account',
            }
        );
        let bankIds = externalAccounts.data.map(a => a.id);
        return res.json({
            success: true,
            accounts: externalAccounts.data,
            message: "user details fetched"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const createBankAccount = async (req, res) => {
    try {
        const userId = req.userId
        const data = req.body

        if (!data.token) {
            throw new Error("Please provide token");
        }
        const userDetails = await userModel.findById(userId);
        const customerSource = await Stripe.accounts.createExternalAccount(
            userDetails.accountId,
            {
                external_account: data.token,
            }
        );

        return res.json({
            success: true,
            account: customerSource,
            message: "Bank account created"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteBankAccount = async (req, res) => {
    try {
        const data = req.body
        const userId = req.userId
        const userDetails = await userModel.findById(userId);
        const externalAccounts = await Stripe.accounts.deleteExternalAccount(
            userDetails.accountId,
            data.bankId
        );

        return res.json({
            success: true,
            accounts: externalAccounts.data,
            message: "Bank Account Deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getCustomerPaymentMethods = async (req, res) => {
    try {
        const userId = req.userId
        const userDetails = await userModel.findById(userId);
        const paymentMethods = await Stripe.customers.listPaymentMethods(
            userDetails.customerId,
            {
                limit: 3,
            }
        );
       

        let cards = paymentMethods.data.map(item => ({
            id: item.id,
            brand: item.card.brand,
            exp_month: item.card.exp_month,
            exp_year: item.card.exp_year,
            last4: item.card.last4
        }))
      
        return res.json({
            success: true,
            cards: cards,
            message: "Payment methods fetched"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export { registerUser, verifyEmail, loginUser, googleLogin, forgotPasswordOtp, verifyForgotPasswordOtp, resetPassword, updateUserDetails, logout, userDetails, sendOtp, uploadAvatar, stripeOnboardAccountLink, getStripeAccountStatus, getUserStripeBanks, stripeOnboardAccountDelLink, createBankAccount, deleteBankAccount, getCustomerPaymentMethods }