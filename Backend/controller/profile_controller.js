import User from "../Model/user_schema.js";
import Seller from "../Model/seller_schema.js";
import product from "../Model/product-schema.js";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import { registerMail } from "./mailer.js";

//import { i } from "vite/dist/node/types.d-aGj9QkWt.js";
const URL="http://localhost:5000"
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
  export const generateOTP = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        console.error("No email provided");  // Debugging
        return res.status(400).json({ error: "Email is required" });
      }
  
      // Check if the email exists in the database
      const user = await User.findOne({ email });
      
      if (!user) {
        console.error("User not found:", email);
        return res.status(404).json({ error: "User not found" });
      }
 
      const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

      // Store OTP in the database
      user.otp = otp;
      await user.save();
  
      console.log("Generated OTP:", otp);  // Debugging
  
     // Send OTP via email using mailer
      const subject = "Password Recovery OTP";
     const text = `Your password recovery OTP is ${otp}. Please verify within 5 minutes.`;

     const simulatedReq = {
      body: {
        email: email,   // The email from the body
        text: text,     // The OTP message
        subject: subject // The subject of the email
      }
    };
      await registerMail(simulatedReq,res);

  
      res.status(201).json({ success: true, message: "OTP sent successfully", code: otp });
    } catch (error) {
      console.error("Error while generating OTP:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const verifyOTP = async (req, res) => {
    try {
      const { email, code } = req.body;
      if (!email || !code) return res.status(400).json({ error: "Email and OTP are required" });
  
      const user = await User.findOne({ email });
      if (!user || user.otp !== code) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
  
      // Clear OTP after successful verification
      await User.updateOne({ email }, { otp: null });
  
      res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //successfully redirect user when otp is valid
  export const createResetSession = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the reset session is already active
      if (user.resetSession) {
        return res.status(400).json({ error: "Session already active" });
      }
  
      // Activate the reset session
      user.resetSession = true;
  
      // Optionally, set a session expiration time (e.g., 30 minutes from now)
      user.resetSessionExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  
      // Save the session data to the database
      await user.save();
  
      return res.status(201).json({ msg: "Access granted! Reset session started." });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred", details: error.message });
    }
  };
  
  //update the password when we have a valid session
  export const resetPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log("Emial",email,"p",password)
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the reset session is valid and not expired
      if (!user.resetSession || (user.resetSessionExpiresAt && new Date() > user.resetSessionExpiresAt)) {
        return res.status(440).json({ error: "Session expired!" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password
      const updatedUser = await User.updateOne(
        { email },
        { password: hashedPassword, resetSession: false, resetSessionExpiresAt: null } // Clear the reset session
      );
  
      if (updatedUser.modifiedCount > 0) {
        return res.status(200).json({ msg: "Password updated successfully" });
      } else {
        return res.status(500).json({ error: "Failed to update password" });
      }
    } catch (error) {
      return res.status(500).json({ error: "An error occurred", details: error.message });
    }
  };
  
  
