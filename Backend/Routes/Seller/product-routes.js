import express from "express";

import upload from "../../config/cloudinary.js";
import { handleImageUpload,addProduct,editProduct,deleteProduct,fetchProducts } from "../../controller/product-controller.js";
import { authenticateSeller } from "../../Middleware/check-auth.js";

const AdminProductRouter=express.Router();



AdminProductRouter.post('/upload-image',upload.single('image'),authenticateSeller,handleImageUpload);
AdminProductRouter.post('/add',authenticateSeller,addProduct);
AdminProductRouter.put('/edit/:id',authenticateSeller,editProduct);
AdminProductRouter.delete('/delete/:id',deleteProduct);
AdminProductRouter.get('/get',authenticateSeller,fetchProducts);


export default AdminProductRouter;