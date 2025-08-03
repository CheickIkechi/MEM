import Engin from '../models/Engin.js';

export const createEngin = async (req, res) => {
  const { numeroIdentification, telephoneProprietaire, typeTransport, marque } = req.body;
  if (!numeroIdentification || !telephoneProprietaire || !marque) 
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  try {
    const engin = await Engin.create({ numeroIdentification, telephoneProprietaire, typeTransport, marque });
    res.status(201).json(engin);
  } catch (err) {
    res.status(400).json({ message: err.code === 11000 ? 'Numéro déjà enregistré' : 'Erreur serveur' });
  }
};

export const searchEngin = async (req, res) => {
  const engin = await Engin.findOne({ numeroIdentification: req.params.num });
  if (!engin) return res.status(404).json({ message: 'Engin non trouvé' });
  res.json(engin);
};

export const updateStatut = async (req, res) => {
  const engin = await Engin.findByIdAndUpdate(req.params.id, { statut: req.body.statut }, { new: true });
  res.json(engin);
};