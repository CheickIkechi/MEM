import mongoose from 'mongoose';
const enginSchema = new mongoose.Schema({
  numeroIdentification: { type: String, unique: true, required: true },
  typeTransport: { type: String, enum: ['moto','voiture','camion','autre'], default: 'moto' },
  marque: { type: String, required: true },
  statut: { type: String, enum: ['propre','vole'], default: 'propre' },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire', required: true }
}, { timestamps: true });
export default mongoose.model('Engin', enginSchema);
