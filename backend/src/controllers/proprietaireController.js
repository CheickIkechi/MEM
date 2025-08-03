import Proprietaire from '../models/Proprietaire.js';
export const createProprio = async (req, res) => {
  const p = await Proprietaire.create(req.body);
  res.status(201).json(p);
};
