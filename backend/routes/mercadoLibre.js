import express from "express";

import { getToken, refreshToken } from "../controllers/token/getToken.js";
import { getSeller } from "../controllers/sellers/getSeller.js";
import { getItems } from "../controllers/categories/getItems.js";
import { getAtributes } from "../controllers/categories/getAtributes.js";
import { getReviews } from "../controllers/Item/getReviews.js";
import { getDescription } from "../controllers/Item/getDescription.js";

const router = express.Router();

router.post("/", getToken);
router.get("/refresh", refreshToken);
//Sellers
router.post("/seller", getSeller);
router.post('/categories/getAtributes', getAtributes );
router.post('/categories/getItems', getItems );
//Items
router.post('/item/getReviews', getReviews );
router.post('/item/getDescription', getDescription );

export default router;