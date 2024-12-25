import Order from "../Model/OrderSchema.js";
import product from "../Model/product-schema.js";
import review from "../Model/ReviewSchema.js";
export const addProductReview = async (req, res) => {
     try{
        const {productId, userId, sellerId, userName, reviewMessage, rating} = req.body;
        const order= await Order.findOne({userId,"cartItems.productId":productId,
            orderStatus:"Confirmed"
        })
        if(!order){
            return res.status(403).json({
                success:false,
                message:"You can only review products that you have purchased"
            })
        }
        const checkExistingReview=await review.findOne({userId,productId});
        if(checkExistingReview){
            return res.status(400).json({
                success:false,
                message:"You have already reviewed this product"
            })
        }
        const newReview= new review({
            productId,
            userId,
            sellerId,
            userName,
            reviewMessage,
            rating
        })
        await newReview.save();
        const reviews= await review.find({productId});
        const totalReviewsLength=reviews.length;
        const averageReview=reviews.reduce((sum, item)=>sum+item.rating,0)/totalReviewsLength;
        //to calculate average rating of product
        await product.findByIdAndUpdate(productId,{averageReview:averageReview})

        res.status(201).json({
            success:true,
            message:"Review added successfully",
            data:newReview,
        })
     } catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: e.message});
     }
}
export const getProductReviews = async (req, res) => {
    try{
        const productId=req.params;
        const reviews= await review.find({productId});
        res.status(200).json({
            success:true,
            data:reviews
        })
    } catch(e){
       console.log(e);
       res.status(500).json({
           success:false,
           message: e.message});
    }
}
