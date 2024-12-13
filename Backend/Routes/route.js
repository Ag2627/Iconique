import express from "express";
import { addProduct, getProducts } from "../controller/product-controller.js";
import { userSignUp,userLogin,googleLogin,sellerSignup,googleSellerLogin, sellerLogin } from "../controller/user_controller.js";
import upload from "../config/cloudinary.js";
const router=express.Router();

router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.post('/seller-signup',upload.single('logo'),sellerSignup);
router.post('seller-login',sellerLogin);
router.post('/google-login',googleLogin)
router.post('/google-sellerlogin',googleSellerLogin)
router.get('/products',getProducts);
router.post('/products', upload.single('image'), addProduct); // New route for adding product
export default router