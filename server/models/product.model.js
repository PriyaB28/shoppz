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
    features: {
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
    afterDiscountPrice: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            default: ''
        }
    ],
    subCategories: [
        {
            type: String,
            ref: "SubCategory",
            default: ''
        }
    ],
    thirdSubCatId: {
        type: String,
        default: ''
    },
    stockCount: {
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
    publish: {
        type: Boolean,
        default:false
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