import User from "../Model/user_schema.js";
import Order from "../Model/OrderSchema.js";
import product from "../Model/product-schema.js";
import mongoose from "mongoose";
export const getAllOrdersForSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerObjectId = new mongoose.Types.ObjectId(id);

    const orders = await Order.aggregate([
      // Step 1: Unwind cartItems to join each one
      { $unwind: "$cartItems" },

      // Step 2: Convert productId string to ObjectId
      {
        $addFields: {
          productObjId: { $toObjectId: "$cartItems.productId" }
        }
      },

      // Step 3: Lookup the product
      {
        $lookup: {
          from: "products", // collection name (usually plural and lowercase)
          localField: "productObjId",
          foreignField: "_id",
          as: "productDetails"
        }
      },

      // Step 4: Match where product's sellerId matches the given one
      {
        $match: {
          "productDetails.sellerId": sellerObjectId
        }
      },

      // Step 5: Group back by order to rebuild full order object
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          cartId: { $first: "$cartId" },
          cartItems: { $push: "$cartItems" },
          addressInfo: { $first: "$addressInfo" },
          orderStatus: { $first: "$orderStatus" },
          paymentMethod: { $first: "$paymentMethod" },
          paymentStatus: { $first: "$paymentStatus" },
          totalAmount: { $first: "$totalAmount" },
          orderDate: { $first: "$orderDate" },
          orderUpdateDate: { $first: "$orderUpdateDate" },
          paymentId: { $first: "$paymentId" },
          payerId: { $first: "$payerId" }
        }
      }
    ]);

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this seller.",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error("Error fetching orders for seller:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
export const deliverMail=async(req,res)=>{
    try{
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
          return res.status(404).json({ message: "Order not found" });
      }

      // Find user details using userId
      const user = await User.findById(order.userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update order status
      order.orderStatus = status;
      await order.save();

      // Send email when the order is marked as "Delivered"
      if (status === "Delivered") {
          await sendOrderEmail(user.name, user.email, orderId);
      }

      res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
}
export const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export const getOrderDetailsForSeller = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
