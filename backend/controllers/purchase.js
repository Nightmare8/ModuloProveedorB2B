import mongoose from "mongoose";

import PurchaseOrder from "../models/PurchaseOrder.js";
import Product from "../models/Product.js";
import Company from "../models/Company.js";


export const addPurchaseOrder = async (req, res) => {
    try {
        const {
            fecha,
            productos,
            total,
            metodoPago,
            estadoPago,
            estadoEnvio,
            dirEnvio,
            otrosDetalles,
            buyer,
            seller
        } = req.body;
        
        res.status(201).json({ message: "Purchase Order added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}