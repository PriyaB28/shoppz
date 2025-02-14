import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    catId: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            default: ''
        }
    ],
    subCatId: [
        {
            type: String,
            default: ''
        }
    ],
    thirdSubCatId: {
        type: String,
        default: ''
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        required: true
    },
    productRam: [
        {
            type: String,
            default: null
        }
    ],
    size: [
        {
            type: String,
            default: null
        }
    ],
    productWeight: [
        {
            type: String,
            default: null
        }
    ]
}, {
    timestamps: true
});


const ProductModel = mongoose.model("Product", productSchema)

export default ProductModel