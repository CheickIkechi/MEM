import mongoose from 'mongoose';
const traceSchema = new mongoose.Schema({
  engin: { type: mongoose.Schema.Types.ObjectId, ref: 'Engin' },
  fromProprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire' },
  toProprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire' },
  date: { type: Date, default: Date.now }
});
export default mongoose.model('TracabilitePropriete', traceSchema);
