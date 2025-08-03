// src/controllers/transfertController.js
import Engin from '../models/Engin.js';
import Proprietaire from '../models/Proprietaire.js';
import Tracabilite from '../models/TracabilitePropriete.js';

export const transferer = async (req, res) => {
  const { enginId, oldProprioTel, newProprioTel } = req.body;

  // 1. Vérifie si l’Engin existe
  const engin = await Engin.findById(enginId).populate('proprietaire');
  if (!engin) {
    return res.status(404).json({ error: 'Engin non trouvé dans nos bases.' });
  }

  // 2. Vérifie si le proprio actuel correspond au numéro fourni
  if (engin.proprietaire.telephone !== oldProprioTel) {
    return res.status(400).json({ error: 'Le numéro du propriétaire actuel ne correspond pas.' });
  }

  // 3. Vérifie si le nouveau propriétaire existe
  let newProprio = await Proprietaire.findOne({ telephone: newProprioTel });
  if (!newProprio) {
    // Si le nouveau proprio n’existe pas, crée-le (ou retourne une erreur selon ta logique)
    newProprio = await Proprietaire.create({ telephone: newProprioTel });
  }

  // 4. Effectuer le transfert
  engin.proprietaire = newProprio._id;
  await engin.save();

  // 5. Tracer la propriété
  await Tracabilite.create({
    engin: engin._id,
    fromProprietaire: engin.proprietaire._id,
    toProprietaire: newProprio._id
  });

  return res.json({ message: 'Transfert effectué avec succès.', engin });
};
