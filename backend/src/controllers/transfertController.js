// src/controllers/transfertController.js
import Engin from '../models/Engin.js';
import Proprietaire from '../models/Proprietaire.js';
import Tracabilite from '../models/TracabilitePropriete.js';

export const transferer = async (req, res) => {
  const { enginId, oldProprioTel, newProprioData } = req.body;

  // 1. Vérifie si l’Engin existe
  const engin = await Engin.findById(enginId).populate('proprietaire');
  if (!engin) return res.status(404).json({ error: 'Engin non trouvé.' });

  // 2. Vérifie numéro proprio actuel
  if (engin.proprietaire.telephone !== oldProprioTel) {
    return res.status(400).json({ error: 'Téléphone actuel ne correspond pas.' });
  }

  // 3. Nouveau proprio : recherche ou création complète
  let newProprio = await Proprietaire.findOne({ numeroPiece: newProprioData.numeroPiece });
  if (!newProprio) {
    newProprio = await Proprietaire.create(newProprioData);
  }

  // 4. Transfert
  engin.proprietaire = newProprio._id;
  await engin.save();

  // 5. Historique
  await Tracabilite.create({
    engin: engin._id,
    fromProprietaire: engin.proprietaire._id,
    toProprietaire: newProprio._id
  });

  return res.json({ message: 'Transfert réussi.', engin });
};
