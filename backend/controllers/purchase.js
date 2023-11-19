import mongoose from "mongoose";

import PurchaseOrder from "../models/PurchaseOrder.js";
import Company from "../models/Company.js";
import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";
import axios from "axios";

export const addPurchaseOrder = async (req, res) => {
    try {
        let {
            idProducto,
            titulo,
            categoria,
            descripcion,
            precio,
            cantidad,
            tags,
            imagen,
            link,
            region,
            ciudad,
            cantidadReviews,
            unaEstrella,
            dosEstrellas,
            tresEstrellas,
            cuatroEstrellas,
            cincoEstrellas,
            reviewPromedio,
            opiniones,
            likes,
            dislikes,
            metodoPago,
            estadoPago,
            estadoEnvio,
            costoEnvio,
            dirEnvio,
            otrosDetalles,
            fechaOrden, 
            fechaEntrega,
            companyBuyer,
            idVendedor, 
            nombre,
            tagsVendedor,
            email,
            telefono,
            regionVendedor,
            ciudadVendedor,
            reputacion,
            reputacionEstrellas,
            completadas,
            canceladas,
            total,
            ratingPositivo,
            ratingNegativo,
            ratingNeutral,
            ventas,
            reclamos, 
            entregasRetrasadas,
            cancelaciones,
            atributos
        } = req.body;
        
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
        if (!company) {
            res.status(400).json({ error: "No existe la compania" });
        }
        let supplier = await Supplier.findOne({idVendedor});
        //Verificar si existe el proveedor
        // console.log("supplier", supplier)
        console.log("id producto", idProducto)
        if (!supplier){
            console.log("se crea el proveedor")
            //Si no existe, crear y guardarlo
            const newSupplier = new Supplier({
                _id: new mongoose.Types.ObjectId(),
                idVendedor,
                nombre,
                email,
                telefono,
                tags: tagsVendedor,
                regionVendedor,
                ciudadVendedor,
                reputacion,
                reputacionEstrellas,
                reviewPromedio,
                completadas,
                canceladas,
                total,
                ratingPositivo,
                ratingNegativo,
                ratingNeutral,
                ventas,
                reclamos,
                entregasRetrasadas,
                cancelaciones
            });
            const currentSupplier = await newSupplier.save();
            supplier = currentSupplier;
            if (!currentSupplier) {
                res.status(400).json({ error: "No se pudo crear el proveedor" });
            }
        }
        //Verificar si existe el producto
        const verifyProduct = await Product.findOne({idProducto});
        //Si existe, no hay que agregarlo y solamente sumarle la cantidad que se compro
        if (verifyProduct) {
            //Sumarle la cantidad que se compro
            const newQuantity = verifyProduct.cantidad + cantidad;
            const newProduct = await Product.findOneAndUpdate({idProducto}, {cantidad: newQuantity});
            if (!newProduct) {
                res.status(400).json({ error: "No se pudo actualizar el producto" });
            }
        } else {
            //Agregar el producto
            const newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                idProducto,
                titulo,
                categoria,
                descripcion,
                precio,
                cantidad,
                tags,
                imagen,
                link,
                region,
                ciudad,
                cantidadReviews,
                unaEstrella,
                dosEstrellas,
                tresEstrellas,
                cuatroEstrellas,
                cincoEstrellas,
                reviewPromedio,
                opiniones,
                likes,
                dislikes,
                atributos,
                companyOwner: company._id,
                supplier: supplier._id
            });
            const saveProduct =await newProduct.save();
            if (!saveProduct) res.status(400).json({error: 'No se pudo guardar el nuevo producto'})
        }
        let productos = {
            idProducto,
            titulo,
            categoria,
            descripcion,
            precio,
            cantidad,
            tags,
            imagen,
            link,
            region,
            ciudad,
            cantidadReviews,
            unaEstrella,
            dosEstrellas,
            tresEstrellas,
            cuatroEstrellas,
            cincoEstrellas,
            reviewPromedio,
            opiniones,
            likes,
            dislikes,
            atributos,
            idVendedor: supplier.idVendedor
        }
        const newPurchaseOrder = new PurchaseOrder({
            _id: new mongoose.Types.ObjectId(),
            productos,
            total: precio * cantidad,
            cantidadProductos: cantidad,
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
        const currentPurchaseOrder = await newPurchaseOrder.save();
        if (!currentPurchaseOrder) {
            res.status(400).json({ error: "No se pudo crear la orden de compra" });
        }
        console.log("se creo la orden de compra, con id", currentPurchaseOrder._id)
        //Agregar la orden de compra a la ruta de python
        const url = process.env.LOCAL_PYTHON_URL + `addPurchaseOrder`;
        //Set fetch call
        const response = await axios.post(url, {idProducto, categoria});
        //Transform the data to json object
        
        if (response.data != "success") {
            res.status(400).json({ error: "No se pudo agregar la orden de compra a la ruta de python" });
        }
        res.status(201).json({status: 'success', message: "Purchase Order added successfully" });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: error.message });
    }
}

export const getPurchaseOrders = async (req, res) => {
    try {
        const {rutCompany} = req.params;
        //Chequear si existe la compañia
        const currentCompany = await Company.findOne({rut: rutCompany});
        if (!currentCompany){
            res.status(400).json({message: "No existe la compañia"});
        }

        const purchaseOrders = await PurchaseOrder.find({companyBuyer: currentCompany._id}).populate('companySeller').lean();
        console.log("purchaseOrders", purchaseOrders)
        if (!purchaseOrders) {
            res.status(400).json({ error: "No hay ordenes de compra" });
        }
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}