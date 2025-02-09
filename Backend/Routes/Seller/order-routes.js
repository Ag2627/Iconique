import express from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForSeller,
  updateOrderStatus,
} from "../../controller/SellerOrder-controller.js"; 

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForSeller);
router.put("/update/:id", updateOrderStatus);

export default router;
