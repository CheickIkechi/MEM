// src/middleware/logger.js
import HistoriqueAction from '../models/HistoriqueAction.js';

/**
 * Middleware de logging des actions utilisateur.
 * @param {string} actionName - Le nom de l'action (ex: "Enregistrement Engin").
 * @returns {Function} Middleware Express.
 */

const logger = (actionName) => (req, res, next) => {
  res.on('finish', async () => {
    // On ne logge que si req.user existe ET que la réponse est OK
    if (req.user && res.statusCode < 400) {
      try {
        await HistoriqueAction.create({
          user: req.user._id,
          action: actionName,
          engin: req.body.enginId    // ← match exactement la propriété envoyée
        });
      } catch (err) {
        console.error('Erreur création historique:', err);
      }
    }
  });
  next();
};

export default logger;

