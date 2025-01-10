import express from 'express';
import { createOrder,verifyPayment } from '../../controller/payment-controller.js';

const paymentRouter=express.Router();


paymentRouter.post('/createOrder',createOrder);
paymentRouter.post('/verifyPayment',verifyPayment)

export default paymentRouter;