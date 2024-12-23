import Address from '../Model/Address.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const addAddress = async (req, res) => {
    try{
        const {address,city,pincode,phone,notes} = req.body;
        const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
              return res.status(401).json({ message: "Unauthorized, no token provided" });
            }
        
            const decoded = jwt.verify(token, JWT_SECRET); // Decode token to get seller ID
            const userId = decoded.id;
        if(!userId || !address || !city || !pincode || !phone){
            return res.status(400).json({ success:false, message:"Please fill all the fields" });
        }
        const newAddress = new Address({userId,address,city,pincode,phone,notes});
        await newAddress.save();
        res.status(201).json({ success:true, 
            message:"Address added successfully",
        data:newAddress });

    }catch(e){
        console.log(e);
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: e.message });
    }
}
export const fetchallAddress = async (req, res) => {
    try{
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json({ success:false, message:"Please provide userId" });
        }
        const addressList = await Address.find({userId});
        res.status(200).json({ success:true, 
            message:"Address fetched successfully",
        data:addressList });
    }catch(e){
        console.log(e);
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: e.message });
    }
}
export const editAddress = async (req, res) => {
    try{
        const {userId,addressId}=req.params;
        const formData=req.body;
        if(!userId || !addressId){
            return res.status(400).json({ success:false, message:"Please provide userId and addressId" });
        }
        const address=await Address.findOneAndUpdate({
            _id:addressId,userId,
        },formData,{new:true});
        if(!address){
            return res.status(404).json({ success:false, message:"Address not found" });
        }
        res.status(200).json({ success:true,
            data:address, 
            message:"Address updated successfully",})
    }catch(e){
        console.log(e);
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: e.message });
    }
}
export const deleteAddress = async (req, res) => {
    try{
        const {userId,addressId}=req.params;
       // console.log("UserID",userId);
        if(!userId || !addressId){
            return res.status(400).json({ success:false, message:"Please provide userId and addressId" });
        }
        const address=await Address.findOneAndDelete({
            _id:addressId,userId,
        });
        if(!address){
            return res.status(404).json({ success:false, message:"Address not found" });
        }
        res.status(200).json({ success:true,
            data:address, 
            message:"Address deleted successfully",})

    }catch(e){
        console.log(e);
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: e.message });
    }
}
