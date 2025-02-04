import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


if (!process.env.MONGODB_ATLAS_URL) {
    throw new Error("Please provide database url");
}

async function connectDB() {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_ATLAS_URL)
        console.log('connected with database successfully');
        return conn;
        
    } catch (error) {
        console.log("Mongodb connection error occured",error);
        process.exit(1)
    }
}

export default connectDB