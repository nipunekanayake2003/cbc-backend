import Product from "../models/product.js";
import { isAdmin } from "./userConroller.js";

export async function createProducts(req, res) { 
  
     if(!isAdmin(req)){
            res.status(403).json({
                message : "You are not authorized to a product"
            });
            return;
    }

    try{
    const productData = req.body;

    const product = new Product(productData);

    await product.save();

    res.json({
        message : "Product created successfully",
        product : product,
        });
    }catch(err){
        console.err(err);
        res.status(500).json({
            message : "Failed to create product",
        }) 
     }
}
export async function getProducts(req, res) {
    try{
        const products = await Product.find()
        res.json(products);
    } catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to retrieve products"
        });
    }
} 




export async function deleteProduct(req,res) {
    if(!isAdmin(req)){
            res.status(403).json({
                message : "You Are Not Authorized To a Delete a  Product "
            });
            return;
    }
    try {

        const productID = req.params.productID

        await Product.deleteOne({
            productID : productID
            })

            res.json({
                message : "PRODUCT DELETED SUCCESSFULLY"
            });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "FAILD TO DELETe PRODUCT"
        });
    }
}

//UPDATE PRODUCTS
export async function updateProduct(req,res) {
     if(!isAdmin(req)){
            res.status(403).json({
                message : "You are not authorized to a UPDATE a  product"
            });
            return;
    }
     
    try {
        const productID = req.params.productID
        const updateData = req.body;
        await Product.updateOne(
            {productID : productID},
            updateData
    )
                res.json({
                message : "PRODUCT UPDATE SUCCESSFULLY"
            });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "FAILD TO UPDATE PRODUCT"
        });
    }
}




export async function getProductID(req,res) {
    try{
        const productID = req.params.productID;

        const product = await Product.findOne(
            {
                productID : productID
            }
        )
        if (product == null){
            res.status(404).json({
                message : "Product not found"
            })
        }else{
            res.json(product);
        }
    }catch(err){
        console.error(err);
        res.status(500).json({
            message : "FAILD TO RETRIEVE PRODUCT BY ID"
        })
    }
}