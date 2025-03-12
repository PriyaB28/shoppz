import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js"
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPasswordOtp,
  resetPassword,
  sendOtp,
  verifyForgotPasswordOtp,
  userDetails,
  updateUserDetails,
  logout,
  uploadAvatar,
  googleLogin,
  stripeOnboardAccountLink,
  stripeOnboardAccountDelLink,
  getUserStripeBanks,
  getStripeAccountStatus,
  createBankAccount,
  deleteBankAccount,
  getCustomerPaymentMethods
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js"

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/verify-forgot-password", forgotPasswordOtp);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/reset-password", resetPassword);
userRouter.put('/update-user', verifyToken, updateUserDetails)
userRouter.put('/upload-avatar',verifyToken,upload.single("avatar"),uploadAvatar)
userRouter.get('/logout',verifyToken,logout)
userRouter.get("/user-details",verifyToken, userDetails);
userRouter.get("/send-otp", sendOtp);
userRouter.get("/get-account-link",verifyToken, stripeOnboardAccountLink);
userRouter.get("/get-account-status",verifyToken, getStripeAccountStatus);
userRouter.get("/get-account-banks",verifyToken, getUserStripeBanks);
userRouter.get("/del-account-link", stripeOnboardAccountDelLink);
userRouter.post("/create-bank-account",verifyToken ,createBankAccount);
userRouter.post("/delete-bank-account",verifyToken ,deleteBankAccount);
userRouter.get("/payment-methods",verifyToken ,getCustomerPaymentMethods);

export default userRouter;
