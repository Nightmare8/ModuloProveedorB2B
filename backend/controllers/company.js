import mongoose from "mongoose";

import User from "../models/User.js";
import Company from "../models/Company.js";
//Register new company
export const registerCompany = async (req, res) => {
    try {
        console.log("entra a registrar compañia")
        const {
            rut,
            nombre,
            detalle,
            razonSocial,
            giro,
            actEco,
            email,
            emailUser,
            comuna,
            ciudad,
            direccion,
            telefono,
            precio,
            velocidad,
            confianza,
            calidad,
            variedad,
            workers,
            telefonos,
            tablet,
            notebook,
            consolas,
            camaras,
        } = req.body;
        console.log("req body", req.body)
        const rutCompany = await Company.findOne({ rut: rut });
        if (rutCompany) {
            res.status(400).json({ error: "El rut ya esta registrado" });
        }
        else{
            const priority = [
                { name: "precio", rating: precio },
                { name: "velocidad", rating: velocidad },
                { name: "confianza", rating: confianza },
                { name: "calidad", rating: calidad },
                { name: "variedad", rating: variedad },
            ]
            const productTypes = [];
            if(telefonos){
                productTypes.push({name: "telefonos"});
            } if(tablet){
                productTypes.push({name: "tablet"});
            } if(notebook){
                productTypes.push({name: "notebook"});
            } if (consolas){
                productTypes.push({name: "consolas"});
            } if (camaras){
                productTypes.push({name: "camaras"});
            }

            const newCompany = new Company({
                _id: new mongoose.Types.ObjectId(),
                rut,
                razonSocial,
                nombre,
                detalle,
                giro,
                actEco,
                email,
                comuna,
                ciudad,
                direccion,
                telefono,
                datos: {
                    workers,
                    productTypes,
                    priority,
                }
            });
            const savedCompany = await newCompany.save();
            //Hay que actualizar tambien el dato asociado al usuario
            //El email para el usuario es el mismo para la compañia
            await User.findOneAndUpdate({email: emailUser}, {company: rut, companyName: nombre, type: 1});
            res.status(201).json(savedCompany);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCompany = async (req, res) => {
    try {
        const { rut } = req.body;
        const company = await Company.findOne({ rut: rut });
        if (company) {
            res.status(200).json(company);
        }
        else{
            res.status(400).json({ error: "No se encontro la compañia" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserCompany = async (req, res) => {
    try {
        const {rut} = req.body;
        const users = await User.find({company: rut});
        if (users) {
            res.status(200).json(users);
        } else{
            res.status(400).json({ error: "No se encontraron usuarios" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}