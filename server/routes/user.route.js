import { Router } from "express";
import {registerUser,loginUser,verifyEmail,forgotPassword} from "../controllers/user.controller.js"
const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/verify-email', verifyEmail)
userRouter.put('/forgot-password', forgotPassword)

export default userRouter