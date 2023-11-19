import express from "express";
import { addPurchaseOrder, getPurchaseOrders } from "../controllers/purchase.js";

const router = express.Router();

router.post("/register", addPurchaseOrder)
router.get('/get/:rutCompany', getPurchaseOrders);

export default router;