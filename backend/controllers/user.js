import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getCompany = async (req, res) => {
    try {
        const {company} = req.params;
        const users = await User.find({company: company});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
