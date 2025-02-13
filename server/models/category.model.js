import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        unique: [true, "Category name should be unique"]
    },
    images: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
})

const CategoryModel = mongoose.model("Category", categorySchema)

export default CategoryModel