import User from "../Model/user_schema.js";
import Order from "../Model/OrderSchema.js";

const getOrderDetailsforSeller = async (req, res) => {
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
        message: "Some error occured!",
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