import express from "express";
import { addProduct,fetchProducts, fetchProductById, fetchSellerProducts } from "../controller/product-controller.js";
import { userSignUp,userLogin,googleLogin,sellerSignup,googleSellerLogin, sellerLogin } from "../controller/user_controller.js";
import upload from "../config/cloudinary.js";
import { validateLogin, validateSignup } from "../Middleware/validateInput.js";
import { authenticate,localVariables } from "../Middleware/check-auth.js";
import { deleteUserProfile, getSellerProfile, getUserProfile,updateSellerProfile, updateUserProfile, deleteSellerProfile, generateOTP ,verifyOTP,createResetSession, resetPassword} from "../controller/profile_controller.js";

import { addProductReview,getProductReviews } from "../controller/product-review-controller.js";
// import { addPaymentGateway } from "../controller/payment-controller.js";
import { fetchCartItems,addToCart,deleteCartItem,updateCartItem } from "../controller/cart-controller.js"
import { addToWishList, getWishList, RemoveFromWishList } from "../controller/wishlist-controller.js";
import { sellerStats } from "../controller/dashboard-controller.js";
import {registerMail} from '../controller/mailer.js'
import { deliverMail } from "../controller/SellerOrder-controller.js";
const router=express.Router();
//login signup routes
router.post('/signup',validateSignup ,userSignUp);
router.post('/login',validateLogin,userLogin);
router.post('/seller-signup',upload.single('logo'),validateSignup,sellerSignup);
router.post('/seller-login',validateLogin,sellerLogin);
router.post('/google-login',googleLogin)
router.post('/google-sellerlogin',googleSellerLogin)
router.post('/generateOTP',generateOTP)
router.post('/verifyOTP',verifyOTP);
router.post('/createResetSession',createResetSession);
router.put('/resetPassword',resetPassword);
router.post('/registerMail',registerMail)


// router.post('/products', upload.single('image'), addProduct); // New route for adding product

//product routes
router.get('/products',fetchProducts);
router.get('/product/:id',fetchProductById);
router.get('/products/:sellerId',fetchSellerProducts)
//review routes
router.post('/review/add',addProductReview);
router.get('/review/:id',getProductReviews);
//cart routes
router.post('/cart/add',addToCart);
router.get('/cart/get/:userId',fetchCartItems)
router.put('/cart/update-cart',updateCartItem)
router.delete('/cart/:userId/:productId',deleteCartItem)

//wishlist routes 
router.post('/wishlist/add',authenticate,addToWishList);
router.get('/wishlist/get/:userId',authenticate,getWishList);
router.delete('/wishlist/delete/:userId/:productId',authenticate,RemoveFromWishList);

//overview stats
router.get('/overview/get/:id',authenticate,sellerStats)

//profile routes

router.get('/user/get/:id',authenticate,getUserProfile);
router.put('/user/edit/:id',authenticate,updateUserProfile);
router.delete('/user/delete/:id',authenticate,deleteUserProfile);
router.get('/seller/get/:id',authenticate,getSellerProfile);
router.put('/seller/edit/:id',authenticate,updateSellerProfile);
router.delete('/seller/delete/:sellerId',authenticate,deleteSellerProfile);
// router.delete('/seller/delete/:sellerId',authenticate,deleteProductsBySellerId);

router.put("/update-status/:orderId",deliverMail);

// router.post('/payment',addPaymentGateway);
export default router
