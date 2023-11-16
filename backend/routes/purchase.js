import express from "express";
import { addPurchaseOrder } from "../controllers/purchase.js";

const router = express.Router();

router.post("/register", addPurchaseOrder)

export default router;