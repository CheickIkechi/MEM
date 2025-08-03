import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  telephone: { type: String, unique: true, sparse: true, required: true },
  role: { type: String, enum: ['agent', 'police', 'gestionnaire'], required: true },
  password: { type: String, required: true }
});
export default mongoose.model('User', userSchema);