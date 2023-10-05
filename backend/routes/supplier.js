import express from "express";


import {getSuppliers,  registerSupplier } from "../controllers/supplier.js";

const router = express.Router();

router.get('/', getSuppliers);
router.post('/register', registerSupplier);

export default router;