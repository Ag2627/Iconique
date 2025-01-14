import User from "../Model/user_schema.js";
import Seller from "../Model/seller_schema.js";
//import { i } from "vite/dist/node/types.d-aGj9QkWt.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success:false, message:"User not found" });
        res.status(200).json({ success:true,
            data:user, 
            message:"Info updated successfully",})
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, phone, address }, { new: true });
        if (!updatedUser) return res.status(404).json({ success:false, message:"User not found" });
     
        res.status(200).json({ success:true,
            data:updatedUser, 
            message:"Info updated successfully",})
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: error.message });
    }
};

export const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success:false, message:"User not found" });
        res.status(200).json({ success:true,
            data:user,
            message:"User deleted successfully",})
    } catch (error) {
        res.status(500).json({ 
            success:false,
            
            message:"Error",
            error: error.message });
    }
}
export const getSellerProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Seller not found' });
        res.status(200).json({ success:true,
            data:seller, 
            message:"Info updated successfully",})
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message:"Error",
            error: error.message });
    }
};

export const updateSellerProfile = async (req, res) => {
    try {
        const { name, phone, address, storeName, description, socialLink } = req.body;
        
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, { name, phone, address, storeName, description, socialLink }, { new: true });
        if (!updatedSeller) return res.status(404).json({ message: 'Seller not found' });
        res.status(200).json({ success:true,
            data:updatedSeller, 
            message:"Info updated successfully",})
        } catch (error) {
            res.status(500).json({ 
            success:false,
            message:"Error",
            error: error.message });
    }
};
