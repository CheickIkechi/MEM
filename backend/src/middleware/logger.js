// src/middleware/logger.js
import HistoriqueAction from '../models/HistoriqueAction.js';

/**
 * Middleware de logging des actions utilisateur.
 * @param {string} actionName - Le nom de l'action (ex: "Enregistrement Engin").
 * @returns {Function} Middleware Express.
 */
const logger = (actionName) => async (req, res, next) => {
res.on('finish', async () => {
  if (res.statusCode < 400 && req.user) {
    try {
      await HistoriqueAction.create({
        user: req.user._id,
        action: actionName,
        engin: req.body.engin // ou ce que tu veux logguer
      })
    } catch (err) {
      console.error('Erreur lors de la création de l’historique:', err)
    }
  } else {
    console.warn('Logger ignoré : utilisateur non authentifié ou statusCode >= 400')
  }
})


  next();
};

export default logger;
