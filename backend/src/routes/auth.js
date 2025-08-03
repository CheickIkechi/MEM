// src/routes/auth.js
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
export default router;