import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./router/productRouter.js";
import cors from "cors";
import dotenv from "dotenv"
import orderRouter from "./router/orderRoute.js";


dotenv.config();


const app = express() 
app.use(cors())
app.use(express.json())


app.use(
    (req,res,next)=>{
        let token = req.header("Authorization")
        if (token != null){
            token = token.replace("Bearer ","")
            console.log(token)
            jwt.verify(token,process.env.JWT_SECRET,
                (err, decoded)=>{
                    if(decoded == null){
                        res.json({
                            message : "Invalid Token Please Login Again" 
                        })
                        return
                    }else {
                        req.user = decoded
                        console.log(decoded)
                    }
                }
            )
        }
        next()
    }
)


const connectionString = process.env.MONGO_URI 


mongoose.connect(connectionString).then(
    ()=>{
        console.log("DATABASE CONNECTED....!!")
    }
).catch(
    ()=>{
        console.log("Database Connection Failed..?")
    }
)




app.use("/api/users" , userRouter)
app.use("/api/products" , productRouter)
app.use("/api/orders" , orderRouter)


app.listen(5000, 
    (req , res)=>{
        console.log("SERVER IS RUNNING ON PORT 5000..!!")
    })