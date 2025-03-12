import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js"

import {addAddress,getAddresses,updateAddress} from "../controllers/address.controller.js"

const addressRouter = Router();


addressRouter.post("/", verifyToken,addAddress)
addressRouter.get("/",verifyToken,getAddresses)
// addressRouter.get("/:id", getSubCategoryById);
addressRouter.put("/",verifyToken,updateAddress)
// addressRouter.delete("/:id",verifyToken,deleteSubCategory)

export default addressRouter;