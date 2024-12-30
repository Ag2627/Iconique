import { createRazorpayInstance } from "../config/razorpay-config.js";
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const razorpayInstance=createRazorpayInstance();
export const createOrder=async(req,res)=>{
    //for trial frontend se amount le rhe hai
    //never do this in practice
    const { productId, amount }=req.body;

    const options={
        amount: amount*100, //smallest currency unit i.e paise in our case
        currency: "INR",
        receipt: `receipt_order_1`,
    }; 

    try{
        razorpayInstance.orders.create(options,(err,order)=>{
            if( err){
                return res.status(500).json({
                    success: false,
                    message: "Oops! something went wrong"
                });
            }
            return res.status(200).json(order);
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Oops! something went wrong"
        })
    }
}

export const verifyPayment=async(req,res)=>{
    const {orderId, paymentId, sign} = req.body;
    const  secret = process.env.RAZORPAY_KEY_SECRET;
    const hmac = crypto.createHmac("sha256",secret);
    hmac.update(orderId + "|" + paymentId);
    const generatedSign=hmac.digest("hex");

    if(generatedSign===sign){
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully!"
        })

    }else{
        return res.status(400).json({
            success:false,
            message: "Payment not verified"
        })
    }

}

export const fetchPaymentDetails = async (paymentId) => {
    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            throw new Error("Error fetching payment from Razorpay");
        }

        return {
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency,
        };
    } catch (error) {
        throw new Error("Failed to fetch payment details");
    }
};

