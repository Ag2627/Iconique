import express from "express";
const URL="http://localhost:5000/seller/products"
import upload from "../../config/cloudinary.js";
import { handleImageUpload,addProduct,editProduct,deleteProduct,fetchProducts, fetchSellerProducts } from "../../controller/product-controller.js";
import { authenticate, authenticateSeller} from "../../Middleware/check-auth.js";

const AdminProductRouter=express.Router();


AdminProductRouter.post('/upload-image',upload.single('image'),handleImageUpload);
AdminProductRouter.post(`/add`,authenticateSeller,addProduct);


AdminProductRouter.put(`/edit/:id`,authenticateSeller,editProduct);
AdminProductRouter.delete(`/delete/:id`,authenticateSeller,deleteProduct);
AdminProductRouter.get(`/get/:sellerId`,authenticateSeller,fetchSellerProducts);


export default AdminProductRouter;