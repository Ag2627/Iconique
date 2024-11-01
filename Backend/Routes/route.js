import express from "express";
import { userSignUp,userLogin,googleLogin } from "../controller/user_controller.js";
const router=express.Router();

router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.post('/google-login',googleLogin)
export default router