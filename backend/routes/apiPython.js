import express from 'express';

import { getRecommendation, getProductInfo } from '../controllers/apiPython/recommendation.js';
import { getUserRegisters } from '../controllers/apiPython/user.js';

const router = express.Router();

router.get('/users/:idUsuario', getUserRegisters)
router.get('/recommendations/:cantidad/:categoria', getRecommendation)
router.post('/product', getProductInfo)

export default router;