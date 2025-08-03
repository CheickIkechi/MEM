import mongoose from 'mongoose';
const enginSchema = new mongoose.Schema({
  numeroIdentification: { type: String, unique: true, required: true },
  telephoneProprietaire: { type: String, required: true },
  typeTransport: { type: String, enum: ['moto','voiture','camion','autre'], default: 'moto' },
  marque: { type: String, required: true },
  statut: { type: String, enum: ['propre','vole'], default: 'propre' }
}, { timestamps: true });
export default mongoose.model('Engin', enginSchema);
