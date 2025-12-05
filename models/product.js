import mongoose from "mongoose"; 
//CREATE PRODUCT 
const productSchema = new mongoose.Schema(
    {
      productID : {
        type : String,
        required : true,
        unique : true
      } ,
      neme : {
        type : String,
        required : true
      } ,
      altNames : {
        type : [String],
        default : [],
        required : true 
      },
      description : {
        type : String,
        required : true 
      },
      images : {
        type : [String],
        default : [],
        required : true 
      },
      price : {
        type : Number,
        required: true
      },
      labelledPrice : {
        type : Number,
        required : true
      } ,
      category : {
        type : String,
        required : true
      }
    }
  )  

const product = mongoose.model("Product" , productSchema)
export default product;