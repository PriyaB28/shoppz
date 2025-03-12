import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js'
import categoryRoutes from './routes/category.route.js'
import subCategoryRoutes from './routes/subCategory.route.js'
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import addressRoutes from "./routes/address.route.js";
import orderRoutes from "./routes/order.route.js";

const PORT = 8000 || process.env.PORT
dotenv.config()
const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.static("tmp"))
app.use(express.json());
app.use(cookieParser())
connectDB()

app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/sub-category', subCategoryRoutes)
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})