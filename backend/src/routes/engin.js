// src/routes/engin.js
import { Router } from 'express';
import {  authorize } from '../middleware/auth.js';
import { createEngin, searchEngin, updateStatut } from '../controllers/enginController.js';
const router = Router();
router.post('/',  authorize('agent'), createEngin);
router.get('/:num', authorize('police', 'gestionnaire'), searchEngin);
router.patch('/:id/statut', authorize('police'), updateStatut);
export default router;