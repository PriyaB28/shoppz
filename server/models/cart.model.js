import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        required: [true],
        ref: "Product",
    },
    quantity:
    {
        type: Number,
        default: 1
    },
    totalPrice:
    {
        type: Number,
        required:true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const CartModel = mongoose.model("Cart", cartSchema)

export default CartModel