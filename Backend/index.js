import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import Connection from "./Database/db.js"
import router from "./Routes/route.js"
import bodyParser from "body-parser"
import AdminProductRouter from "./Routes/Seller/product-routes.js";
import AddressRouter from "./Routes/Address/address-routes.js";
import { createOrder } from "./controller/payment-controller.js"
import paymentRouter from './Routes/Payment/payment-routes.js'
import Seller from "./Model/seller_schema.js"
import { authenticate } from "./Middleware/check-auth.js"
import sellerOrderRouter from "./Routes/Seller/order-routes.js"
const app = express()

dotenv.config()

app.use(express.json())

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',router);
app.use('/seller/products',AdminProductRouter);
app.use('/address',AddressRouter);
app.use('/payment',paymentRouter);
app.use('/seller/orders',sellerOrderRouter)

const port =5000
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);
app.listen(port, () =>{
  console.log(`server running at http://localhost:${port}`)
})




  

