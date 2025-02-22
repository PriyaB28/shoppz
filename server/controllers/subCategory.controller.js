import SubCategoryModel from "../models/subCategory.model.js"
import ProductModel from "../models/product.model.js"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const addSubCategory = async (req, res) => {
    try {
        const { name, categories } = req.body
        const images = req.files

        if (!images) {
            throw new Error("Please provide image");
        }
        if (!name) {
            throw new Error("Please provide category name");
        }

        let imgUrls = [];
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i].path.replaceAll("\\", "/").replace("tmp", "")
            let imageURL = req.protocol + '://' + req.get('host') + imagePath;
            imgUrls.push(imageURL)
        }

        const payload = {
            name,
            categories,
            images: imgUrls
        }
        const newCategory = await SubCategoryModel(payload)
        const category = await newCategory.save()

        if (!category) {
            throw new Error("Unable to save category");
        }

        return res.json({
            success: true,
            message: "Category created successfully",
            data: category
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSubCategories = async (req, res) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

        // Calculate the offset
        const offset = (page - 1) * limit;

        const categories = await SubCategoryModel.find().populate('categories').skip(offset)
            .limit(limit)
            .exec();

        if (!categories) {
            throw new Error("Not found");
        }
        const total = await SubCategoryModel.countDocuments()
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap[cat._id] = {
                ...cat._doc, children: []
            }
        })

        const rootCategories = [];
        categories.forEach((cat) => {
            if (cat.parentId) {
                categoryMap[cat.parentId].children.push(categoryMap[cat._id])
            } else {
                rootCategories.push(categoryMap[cat._id])
            }
        })

        return res.json({
            success: true,
            message: "Categories fetched",
            data: rootCategories,
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSubCategoryById =  async (req, res)=> {
    try {

        if (!req.params.id) {
            throw new Error("Invalid id");

        }
        const category = await SubCategoryModel.findById(req.params.id).populate("categories",["_id","name"]);

        if (!category) {
            throw new Error("Category not found");
        }

        return res.status(200).json({
            message: "Category fetched successfully.",
            success: true,
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false // Optionally send error details
        });
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const data = req.body
        const images = req.files
     
        if (!data.id || !data.name) {
            throw new Error("Please provide data");
        }

        if (!images) {
            throw new Error("Please provide image");
        }

        const updatedCategory = await SubCategoryModel.findOneAndUpdate({
            _id: data.id
        }, {
            name: data.name,
            categories: data.categories
        }, {
            new: true
        })
        if (!updatedCategory) {
            throw new Error("Unable update category");
        }

        if (updatedCategory.images && updatedCategory.images.length > 0) {
            updatedCategory.images.forEach((imageUrl) => {
                unlinkImage({
                    imageUrl,
                    folder: "/tmp/uploads/subCategory/"
                }); // Adjust folder path if necessary
            });
        }

        let imgUrls = [];
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i].path.replaceAll("\\", "/").replace("tmp", "")
            let imageURL = req.protocol + '://' + req.get('host') + imagePath;
            imgUrls.push(imageURL)
        }

        const updateCategoryImage = await SubCategoryModel.findByIdAndUpdate(updatedCategory._id, {
            images: imgUrls
        })

        if (!updateCategoryImage) {
            throw new Error("Unable to upload Image");
        }

        return res.json({
            success: true,
            message: "Category updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const deleteSubCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            throw new Error("Invalid id");
        }

        const category = await SubCategoryModel.findById(categoryId)
        if (!category) {
            throw new Error("Invalid id");
        }


        const checkProduct = await ProductModel.find({
            subCatId: {
                "$in": [categoryId]
            }
        }).countDocuments()

        if (checkProduct > 0) {
           throw new Error("Category already in use, can't delete it");
       }

        const existingImage = await SubCategoryModel.findById(categoryId).select("images -_id")

        for (let i = 0; i < existingImage.images.length; i++) {
            let imageData = {
                imageUrl: existingImage.images[i],
                folder: "/tmp/uploads/subCategory/"
            }
            unlinkImage(imageData)
        }

        // const subCategories = await CategoryModel.find({
        //     parentId: categoryId
        // })

        // for (let i = 0; i < subCategories.length; i++) {
        //     const deleteThirdSubCategory = await CategoryModel.findOneAndDelete({
        //         parentId: subCategories[i]._id
        //     })

        //     const existingSubImage = await CategoryModel.findById(subCategories[i]._id)
        //     if (existingSubImage.images.length > 0) {
        //         for (let i = 0; i < existingSubImage.images.length; i++) {
        //             let imageData = {
        //                 imageUrl: existingSubImage.images[i],
        //                 folder: "/tmp/uploads/category/"
        //             }
        //             unlinkImage(imageData)
        //         }
        //     }
        //     const deleteSubCategory = await CategoryModel.findByIdAndDelete(subCategories[i]._id)

        // }

        const deleteCategory = await SubCategoryModel.findByIdAndDelete(categoryId)

        if (!deleteCategory) {
            throw new Error("Unable to delete category");
        }


        return res.json({
            success: true,
            message: "Category deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const unlinkImage = (data) => {

    const { imageUrl, folder } = data

    let oldImage = path.parse(imageUrl).base
    let unlinkPath = path.dirname(__dirname) + folder + oldImage
    console.log(unlinkPath);

    fs.unlink(unlinkPath, (err) => {
        return err
    })
}

export { addSubCategory, getSubCategories, updateSubCategory ,getSubCategoryById,deleteSubCategory}