import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

//Register a new user
export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        console.log("resultado de lo que se obtiene", req.body)
        //Check if the user already exists
        
        if (password.length < 6 || password == undefined || password == null || password == "") {
            res.status(400).json({error: "La contraseña debe tener al menos 6 caracteres"})
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const emailUser = await User.findOne({email: email});
        console.log("emailUser", emailUser)
        if (emailUser) {
            res.status(400).json({error: "El correo ya esta registrado"})
        }else{
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name,
                email,
                password: passwordHash,
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const login = async (req, res) => {
    try {
        console.log("entra en el login");
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({error: "El correo no esta registrado"})
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({error: "Contraseña incorrecta"});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({error: error.message});        
    }
}