import mongoose from "mongoose";

import PurchaseOrder from "../models/PurchaseOrder.js";
import Product from "../models/Product.js";
import Company from "../models/Company.js";


export const addPurchaseOrder = async (req, res) => {
    try {
        let {
            productos,
            total,
            metodoPago,
            estadoPago,
            estadoEnvio,
            costoEnvio,
            dirEnvio,
            otrosDetalles,
            fechaOrden,
            fechaEntrega,
            companyBuyer,
            companySeller
        } = req.body;
        if (!productos) {
            res.status(400).json({ error: "No hay productos" });
        }
        if (!total) {
            res.status(400).json({ error: "No hay total" });
        }
        if (!metodoPago) {
            res.status(400).json({ error: "No hay metodo de pago" });
        }
        if (!estadoPago) {
            res.status(400).json({ error: "No hay estado de pago" });
        }
        if (!estadoEnvio) {
            estadoEnvio = "En espera";
        }
        if (!dirEnvio) {
            res.status(400).json({ error: "No hay direccion de envio" });
        }
        //El numero de orden debe ser uno mas que el anterior de la compania
        const company = await Company.findOne({rut: companyBuyer});
        const supplier = await Company.findOne({rut: companySeller});
        const numeroOrden = await PurchaseOrder.find({companyBuyer: company._id}).countDocuments();
        const newPurchaseOrder = new PurchaseOrder({
            _id: new mongoose.Types.ObjectId(),
            numeroOrden: numeroOrden + 1,
            productos,
            total,
            cantidadProductos: productos.length,
            metodoPago,
            estadoPago,
            estadoEnvio,
            costoEnvio,
            dirEnvio,
            otrosDetalles,
            fechaOrden,
            fechaEntrega,
            companyBuyer: company._id,
            companySeller: supplier._id
        });
        res.status(201).json({ message: "Purchase Order added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}