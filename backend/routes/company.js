import express from "express";

import { getCompany, registerCompany, getUserCompany } from "../controllers/company.js";

const router = express.Router();

router.post("/", getCompany);
router.post("/users", getUserCompany);
router.post("/register", registerCompany);


export default router;