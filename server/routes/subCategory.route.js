import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js"
import upload from "../middlewares/multer.js"

import {addSubCategory,deleteSubCategory,getSubCategories,getSubCategoryById,updateSubCategory} from "../controllers/subCategory.controller.js"

const subCategoryRouter = Router();


subCategoryRouter.post("/", verifyToken,upload.array("subCategoryImages"),addSubCategory)
subCategoryRouter.get("/",getSubCategories)
subCategoryRouter.get("/:id", getSubCategoryById);
subCategoryRouter.put("/",verifyToken,upload.array("subCategoryImages"),updateSubCategory)
subCategoryRouter.delete("/:id",verifyToken,deleteSubCategory)

export default subCategoryRouter;