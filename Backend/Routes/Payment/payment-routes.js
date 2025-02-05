import express from 'express';
import { capturePayment, createOrder,getOrderDetails, getAllOrdersByUserId} from '../../controller/payment-controller.js';


const paymentRouter=express.Router();


paymentRouter.post('/createOrder',createOrder);
paymentRouter.post('/capturePayment',capturePayment)
paymentRouter.get('/list/:userId',getAllOrdersByUserId)
paymentRouter.get('/details/:id',getOrderDetails)

export default paymentRouter;