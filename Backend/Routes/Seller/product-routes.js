import express from "express";
const URL="http://localhost:5000/seller/products"
import upload from "../../config/cloudinary.js";
import { handleImageUpload,addProduct,editProduct,deleteProduct,fetchProducts } from "../../controller/product-controller.js";
import { authenticate, authenticateSeller} from "../../Middleware/check-auth.js";

const AdminProductRouter=express.Router();


// // Simple Test Route
// AdminProductRouter.get('/', (req, res) => {
//     res.send('Seller Products Route is Working!');
// });
AdminProductRouter.post('/upload-image',upload.single('image'),handleImageUpload);
AdminProductRouter.post(`/add`,authenticateSeller,addProduct);


AdminProductRouter.put(`${URL}/edit/:id`,authenticate,editProduct);
AdminProductRouter.delete(`${URL}/delete/:id`,deleteProduct);
AdminProductRouter.get(`${URL}/get`,authenticate,fetchProducts);


export default AdminProductRouter;