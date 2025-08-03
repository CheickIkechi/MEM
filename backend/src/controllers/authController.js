import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { nom, prenom, telephone, role, mdp } = req.body;
  const password = await bcrypt.hash(mdp, 10);
  const user = await User.create({ nom, prenom, telephone, role, password });
  res.status(201).json({ id: user._id });
};

export const login = async (req, res) => {
  try {
    const { telephone, password } = req.body;
    console.log("📥 Tentative de login :", { telephone, password });

    const user = await User.findOne({ telephone });
    if (!user) {
      console.log("❌ Téléphone inconnu :", telephone);
      return res.status(401).json({ message: 'Téléphone inconnu' });
    }

    console.log("🔍 Utilisateur trouvé :", user.telephone);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("❌ Mot de passe incorrect pour :", telephone);
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    console.log("✅ Authentification réussie pour :", telephone);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    console.error("🔥 Erreur serveur lors du login :", err);
    res.status(500).json({ message: 'Erreur serveur lors du login' });
  }
};

export const getProfile = (req, res) => {
  try {
    const user = req.user;  // req.user sera rempli par le middleware JWT
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de récupération du profil' });
  }
};

