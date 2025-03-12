import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import Product from "../models/product.model.js";

import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"

import Stripe from "../config/stripe.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
export const createProduct = async (req, res) => {
    try {
        const images = req.files

        const data = req.body;

        // const category = await CategoryModel.findById(catId);
        // if (!category) {
        //     return res.status(404).json({ success: false, message: "Category not found" });
        // }

        let imageURL = [];
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i]?.path?.replaceAll("\\", "/").replace("tmp", "")
            const updatedURL = req.protocol + '://' + req.get('host') + imagePath

            imageURL.push(updatedURL);
        }
        const payload = {
            ...data, images: imageURL
        };


        const product = new Product(payload);
        await product.save();

        if (!product) {
            throw new Error("Unable to save product");
        }

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: product
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
export const getProducts = async (req, res) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

        // Calculate the offset
        const offset = (page - 1) * limit;
        const products = await Product.find().populate('categories').populate("subCategories").skip(offset)
            .limit(limit)
            .exec();

        if (!products) {
            throw new Error("Unable to fetch products");
        }

        res.status(200).json({
            success: true,
            message: "Products fetched",
            data: products,
            pages:page,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductsByCatId = async (req, res) => {
    try {
        const categoryId = req.body.categoryId
        if (!categoryId) {
            throw new Error("Id not found");
        }
        const product = await Product.find({
            "categories": {
                "$in": [
                    categoryId
                ]   
        }
        }).populate("categories", ["_id", "name"]).populate("subCategories", ["_id", "name"]);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            throw new Error("Id not found");
        }
        const product = await Product.findById(productId).populate("categories", ["_id", "name"]).populate("subCategories", ["_id", "name"]);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Update a product by ID
 * @route   PUT /api/products/:id
 * @access  Public
 */
export const updateProduct = async (req, res) => {
    try {

        const data = req.body
        const images = req.files

        if (!data.id || !data.name) {
            throw new Error("Please provide data");
        }

        if (!images) {
            throw new Error("Please provide image");
        }
        //recommended way
        const productData = req.body;

        const { images: img, ...payload } = productData
        const product = await Product.findByIdAndUpdate(
            payload.id,
            payload,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        if (product.images && product.images.length > 0) {
            product.images.forEach((imageUrl) => {
                unlinkImage({
                    imageUrl,
                    folder: "/tmp/uploads/product/"
                }); // Adjust folder path if necessary
            });
        }

        let imgUrls = [];
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i].path.replaceAll("\\", "/").replace("tmp", "")
            let imageURL = req.protocol + '://' + req.get('host') + imagePath;
            imgUrls.push(imageURL)
        }

        const productImages = await ProductModel.findByIdAndUpdate(product._id, {
            images: imgUrls
        })

        if (!productImages) {
            throw new Error("Unable to upload Image");
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Delete an image file from the server
 * @param   {Object} data - Contains image URL and folder path
 */
const unlinkImage = (data) => {
    const { imageUrl, folder } = data;

    let oldImage = path.parse(imageUrl).base; // Extract file name from URL
    let unlinkPath = path.join(path.dirname(__dirname), folder, oldImage); // Construct full file path

    console.log("Deleting image:", unlinkPath);

    fs.unlink(unlinkPath, (err) => {
        if (err) {
            console.error("Error deleting image:", err);
        }
    });
};

/**
 * @desc    Delete a product by ID and remove associated images
 * @route   DELETE /api/products/:id
 * @access  Public
 */
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            throw new Error("Id not found");
        }


        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Delete product images if available
        if (product.images && product.images.length > 0) {
            product.images.forEach((imageUrl) => {
                unlinkImage({
                    imageUrl,
                    folder: "/tmp/uploads/products/"
                }); // Adjust folder path if necessary
            });
        }

        // Remove product from database
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: "Product and associated images deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};