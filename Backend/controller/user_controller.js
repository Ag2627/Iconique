import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

import User from "../Model/user_schema.js";
import Seller from "../Model/seller_schema.js"
import mongoose from 'mongoose';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userSignUp=async (request,response)=>{
    try{
        const exist= await User.findOne({email:request.body.email});
        if(exist){
            return response.status(401).json({ message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user=request.body;
        const newUser = new User({
            ...request.body,
            _id:new mongoose.Types.ObjectId,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        response.status(200).json({
            message: "Signup successful",
            token,
            user: newUser
        });
    } catch(error){
        response.status(500).json({message:error.message});
    }
}

export const sellerSignup=async(request,response)=>{
    try{
        console.log('File:', request.file);
        const exist= await Seller.findOne({email:request.body.email});
        if(exist){
            return response.status(401).json({message:"Seller already exists"});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const seller=request.body;
        const newSeller = new Seller({
            ...request.body,
            _id:new mongoose.Types.ObjectId,
            password: hashedPassword,
            logo:request.file.path,
        });
        await newSeller.save();
        const token = jwt.sign(
            { id: newSeller._id, email: newSeller.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        response.status(200).json({
            message: "Signup successful",
            token,
            seller: newSeller
        });
    }catch(error){
        response.status(500).json({message:error.message});
    }
}
export const userLogin=async(request,response)=>{
    try{
        const email=request.body.email;
        const password=request.body.password;
        let user=await User.findOne({email});
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json('Invalid Login');
        }


        // Return the token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        response.status(200).json({
            message: "Login successful",
            token,
            user:user
        });
        } else{
            return response.status(401).json('Invalid Login');
        }
    }catch(error){
        response.status(500).json({message:error.message});
   }
}

export const sellerLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return response.status(401).json({ message: "Invalid login" });
        }

        const isPasswordValid = await bcrypt.compare(password, seller.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: "Invalid login" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: seller._id, email: seller.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        console.log("Hey seller token:",token);
        response.status(200).json({
            message: "Login successful",
            token,
            seller:seller
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};


export const googleLogin = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please sign up" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user:user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Google Seller Login
export const googleSellerLogin = async (req, res) => {
    const { email } = req.body;

    try {
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(404).json({ message: "Seller not found, please sign up" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: seller._id, email: seller.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            seller:seller
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};