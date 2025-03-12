import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product"

            // name: {
            //     type: String,
            // },
            // quantity: {
            //     type:Number,
            // },
            // price: {

            // }

        }],
    paymentId: {
        type: String,
        default: ""
    },
    paymentStatus: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: String,
        default: "PENDING"
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel