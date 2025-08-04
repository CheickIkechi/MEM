import mongoose from 'mongoose';

/**
 * Schéma Propriétaire avec détails d'identité
 */
const proprietaireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  typePiece: { type: String, enum: ['NINA','CNI','PASSPORT','AUTRE'], required: true },
  numeroPiece: { type: String, required: true, unique: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model('Proprietaire', proprietaireSchema);
