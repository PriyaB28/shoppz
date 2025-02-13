import SubCategoryModel from "../models/subCategory.model.js 
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const addSubCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body
        const images = req.files

        if (!images) {
            throw new Error("Please provide image");
        }
        if (!name) {
            throw new Error("Please provide category name");
        }

        let parentCatName;
        if (parentId) {
            let parentCatName = await SubCategoryModel.findById(parentId).select("name -_id")
            if (!parentCatName) {
                throw new Error("Invalid parent id");
            }
            parentCatName = parentCatName.name
        }

        const payload = {
            name,
            parentId,
            parentCatName
        }
        const newCategory = await SubCategoryModel(payload)
        const category = await newCategory.save()

        if (!category) {
            throw new Error("Unable to save category");
        }

        let imgUrls = [];
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i].path.replaceAll("\\", "/").replace("tmp", "")
            let imageURL = req.protocol + '://' + req.get('host') + imagePath;
            imgUrls.push(imageURL)
        }

        const updateCategory = await SubCategoryModel.findByIdAndUpdate(category._id, {
            images: imgUrls
        })

        if (!updateCategory) {
            throw new Error("Unable to upload Image");
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

const unlinkImage = (data) => {

    const { imageUrl, folder } = data

    let oldImage = path.parse(imageUrl).base
    let unlinkPath = path.dirname(__dirname) + folder + oldImage
    console.log(unlinkPath);

    fs.unlink(unlinkPath, (err) => {
        return err
    })
}

export { addSubCategory }