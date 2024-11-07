import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Model/user_schema.js";
import Seller from "../Model/seller_schema.js"
import mongoose from 'mongoose';


const JWT_SECRET = 'This is authentication check';
export const userSignUp=async (request,response)=>{
    try{
        const exist= await User.findOne({email:request.body.email});
        if(exist){
            return response.status(401).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user=request.body;
        const newUser = new User({
            ...request.body,
            _id:new mongoose.Types.ObjectId,
            password: hashedPassword,
        });
        await newUser.save();
        response.status(200).json({message:user});
    } catch(error){
        response.status(500).json({message:error.message});
    }
}

export const sellerSignup=async(request,response)=>{
    try{
        console.log('File:', request.file);
        const exist= await Seller.findOne({email:request.body.email});
        if(exist){
            return response.status(401).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const seller=request.body;
        const newUser = new Seller({
            ...request.body,
            _id:new mongoose.Types.ObjectId,
            password: hashedPassword,
            logo:request.file.path,
        });
        await newUser.save();
        response.status(200).json({message:seller});
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
            return response.status(200).json({data:user});
        } else{
            return response.status(401).json('Invalid Login');
        }
    }catch(error){
        response.status(500).json({message:error.message});
   }
}

export const sellerLogin=async(request,response)=>{
    try{
        const email=request.body.email;
        const password=request.body.password;
        let user=await Seller.findOne({email});
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json('Invalid Login');
        }
            return response.status(200).json({data:user});
        } else{
            return response.status(401).json('Invalid Login');
        }
    }catch(error){
        response.status(500).json({message:error.message});
   }
}


export const googleLogin = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({message:"User not found,please sign up"})
    }

    const token = jwt.sign({ _id:user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const googleSellerLogin = async (req, res) => {
    const { email } = req.body;
  
    try {
      let seller = await Seller.findOne({ email });
  
      if (!seller) {
        return res.status(404).json({message:"Seller not found,please sign up"})
      }
  
      const token = jwt.sign({ _id:seller._id, email: seller.email }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ data: seller });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  