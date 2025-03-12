import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        default: null
    },
    onBoarded: {
        type: Boolean,
        default: false
    },
    detailsComplete: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    phone: {
        type: Number,
        unique: true,
    },
    password: {
        type: String,
        required: [isGoogleLoggedIn, "provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: ""
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isNumberVerified: {
        type: Boolean,
        default: false
    },
    lastLoginDate: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    // forgot_password_otp: {
    //     type: String,
    //     default: null
    // },
    // forgot_password_expiry: {
    //     type: Date,
    //     default: ""
    // },
    isGoogleLoggedIn: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN', "USER", "SELLER"],
        default: "USER"
    },
    verificationCode: Number,
    verificationCodeExpireAt: Date,
    resetPasswordCode: Number,
    resetPasswordCodeExpireAt: Date,
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)

});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
};

function isGoogleLoggedIn() {
    if (this.isGoogleLoggedIn === true) {
        return false;
    }
    return true;
}

const UserModel = mongoose.model("User", userSchema)

export default UserModel

