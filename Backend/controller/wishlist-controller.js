import Wishlist from "../Model/Wishlist.js";
import product from "../Model/product-schema.js";

//add product to wishlist
export const addToWishList=async(req,res)=>{
    try{
        const {userId,productId}=req.body;
        if(!userId || !productId){
            return res.status(400).json({
                success:false,
                message:"Invalid data provided",
            })
        }
        const prod=await product.findById(productId);
        if(!prod){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        let wishlist=await Wishlist.findOne({userId});
        if(!wishlist){
            wishlist=new Wishlist({userId,products:[{productId}]});
            await wishlist.save();
        }
        else{
            //check if already in wishlist
            const productExists=wishlist.products.some(item=>item.productId.toString()===productId);
            if (productExists) {
                return res.status(400).json({ 
                    success:false,
                    message: 'Product already in wishlist' });
              }
              wishlist.products.push({productId});
              await wishlist.save();
        }
        res.status(201).json({
            message:"Product Added to wishlist",success:true,
            data:wishlist,
        })        

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })        
    }
}
//Remove product from wishlist
export const RemoveFromWishList=async(req,res)=>{
    try{
        const { userId,productId } = req.params;
        if(!userId || !productId){
            return res.status(400).json({
                success:false,
                message:"Invalid data provided",
            })
        }
        const wishlist=await Wishlist.findOne({userId});
        if (!wishlist) {
            return res.status(404).json({ 
                success:false,
                message: 'Wishlist not found' });
          }
        
          const updatedProducts = wishlist.products.filter(item => item.productId.toString() !== productId);
          wishlist.products = updatedProducts;
          await wishlist.save();
      
          res.status(200).json({ message: 'Product removed from wishlist', 
            data:wishlist ,
            success:true
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })        
    }
}

//get all products in wishlist
export const getWishList=async(req,res)=>{
    try{
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"user id is required",
            })
        }
        const wishlist=(await Wishlist.findOne({userId})).populate({
            path:'products.productId',
        })
        if (!wishlist) {
            return res.status(404).json({ 
                success:false,
                message: 'Wishlist not found' });
          }

          res.status(200).json({
            success:true,
            message:"Fetched SuccessFully",
            data:wishlist,
          })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })        
    }
}