import mongoose from "mongoose";

import Supplier from "../models/Supplier.js";

export const getSuppliers = async (req,res) =>{
    try{
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const registerSupplier = async (req,res) =>{
    try {
        const {
            nombre,
            rut,
            email,
            telefono,
            direccion,
            ciudad,
            comuna
        } = req.body;

        const rutSupplier = await Supplier.findOne({rut: rut});
        if (rutSupplier){
            res.status(400).json({error: "El rut ya esta registrado"});
        } else{
            const newSupplier = new Supplier({
                _id: new mongoose.Types.ObjectId(),
                nombre,
                rut,
                email,
                telefono,
                direccion,
                ciudad,
                comuna
            });
            const savedSupplier = await newSupplier.save();
            res.status(201).json(savedSupplier);
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}