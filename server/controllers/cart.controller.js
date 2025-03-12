import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";


import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"
import mongoose from 'mongoose';
// const objectId = mongoose.Types.ObjectId
import { ObjectId } from 'mongodb'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
export const createCart = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.userId
        // const category = await CategoryModel.findById(catId);
        // if (!category) {
        //     return res.status(404).json({ success: false, message: "Category not found" });
        // }

        if (!data.productId) {
            throw new Error("Please provide product Id");
        }

        const product = await ProductModel.findById(data.productId);

        const checkItemCart = await CartModel.findOne({
            productId: data.productId,
            userId: userId
        })

        if (checkItemCart) {
            throw new Error("Item already in cart");

        }
        const payload = {
            ...data,
            totalPrice: (product.afterDiscountPrice * data.quantity),
        };


        const cart = new CartModel(payload)
        await cart.save().then(t => t.populate('productId')).then(t => t);

        if (!cart) {
            throw new Error("Unable to save cart");
        }

        res.status(200).json({
            success: true,
            message: "Added to cart",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getCartItems = async (req, res) => {
    try {

        // const page = req.query.page || 1;
        // const limit = req.query.limit || 5;

        // // Calculate the offset
        // const offset = (page - 1) * limit;
        const userId = req.userId

        // const cartItems = await CartModel.find({
        //     userId: userId
        // }).populate('productId')

        const cartItems = await CartModel.aggregate([
            {
                $match: { userId: new ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            }, {
                $unwind: "$product"
            },
            {
                $facet: {
                    cartItems: [
                        {
                            $project: {
                                _id: 1,
                                userId: 1,
                                productId: "$product",
                                quantity: 1,
                                totalPrice: 1
                            }
                        }
                    ],
                    subtotal: [
                        {
                            $group: {
                                _id: "$userId",
                                subtotal: { $sum: "$totalPrice" }
                            }
                        }
                    ]
                }
            }
        ])


        if (!cartItems) {
            throw new Error("No items found");
        }

        res.status(200).json({
            success: true,
            message: "Cart Items fetched",
            data: cartItems,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCartItemQty = async (req, res) => {
    try {

        const userId = req.userId
        const data = req.body

        if (!data.id || data.quantity === null) {
            throw new Error("Incomplete data");
        }

        //Query to find the product price
        const cartItem = await CartModel.findById(data.id).populate("productId", "afterDiscountPrice");

        if (!cartItem) {
            throw new Error("Cart item not found");
        }

        // Calculate the new total item price according to the quantity
        const newTotalItemPrice = data.quantity * cartItem.productId.afterDiscountPrice;

        // Update the product quantity and total price
        const updateCartItem = await CartModel.findOneAndUpdate({
            _id: data.id,
            userId: userId
        },
            { quantity: data.quantity, totalPrice: newTotalItemPrice },
            { new: true }
        );

        if (!updateCartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart updated"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: cartItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteCartItemProduct = async (req, res) => {
    try {
        const userId = req.userId
        const data = req.body

        if (!data.id) {
            throw new Error("Provide id");
        }

        const cartItem = await CartModel.findById(data.id);

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        // Remove product from database
        await CartModel.findByIdAndDelete(cartItem._id);

        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const emptyCart = async (req, res) => {
    try {
        const userId = req.userId

        const cart = await CartModel.deleteMany({ userId: userId })

        if (!cart) {
            throw new Error("Unable to empty cart");
        }
        res.status(200).json({
            success: true,
            message: "Cart emptied successfully",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// /**
//  * @desc    Get a single product by ID
//  * @route   GET /api/products/:id
//  * @access  Public
//  */
// export const getProductsByCatId = async (req, res) => {
//     try {
//         const categoryId = req.body.categoryId
//         if (!categoryId) {
//             throw new Error("Id not found");
//         }
//         const product = await Product.find({
//             "categories": {
//                 "$in": [
//                     categoryId
//                 ]
//         }
//         }).populate("categories", ["_id", "name"]).populate("subCategories", ["_id", "name"]);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Product fetched",
//             data: product
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// /**
//  * @desc    Get a single product by ID
//  * @route   GET /api/products/:id
//  * @access  Public
//  */
// export const getProductById = async (req, res) => {
//     try {
//         const productId = req.params.id
//         if (!productId) {
//             throw new Error("Id not found");
//         }
//         const product = await Product.findById(productId).populate("categories", ["_id", "name"]).populate("subCategories", ["_id", "name"]);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Product fetched",
//             data: product
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// /**
//  * @desc    Update a product by ID
//  * @route   PUT /api/products/:id
//  * @access  Public
//  */
// export const updateProduct = async (req, res) => {
//     try {

//         const data = req.body
//         const images = req.files

//         if (!data.id || !data.name) {
//             throw new Error("Please provide data");
//         }

//         if (!images) {
//             throw new Error("Please provide image");
//         }
//         //recommended way
//         const productData = req.body;

//         const { images: img, ...payload } = productData
//         const product = await Product.findByIdAndUpdate(
//             payload.id,
//             payload,
//             { new: true }
//         );

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }
//         if (product.images && product.images.length > 0) {
//             product.images.forEach((imageUrl) => {
//                 unlinkImage({
//                     imageUrl,
//                     folder: "/tmp/uploads/product/"
//                 }); // Adjust folder path if necessary
//             });
//         }

//         let imgUrls = [];
//         for (let i = 0; i < images.length; i++) {
//             const imagePath = images[i].path.replaceAll("\\", "/").replace("tmp", "")
//             let imageURL = req.protocol + '://' + req.get('host') + imagePath;
//             imgUrls.push(imageURL)
//         }

//         const productImages = await ProductModel.findByIdAndUpdate(product._id, {
//             images: imgUrls
//         })

//         if (!productImages) {
//             throw new Error("Unable to upload Image");
//         }

//         res.status(200).json({
//             success: true,
//             message: "Product updated successfully",
//             data: product
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// /**
//  * @desc    Delete an image file from the server
//  * @param   {Object} data - Contains image URL and folder path
//  */
// const unlinkImage = (data) => {
//     const { imageUrl, folder } = data;

//     let oldImage = path.parse(imageUrl).base; // Extract file name from URL
//     let unlinkPath = path.join(path.dirname(__dirname), folder, oldImage); // Construct full file path

//     console.log("Deleting image:", unlinkPath);

//     fs.unlink(unlinkPath, (err) => {
//         if (err) {
//             console.error("Error deleting image:", err);
//         }
//     });
// };

// /**
//  * @desc    Delete a product by ID and remove associated images
//  * @route   DELETE /api/products/:id
//  * @access  Public
//  */
// export const deleteProduct = async (req, res) => {
//     try {
//         const productId = req.params.id
//         if (!productId) {
//             throw new Error("Id not found");
//         }


//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         // Delete product images if available
//         if (product.images && product.images.length > 0) {
//             product.images.forEach((imageUrl) => {
//                 unlinkImage({
//                     imageUrl,
//                     folder: "/tmp/uploads/products/"
//                 }); // Adjust folder path if necessary
//             });
//         }

//         // Remove product from database
//         await Product.findByIdAndDelete(productId);

//         res.status(200).json({
//             success: true,
//             message: "Product and associated images deleted successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };