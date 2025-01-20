import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import validator from 'validator'
import generateAccessToken from '../utils/generateAccessToken.js'

const registerUser = async (req, res) => {
    try {

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
        // console.log(user);

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
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

export { registerUser, loginUser }