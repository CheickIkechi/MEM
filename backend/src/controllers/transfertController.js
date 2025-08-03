// src/controllers/transfertController.js
import Engin from '../models/Engin.js';
import Tracabilite from '../models/TracabilitePropriete.js';
export const transferer = async (req, res) => {
  const { enginId, oldProprioId, newProprioId } = req.body;
  const engin = await Engin.findByIdAndUpdate(enginId, { proprietaire: newProprioId }, { new: true });
  await Tracabilite.create({ engin: enginId, fromProprietaire: oldProprioId, toProprietaire: newProprioId });
  res.json(engin);
};