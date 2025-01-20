import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    role: {
        type: String,
        enum: ['ADMIN', "USER"],
        default: "USER"
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel

