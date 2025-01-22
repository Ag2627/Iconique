import mongoose from "mongoose";
import Order from "../Model/OrderSchema.js";
export const sellerStats=async(req,res)=>{
    try{
        const {id}=req.params;
        const stats = await Order.aggregate([
            { $unwind: "$cartItems" }, // Unwind the cartItems array
            { $unwind: "$cartItems.items" }, // Unwind the items array within cartItems
            {
              $lookup: {
                from: "product", // Join with the Product collection
                localField: "cartItems.items.productId", // Matching the productId in cartItems.items
                foreignField: "_id", // Matching the _id of the Product
                as: "productDetails", // Create productDetails array
              },
            },
            { $unwind: "$productDetails" }, // Unwind productDetails array
            {
              $match: {
                "productDetails.sellerId":new mongoose.Types.ObjectId(id), // Filter by sellerId
              },
            },
            {
              $group: {
                _id: null, // Group everything into a single result
                totalRevenue: { $sum: "$totalAmount" }, // Sum the totalAmount field for total revenue
                totalOrders: { $sum: 1 }, // Count the total number of orders
              },
            },
          ]);
          if (!stats.length) {
            return res.status(200).json({ message: "No orders found for this seller",
              success:true,
            data:{
              totalRevenue: 0,
              totalOrders: 0,
            },
             });
          }
          const data={
            totalRevenue: stats[0].totalRevenue,
            totalOrders: stats[0].totalOrders,
          }
      
          // Send the result
          res.status(200).json({
            success:true,
            data:data,
          });
    }catch(error){
        res.status(500).json({
            success : false,
            message: 'Error while fetching',
            error: error.message, 
        })
    }
}
