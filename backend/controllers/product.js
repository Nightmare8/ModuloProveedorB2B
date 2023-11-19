import mongoose from "mongoose";

import Product from "../models/Product.js";
import Company from "../models/Company.js";
import Supplier from "../models/Supplier.js";

export const getProducts = async (req, res) => {
    try {
        const {rutCompany} = req.params;
        //Chequear si existe la compañia
        console.log("rutCompany", rutCompany)
        const company = await Company.findOne({rut: rutCompany});
        console.log("company", company)
        if (!company){
            res.status(400).json({message: "No existe la compañia"});
        }
        //Si existe, buscar los productos de esa compañia
        const products = await Product.find({companyOwner: company._id}).populate("supplier").lean();
        if (!products){
            res.status(400).json({message: "No existen productos para esta compañia"});
        }
        console.log("products", products)
        res.status(200).json(products);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message})
    }
}

const saveProducts = async (datos, cantidad) =>{
    for (let i = 0; i < cantidad; i++) {
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            ...datos
        });
        await newProduct.save();
    } 
}

export const registerProduct = async (req, res) => {
    try {
        let {
            codigo,
            nombre,
            sku,
            lote,
            categoria,
            subCategoria,
            marca,
            modelo,
            detalle,
            color,
            precio,
            cantidad,
            estado,
            companyOwner,
            supplier
        } = req.body;
        if (!cantidad){
            res.status(400).json({message: "Debe indicar una cantidad"});
        }
        const skuProducto = await  Product.findOne({ sku: sku });
        if (skuProducto) {
            res.status(400).json({ error: "El sku ya esta registrado" });
        } else{
            let datos = {
                codigo,
                nombre,
                sku, 
                lote,
                categoria,
                subCategoria,
                marca,
                modelo,
                detalle,
                color,
                precio,
                estado
            }
            if (companyOwner){
                const company = await Company.findOne({rut: companyOwner}).lean();
                // companyOwner: company._id;
                datos.companyOwner = company._id;
            }
            if (!supplier == ''){
                const supplierOwner = await Supplier.findOne({rut: supplier});
                datos.supplier = supplierOwner._id;
            }
            await saveProducts(datos, cantidad);
            res.status(201).json({message: "Se agregaron todos los productos"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}