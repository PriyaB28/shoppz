import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCatId
} from "../controllers/product.controller.js";
import verifyToken from "../middlewares/verifyToken.js"; // Import authentication middleware
import upload from "../middlewares/multer.js"

const router = express.Router();

// Public Routes (No authentication required)
router.get("/", getProducts);  // Get all products
router.get("/get-category-products", getProductsByCatId);  // Get product by ID
router.get("/:id", getProductById);  // Get product by ID

// Protected Routes (Requires authentication)
router.post("/", verifyToken, upload.array("productImages"), createProduct);
router.put("/", verifyToken, upload.array("productImages"), updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;