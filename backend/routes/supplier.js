import express from "express";


import { registerSupplier } from "../controllers/supplier.js";

const router = express.Router();

router.post('/register', registerSupplier);

export default router;