import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export function createUser (req , res){
    
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    
    const user = new User(
    {
       email:  req.body.email,
       firstName : req.body.firstName,
       lastName : req.body.lastName,
       password : hashedPassword
    }
    )

        user.save().then(
            ()=> { 
                res.json({
                    message : "USER CRAEATE SUCCESSFULLY"
            })
            } 
        ).catch(
            ()=> {
                res.json    ({
                    message : "FAILED TO CREATE USER"
                })
            }
        )
    }
export function loginUser (req, res){ 

    User.findOne (
        {
            email : req.body.email,
        }
    ).then(
        (user)=>{
            if (user == null) {
                res.json(
                    {
                        message : "USER NOT FOUND"
                    }
                )
            }else {
                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password )
                if(isPasswordMatching){

                    const token = jwt.sign (
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isEmailVerified : user.isEmailVerified,
                        },

                        process.env.JWT_SECRET,
                    )
                    res.json(
                        {
                        message : "Login successful",
                        token : token ,
                        user : {
                            email: user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isEmailVerified : user.isEmailVerified,

                        }
                    }
                )
                }else{
                    res.json(
                        {
                            message : "Invalid password"
                        }
                    )
                }
            }
        }
    )
}






export function isAdmin (req){
    if(req.user == null ){
            return false;
    }
    if( req.user.role != "admin"){
        return false;
    }

    return true;
}

export function isCustomer(req){
    if(req.user == null) {
        return false;
    }
    if(req.user.role != "user"){
        return false;
    }
    return true;
}

export function getUser(req,res) {
    if(req.user == null){
        res.status(401).json(
         {
            message : "Unauthorized user"
         }
        )
        return;
    }else{
        res.json(
           req.user
        )
    }
}
