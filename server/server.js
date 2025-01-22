import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js'

dotenv.config()

const app = express();
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))

const PORT = 8000 || process.env.PORT

app.use(express.json());
app.use(cookieParser())
connectDB()

app.use('/api/user',userRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})