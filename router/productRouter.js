import express from "express";

import { createProducts, deleteProduct, getProductID, getProducts, updateProduct } from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.get("/", getProducts)
productRouter.post("/", createProducts);
productRouter.get("/search" , (req,res)=>{
    res.json({
        message : "Searching"
    })
})
productRouter.delete("/:productID" , deleteProduct)
productRouter.put("/:productID" , updateProduct)
productRouter.get("/:productID" , getProductID)



export default productRouter;