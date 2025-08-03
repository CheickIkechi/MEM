// src/routes/proprietaire.js
import { Router } from 'express';
import {  authorize } from '../middleware/auth.js';
import { createProprio } from '../controllers/proprietaireController.js';
const router = Router();
router.post('/',  authorize('agent'),  createProprio);
export default router;