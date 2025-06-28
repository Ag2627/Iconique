import mongoose, { trusted } from "mongoose";

const userSchema=new mongoose.Schema({
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
    otp:{
        type:String,
    },
    resetSession: {
        type: Boolean,  // Boolean flag to check session validity
        default: false
      },
    resetSessionExpiresAt: {  // Optional: To set an expiry time for reset session
        type: Date,
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
    agree:{
        type:String,
        required:true
    },
})

const User=mongoose.model('user',userSchema);
export default User;