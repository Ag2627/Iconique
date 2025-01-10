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
        const wishlist=await Wishlist.findOne({userId}).populate({
            path: "products.productId",
            select: "image title price discount averageReview",
        });
        if (!wishlist) {
            return res.status(404).json({ 
                success:false,
                message: 'Wishlist not found' });
          }

          wishlist.products = wishlist.products.filter(item => item.productId._id.toString() !== productId);
          
          await wishlist.save();
          

          
          await wishlist.populate({
            path: "products.productId",
            select: "image title price discount averageReview",
          });

          const populateWishlistItems = wishlist.products.map(item => ({
            productId:  item.productId ? item.productId._id:null,
            image:item.productId ?  item.productId.image:null,
            title:item.productId ?  item.productId.title:"Product not found",
            price:item.productId ?  item.productId.price:null,
            averageReview: item.productId ? item.productId.averageReview:null,
            discount:item.productId ?  item.productId.discount:null,
          }));

          res.status(200).json({ message: 'Product removed from wishlist', 
            data:{
                ...wishlist._doc,
                items:populateWishlistItems
            } ,
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
        const wishlist=await Wishlist.findOne({userId}).populate({
            path: "products.productId",
            select: "image title price discount averageReview",
          });
        
        if (!wishlist) {
            return res.status(404).json({ 
                success:false,
                message: 'Wishlist not found' });
          }

          const validItems=wishlist.products.filter(productItem=>productItem.productId);
          if(validItems.length<wishlist.products.length){
                wishlist.products=validItems;

                await wishlist.save();
          }
          const populateWishlistItems=validItems.map(item=>({
            productId:item.productId._id,
            image:item.productId.image,
            title:item.productId.title,
            price:item.productId.price,
            averageReview:item.productId.averageReview,
            discount:item.productId.discount
          }))
          res.status(200).json({
            success:true,
            message:"Fetched SuccessFully",
            data:{
                ...wishlist._doc,
                items:populateWishlistItems
            },
          })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })        
    }
}