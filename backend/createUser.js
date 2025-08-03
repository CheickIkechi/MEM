import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js'; // Adjust the path as necessary
dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash('111111', 10);

    const user = await User.create({
      nom: 'gestionnaire',
      prenom: 'Test',
      telephone: '71111111',
      password: hashedPassword,
      role: 'police' // Change en 'police' ou 'gestionnaire' selon le besoin
    });

    console.log('Utilisateur créé avec succès:', user);
    process.exit();
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    process.exit(1);
  }
};

createUser();
