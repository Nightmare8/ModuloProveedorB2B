import express  from "express";
import {getCompany} from '../controllers/user.js'

import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getCompany);


export default router;