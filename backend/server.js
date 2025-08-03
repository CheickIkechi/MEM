import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';
import enginRoutes from './src/routes/engin.js';
import proprioRoutes from './src/routes/proprietaire.js';
import transfertRoutes from './src/routes/transfert.js';
import { protect } from './src/middleware/auth.js';
import logger from './src/middleware/logger.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes publiques
app.use('/api/auth', authRoutes);

// Middleware d'auth (toutes les routes suivantes nécessitent un token)
app.use(protect);

// Logger (sera exécuté uniquement si req.user est présent)
app.use(logger('Action sur ressource'));

// Routes protégées
app.use('/api/engins', enginRoutes);
app.use('/api/proprietaires', proprioRoutes);
app.use('/api/transferts', transfertRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('❌ DB Connection Error:', err));
