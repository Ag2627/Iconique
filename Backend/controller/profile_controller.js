import User from "../Model/user_schema.js";
import Seller from "../Model/seller_schema.js";
import product from "../Model/product-schema.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
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
      const sellerId = req.params.id;
  
      // Ensure sellerId is provided
      if (!sellerId) {
        return res.status(400).json({ 
          success: false, 
          message: "Seller ID is required." 
        });
      }
  
      // Find the seller by ID
      const seller = await Seller.findById(sellerId);
      console.log("Seller" ,seller);
      // Handle case where seller is not found
      if (!seller) {
        return res.status(404).json({ 
          success: false, 
          message: "Seller not found." 
        });
      }
  
      // Respond with seller profile
      return res.status(200).json({
        success: true,
        data: seller,
      });
    } catch (error) {
      // General error handling
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching the seller profile.", 
        error: error.message,
      });
    }
  };
  
  export const updateSellerProfile = async (req, res) => {
    try {
      const sellerId = req.params.id;
  
      // Ensure sellerId is provided
      if (!sellerId) {
        return res.status(400).json({ 
          success: false, 
          message: "Seller ID is required." 
        });
      }
  
      // Extract fields to update from the request body
      const { name, phone, address, storeName, description, socialLink } = req.body;
  
      // Update seller profile
      const updatedSeller = await Seller.findByIdAndUpdate(
        sellerId,
        { name, phone, address, storeName, description, socialLink },
        { new: true, runValidators: true } // Ensure updated document is returned and validations are run
      );
  
      // Handle case where seller is not found
      if (!updatedSeller) {
        return res.status(404).json({ 
          success: false, 
          message: "Seller not found." 
        });
      }
  
      // Respond with the updated profile
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        profile: {
          name: updatedSeller.name,
          email: updatedSeller.email,
          phone: updatedSeller.phone,
          address: updatedSeller.address,
          logo: updatedSeller.logo,
          storeName: updatedSeller.storeName,
          description: updatedSeller.description,
          socialLink: updatedSeller.socialLink,
        },
      });
    } catch (error) {
      // General error handling
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the seller profile.", 
        error: error.message,
      });
    }
  };
  
  // export const deleteProductsBySellerId = async (req, res) => {
  //   const { sellerId } = req.params;
  
  //   try {
  //     // Delete all products associated with the sellerId
  //     await Product.deleteMany({ sellerId });
  //     res.status(200).json({ success: true, message: "Products deleted successfully." });
  //   } catch (error) {
  //     console.error("Error deleting products by sellerId:", error);
  //     res.status(500).json({ success: false, message: "Failed to delete products." });
  //   }
  // };
  export const deleteSellerProfile = async (req, res) => {
    const { sellerId } = req.params;
  
    try {
      // Delete the seller profile
      await product.deleteMany({ sellerId });
      
      await Seller.findByIdAndDelete(sellerId);
      res.status(200).json({ success: true, message: "Seller profile deleted successfully." });
    } catch (error) {
      console.error("Error deleting seller profile:", error);
      res.status(500).json({ success: false, message: "Failed to delete seller profile." });
    }
  };
  export const generateOTP=async (req,res) => {
    console.log("aaya");
    
    req.app.locals.OTP = otpGenerator.generate(6,{lowerCaseAlphabets:false ,upperCaseAlphabets:false ,specialChars :false})
    res.status(201).send({ code: req.app.locals.OTP})
  }
  export const verifyOTP=async (req,res) => {
      const {code} =req.query;
      if(parseInt(req.app.locals.OTP)=== parseInt(code)){
        req.app.locals.OTP =null;//reset the otp value
        req.app.locals.resetSession=true;//start session for reset password
        return res.status(201).send({
          msg:'verified Successfully',

        })
      }
      return res.status(400).send({error : "Invalid OTP"});
  }
  //successfully redirect user when otp is valid
  export const createResetSession = async (req,res) =>{
        if(req.app.locals.resetSession){
          req.app.locals.resetSession=false;//allow access to this route only once
          return res.status(201).send({msg :"access granted !"})
        }
        return res.status(440).send({error : "session expired!"})
  }
  //update the password when we have a valid session
  export const resetPassword = async (req, res) => {
    try {
      if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});
      const { email, password } = req.body;
  
      // Check if the email and password are provided
      if (!email || !password) {
        return res.status(400).send({ error: "Email and password are required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password
      const updatedUser = await User.updateOne(
        { email },
        { password: hashedPassword }
      );
  
      if (updatedUser.modifiedCount > 0) {
        return res.status(200).send({ msg: "Password updated successfully" });
      } else {
        return res.status(500).send({ error: "Failed to update password" });
      }
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).send({ error: "An error occurred", details: error.message });
    }
  };
  
  
