import { authenticate } from "../../Middleware/check-auth.js";
import { addAddress,fetchallAddress,editAddress,deleteAddress } from "../../controller/address-controller.js";
import express from "express";
const AddressRouter=express.Router();
AddressRouter.post('/add',authenticate ,addAddress);
AddressRouter.get('/get/:userId',authenticate,fetchallAddress);
AddressRouter.delete('/delete/:userId/:addressId',authenticate,deleteAddress);
AddressRouter.put('/edit/:userId/:addressId',authenticate,editAddress);

export default AddressRouter;