import express from "express";

const router = express.Router();

import { getProducts, registerProduct } from "../controllers/product.js";

router.get('/', getProducts);
router.post("/register", registerProduct);

export default router;