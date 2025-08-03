import mongoose from 'mongoose';
const proprietaireSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  pieceIdentite: String,
  adresse: String,
  telephone: String
});
export default mongoose.model('Proprietaire', proprietaireSchema);
