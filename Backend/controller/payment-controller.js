import { createRazorpayInstance } from "../config/razorpay-config.js";
import dotenv from 'dotenv';
import crypto from 'crypto';
import Order from "../Model/OrderSchema.js";
import Cart from "../Model/CartSchema.js"
dotenv.config();

const razorpayInstance=createRazorpayInstance();
export const createOrder=async(req,res)=>{
    //for trial frontend se amount le rhe hai
    //never do this in practice
    const orderData=req.body;
    const {userId, 
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            } = orderData;
            
        // console.log("Backend le cartitems",cartItems);
        // console.log(totalAmount);
        
        
        
    const options={
        amount: totalAmount*100, //smallest currency unit i.e paise in our case
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        payment_capture: 1,  // 1 for auto-capture
                notes: {
                    description: 'order description',  // Additional order info
                    items: JSON.stringify(cartItems.map(item => ({
                        name: item.title,
                        sku: item._id,
                        price: (item.price - (item.price * item.discount)).toFixed(2),
                        quantity: item.quantity
                    })))
                }
    }; 

    try{
        razorpayInstance.orders.create(options,async(err,order)=>{
            if( err){
                return res.status(500).json({
                    success: false,
                    message: "Error while creating razorpay order"
                });
            }else{
                const newOrder= new Order({
                    userId,
                    cartId,
                    paymentId:order.id,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus: "pending",
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                
                });
                await newOrder.save();
                res.status(201).json({
                    success: true,
                    order,
                    id: order.id, // Return Razorpay order ID for frontend
                    key: "rzp_test_pIRmD0pCH6Ut3K",
                    amount: options.amount,
                    currency: options.currency,
                    notes: options.notes,
                    orderId: newOrder._id

                })

            }
            // return res.status(200).json(order);
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Oops! something went wrong"
        })
    }
}

// export const verifyPayment=async(req,res)=>{
//     const {orderId, paymentId, sign} = req.body;
//     const  secret = process.env.RAZORPAY_KEY_SECRET;
//     const hmac = crypto.createHmac("sha256",secret);
//     hmac.update(orderId + "|" + paymentId);
//     const generatedSign=hmac.digest("hex");

//     if(generatedSign===sign){
//         return res.status(200).json({
//             success: true,
//             message: "Payment verified successfully!"
//         })

//     }else{
//         return res.status(400).json({
//             success:false,
//             message: "Payment not verified"
//         })
//     }

// }

export const capturePayment = async (req, res) => {
    try {
      const { paymentId, orderId } = req.body;
  
      let order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        });
      }
  
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = paymentId;
      const getCartId = order.cartId;
      await Cart.findByIdAndDelete(getCartId)
      
      await order.save();
      await res.status(200).json({
        success: true,
        message: 'Order confirmed',
        data:order,
      })

    } catch( e ){
        console.log(e);
        
    }
} 

export const getAllOrdersByUserId = async(req,res)=>{
    try{
        const {userId} = req.params;
        const orders = await Order.find({userId});
        if(!orders.length){
            return res.status(404).json({
                success: false,
                message: "no orders found",
            })
        }
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured",
        });
        
    }
}

export const getOrderDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success: false,
                message: "order not found",
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured",
        });
        
    }
}

// export const fetchPaymentDetails = async (paymentId) => {
//     try {
//         const payment = await razorpay.payments.fetch(paymentId);

//         if (!payment) {
//             throw new Error("Error fetching payment from Razorpay");
//         }

//         return {
//             status: payment.status,
//             method: payment.method,
//             amount: payment.amount,
//             currency: payment.currency,
//         };
//     } catch (error) {
//         throw new Error("Failed to fetch payment details");
//     }
// };

