import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js"
import upload from "../middlewares/multer.js"

import {addCategory,updateCategory,getCategories, getCategoryById,deleteCategory} from "../controllers/category.controller.js"

const categoryRouter = Router();


categoryRouter.get("/",getCategories)
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", verifyToken,upload.array("categoryImages"),addCategory)
categoryRouter.put("/",verifyToken,upload.array("categoryImages"),updateCategory)
categoryRouter.delete("/:id",verifyToken,deleteCategory)

export default categoryRouter;