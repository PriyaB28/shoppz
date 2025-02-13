import CategoryModel from "../models/category.model.js";
import Product from "../models/product.model.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
export const createProduct = async (req, res) => {
    try {
        const images = req.files

        const {
            name,
            description,
            brand,
            price,
            oldPrice,
            catName,
            catId,
            subCatId,
            subCatName,
            thirdSubCatName,
            thirdSubCatId,
            countInStock,
            rating,
            isFeatured,
            discount,
            productRam,
            size,
            productWeight,
        } = req.body;

        // const category = await CategoryModel.findById(catId);
        // if (!category) {
        //     return res.status(404).json({ success: false, message: "Category not found" });
        // }
        const payload = {
            name,
            description,
            brand,
            price,
            oldPrice,
            catName,
            catId,
            subCatId,
            subCatName,
            thirdSubCatName,
            thirdSubCatId,
            countInStock,
            rating,
            isFeatured,
            discount,
            productRam,
            size,
            productWeight,
        };

        const product = new Product(payload);
        await product.save();
        console.log("test");

        if (!product) {
            throw new Error("Unable to save product");
        }

        let imageURL = [];
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i]?.path?.replaceAll("\\", "/").replace("tmp", "")
            const updatedURL = req.protocol + '://' + req.get('host') + imagePath

            imageURL.push(updatedURL);
        }

        const updateProduct = await Product.findByIdAndUpdate(product._id, {
            images: imageURL
        })
        console.log({
            images: imageURL
        });

        if (!updateProduct) {
            throw new Error("Unable to add images");
        }

        res.status(201).json({
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

        let pageNo = parseInt(req.query.pageNo) || 1
        let pageLimit = parseInt(req.query.pageNo) || 10
        const products = await Product.find().skip().limit()
        if (!products) {
            throw new Error("Unable to fetch products");
        }

        res.status(200).json({
            success: true,
            message: "Products fetched",
            data: products
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
        const product = await Product.findById(productId);

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

        const productId = req.params.id
        if (!productId) {
            throw new Error("Id not found");
        }

        //recommended way
        const productData = req.body;
        
        const {images,...payload} = productData
        const product = await Product.findByIdAndUpdate(
            productId,
            payload,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
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