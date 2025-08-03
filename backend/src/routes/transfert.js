// src/routes/transfert.js
import { Router } from 'express';
import {  authorize } from '../middleware/auth.js';
import { transferer } from '../controllers/transfertController.js';
const router = Router();
router.post('/',  authorize('gestionnaire'),  transferer);
export default router;