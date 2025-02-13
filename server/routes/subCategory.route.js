import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js"
import upload from "../middlewares/multer.js"

import {addSubCategory} from "../controllers/subCategory.controller.js"

const subCategoryRouter = Router();


subCategoryRouter.post("/", verifyToken,upload.array("subCategoryImages"),addSubCategory)
// subCategoryRouter.get("/",getCategories)
// subCategoryRouter.get("/:id", getCategoryById);
// subCategoryRouter.put("/",verifyToken,upload.array("categoryImages"),updateCategory)
// subCategoryRouter.delete("/:id",verifyToken,deleteCategory)

export default subCategoryRouter;