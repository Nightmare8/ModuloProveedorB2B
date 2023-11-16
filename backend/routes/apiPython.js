import express from 'express';

import { getRecommendation, getProductInfo } from '../controllers/apiPython/recommendation.js';
import { getUserRegisters } from '../controllers/apiPython/user.js';
import {getProducts, getProductsByCategory} from '../controllers/apiPython/categories.js';
const router = express.Router();

router.get('/products', getProducts)
router.get('/productsCategorie/:categorie', getProductsByCategory)
router.get('/users/:idUsuario', getUserRegisters)
router.post('/recommendations', getRecommendation)
router.post('/product', getProductInfo)

export default router;