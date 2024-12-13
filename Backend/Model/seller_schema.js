import mongoose from "mongoose";

const sellerSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        trim:true,
        min:2,
        max:30
    },
    
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    storeName:{
        type:String,
        required:true
    },
    description:String,
    socialLink:String,
    logo:{
        type:String,
        required:true
    },
    agree:{
        type:String,
        required:true
    },
})

const Seller=mongoose.model('seller',sellerSchema);
export default Seller;