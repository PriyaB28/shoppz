import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        unique: [true, "Category name should be unique"]
    },
    images: [
        {
            type: String
        }
    ],
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        default: null
    }],
    // parentCatName: {
    //     type: String
    // }
}, {
    timestamps: true
})

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema)

export default SubCategoryModel