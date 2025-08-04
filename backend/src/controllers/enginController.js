import Engin from '../models/Engin.js';
import Proprietaire from '../models/Proprietaire.js';

export const createEngin = async (req, res) => {
  const {
    numeroIdentification,
    typeTransport,
    marque,
    proprietaire: {
      nom,
      prenom,
      typePiece,
      numeroPiece,
      adresse,
      telephone
    } = {}
  } = req.body;

  if (!numeroIdentification || !marque || !nom || !prenom || !typePiece || !numeroPiece || !adresse || !telephone) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    // Recherche ou création du propriétaire
    let proprio = await Proprietaire.findOne({ numeroPiece });
    if (!proprio) {
      proprio = await Proprietaire.create({ nom, prenom, typePiece, numeroPiece, adresse, telephone });
    }

    // Création de l'engin
    const engin = await Engin.create({ numeroIdentification, typeTransport, marque, proprietaire: proprio._id });
    // Renvoyer engin avec propriétaire peuplé
    const fullEngin = await Engin.findById(engin._id).populate('proprietaire');
    res.status(201).json(fullEngin);
  } catch (err) {
    res.status(400).json({ message: err.code === 11000 ? 'Numéro déjà enregistré' : 'Erreur serveur' });
  }
};

export const searchEngin = async (req, res) => {
  const numero = req.params.num.trim();
  console.log('Recherche Engin avec numéro:', numero);

  const engin = await Engin.findOne({ numeroIdentification: numero }).populate('proprietaire');
  if (!engin) {
    console.log('❌ Aucun engin trouvé pour ce numéro');
    return res.status(404).json({ message: 'Engin non trouvé' });
  }

  if (!engin.proprietaire) {
    console.log('⚠️ Propriétaire manquant pour cet engin');
  }

  console.log('✅ Engin trouvé:', engin);
  res.json(engin);
};


export const updateStatut = async (req, res) => {
  const engin = await Engin.findByIdAndUpdate(req.params.id, { statut: req.body.statut }, { new: true })
    .populate('proprietaire');
  res.json(engin);
};