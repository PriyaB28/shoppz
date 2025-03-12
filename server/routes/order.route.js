import express from "express";
import {
   createOrder,
   createPaymentIntent,
   stripePayment
} from "../controllers/order.controller.js";
import verifyToken from "../middlewares/verifyToken.js"; // Import authentication middleware


const router = express.Router();

// Public Routes (No authentication required)
// router.get("/", getProducts);  // Get all products
// router.get("/get-category-products", getProductsByCatId);  // Get product by ID
// router.get("/:id", getProductById);  // Get product by ID

// Protected Routes (Requires authentication)
router.post("/", verifyToken, createOrder);
router.post("/payment", verifyToken, stripePayment);
router.post("/create-payment-intent", verifyToken,createPaymentIntent);
// router.put("/", verifyToken, upload.array("productImages"), updateProduct);
// router.delete("/:id", verifyToken, deleteProduct);

export default router;