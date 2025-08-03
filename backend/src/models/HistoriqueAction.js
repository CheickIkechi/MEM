import mongoose from 'mongoose';
const histoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  engin: { type: mongoose.Schema.Types.ObjectId, ref: 'Engin' },
  date: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed
});
export default mongoose.model('HistoriqueAction', histoSchema);
