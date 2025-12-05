import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./router/productRouter.js";

const app = express() 

app.use(express.json())

app.use(
    (req,res,next)=>{
        let token = req.header("Authorizatsion")
        if (token != null){
            token = token.replace("Bearer ","")
            console.log(token)
            jwt.verify(token, "jwt-secret",
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


const connectionString = "mongodb+srv://admin:123@cluster0.okkhon7.mongodb.net/?appName=Cluster0"


mongoose.connect(connectionString).then(
    ()=>{
        console.log("DATABASE CONNECTED....!!")
    }
).catch(
    ()=>{
        console.log("Database Connection Failed..?")
    }
)



app.use("/users" , userRouter)
app.use("/products" , productRouter)

app.listen(5000, 
    (req , res)=>{
        console.log("SERVER IS RUNNING ON PORT 5000..!!")
    })