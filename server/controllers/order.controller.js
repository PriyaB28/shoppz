import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";
import UserModel from "../models/user.model.js";
import Stripe from "../config/stripe.js"

export const createOrder = async (req, res) => {

    try {
        let data = req.body
        let userId = req.userId

        let productIds = [];
        data.products.map((item) => {
            productIds.push(item?.productId?._id)
        })

        let payload = {
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            products: productIds,
            paymentId: data.paymentId,
            paymentStatus: data.paymentStatus,
            deliveryAddress: data.deliveryAddressId,
            totalAmt: data.totalAmt
        }

        let newOrder = new OrderModel(payload)
        await newOrder.save().then(t => t.populate('products')).then(t => t);

        if (!newOrder) {
            throw new Error("Unable to create order");
        }


        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const stripePayment = async (req, res) => {
    try {
        let data = req.body
        let userId = req.userId
        console.log(data);
        return;
        let productIds = [];
        data.products.map((item) => {
            productIds.push(item?.productId?._id)
        })
        let userDetails = await UserModel.findById(userId)
        const listItems = data.products.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productId.name,
                        images: [item.paymentId?.images?.[0]],
                        metadata: {
                            productId: item.productId._id
                        }
                    },
                    unit_amount: item.productId.afterDiscountPrice * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        })

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            line_items: listItems,
            customer_email: userDetails.email,
            success_url: process.env.FRONTEND_URL + "/success",
            cancel_url: process.env.FRONTEND_URL + "/cancel"
        }
        const session = await Stripe.checkout.sessions.create(params)

        // let payload = {
        //     userId: userId,
        //     orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        //     products: productIds,
        //     paymentId: data.paymentId,
        //     paymentStatus: data.paymentStatus,
        //     deliveryAddress: data.deliveryAddressId,
        //     totalAmt: data.totalAmt
        // }

        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: session
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createPaymentIntent = async (req, res) => {
    try {
        let userId = req.userId
        let { amount, currency,paymentMethod } = req.body;
        amount = amount * 10
        let userDetails = await UserModel.findById(userId)
        const paymentIntent = await Stripe.paymentIntents.create({
            amount,
            currency,
            customer: userDetails.customerId,
            confirm: true,
            payment_method: paymentMethod,
            return_url:"http://localhost:5173/payment",
            transfer_data: {
                destination: "acct_1QzErrRtWLkwN2R7", // The Stripe Connect account to receive the funds
              },
        });
        console.log(paymentIntent);


        res.status(200).json({
            success: true,
            message: "Order created successfully",
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// export const stripePayment = async (req,res) => {
//     try {
//         let data = req.body
//         let userId = req.userId

//         let productIds = [];
//         data.products.map((item) => {
//             productIds.push(item?.productId?._id)
//         })
//         let userDetails = await UserModel.findById(userId)
//         const listItems = data.products.map((item) => {
//             return {
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: item.productId.name,
//                         images: [item.paymentId?.images?.[0]],
//                         metadata: {
//                             productId: item.productId._id
//                         }
//                     },
//                     unit_amount : item.productId.afterDiscountPrice *100
//                 },
//                 adjustable_quantity: {
//                     enabled: true,
//                     minimum:1
//                 },
//                 quantity:item.quantity
//             }
//         })

//         const params = {
//             submit_type: "pay",
//             mode: "payment",
//             payment_method_types: ["card"],
//             line_items: listItems,
//             customer_email:userDetails.email,
//             success_url:process.env.FRONTEND_URL+"/success",
//             cancel_url:process.env.FRONTEND_URL+"/cancel"
//         }
//         const session = await Stripe.checkout.sessions.create(params)

//         // let payload = {
//         //     userId: userId,
//         //     orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//         //     products: productIds,
//         //     paymentId: data.paymentId,
//         //     paymentStatus: data.paymentStatus,
//         //     deliveryAddress: data.deliveryAddressId,
//         //     totalAmt: data.totalAmt
//         // }

//         res.status(200).json({
//             success: true,
//             message: "Order created successfully",
//             data: session
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }
