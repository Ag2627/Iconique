import express from "express";
import { addProduct,fetchProducts, fetchProductById } from "../controller/product-controller.js";
import { userSignUp,userLogin,googleLogin,sellerSignup,googleSellerLogin, sellerLogin } from "../controller/user_controller.js";
import upload from "../config/cloudinary.js";
import { validateLogin, validateSignup } from "../Middleware/validateInput.js";


const router=express.Router();

router.post('/signup',validateSignup ,userSignUp);
router.post('/login',validateLogin,userLogin);
router.post('/seller-signup',upload.single('logo'),validateSignup,sellerSignup);
router.post('/seller-login',validateLogin,sellerLogin);
router.post('/google-login',googleLogin)
router.post('/google-sellerlogin',googleSellerLogin)

// router.post('/products', upload.single('image'), addProduct); // New route for adding product
router.get('/products',fetchProducts);
router.get('/product/:id',fetchProductById);
export default router