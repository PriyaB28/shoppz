import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js"
import upload from "../middlewares/multer.js"

import {createCart ,getCartItems,updateCartItemQty,deleteCartItemProduct, emptyCart} from "../controllers/cart.controller.js"

const cartRouter = Router();


cartRouter.post("/", verifyToken,createCart)
cartRouter.get("/",verifyToken,getCartItems)
// cartRouter.get("/:id", getSubCategoryById);
cartRouter.put("/",verifyToken,updateCartItemQty)
cartRouter.delete("/",verifyToken,deleteCartItemProduct)
cartRouter.delete("/empty-cart",verifyToken,emptyCart)

export default cartRouter;