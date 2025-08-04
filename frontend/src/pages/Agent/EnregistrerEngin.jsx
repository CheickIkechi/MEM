// src/pages/Agent/EnregistrerEngin.jsx
import { useState } from 'react';
import api from '../../api/api';
import { Truck, Phone, Hash, User, BadgeCheck, Home } from 'lucide-react';
import { brandsByType } from '../../constant/brands';

const EnregistrerEngin = () => {
  const [data, setData] = useState({
    numeroIdentification: '',
    typeTransport: 'moto',
    marque: brandsByType['moto'][0],
    proprietaire: {
      nom: '',
      prenom: '',
      typePiece: 'CNI',
      numeroPiece: '',
      adresse: '',
      telephone: ''
    }
  });
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ error: '', success: '' });
    try {
      await api.post('/engins', data);
      setFeedback({ success: 'Engin et propriétaire enregistrés !', error: '' });
      setData({ numeroIdentification: '', typeTransport: 'moto', marque: brandsByType['moto'][0], proprietaire: { nom: '', prenom: '', typePiece: 'CNI', numeroPiece: '', adresse: '', telephone: '' } });
    } catch (err) {
      setFeedback({ error: err.response?.data?.message || "Erreur à l'enregistrement", success: '' });
    }
  };

  const handleChange = (field, value, parent) => {
    if (parent) {
      setData({ ...data, [parent]: { ...data[parent], [field]: value } });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Truck className="mr-2 text-green-600" /> Enregistrer un Engin</h2>
        {feedback.error && <p className="text-red-500">{feedback.error}</p>}
        {feedback.success && <p className="text-green-600">{feedback.success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Engin */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Hash className="absolute top-3 left-3 text-gray-400" />
              <input type="text" placeholder="Numéro Identification" value={data.numeroIdentification} onChange={e => handleChange('numeroIdentification', e.target.value)} className="w-full pl-10 py-2 border rounded-lg" required />
            </div>
            <select value={data.typeTransport} onChange={e => handleChange('typeTransport', e.target.value)} className="flex-1 p-2 border rounded-lg">
              {Object.keys(brandsByType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <select value={data.marque} onChange={e => handleChange('marque', e.target.value)} className="flex-1 p-2 border rounded-lg">
              {brandsByType[data.typeTransport].map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>
          {/* Propriétaire */}
          <h3 className="text-xl font-semibold">Informations Propriétaire</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" />
              <input type="text" placeholder="Nom" value={data.proprietaire.nom} onChange={e => handleChange('nom', e.target.value, 'proprietaire')} className="w-full pl-10 py-2 border rounded-lg" required />
            </div>
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" />
              <input type="text" placeholder="Prénom" value={data.proprietaire.prenom} onChange={e => handleChange('prenom', e.target.value, 'proprietaire')} className="w-full pl-10 py-2 border rounded-lg" required />
            </div>
            <div className="relative">
              <BadgeCheck className="absolute top-3 left-3 text-gray-400" />
              <select value={data.proprietaire.typePiece} onChange={e => handleChange('typePiece', e.target.value, 'proprietaire')} className="w-full pl-10 py-2 border rounded-lg">
                <option value="CNI">CNI</option>
                <option value="NINA">NINA</option>
                <option value="PASSPORT">Passport</option>
                <option value="AUTRE">Autre</option>
              </select>
            </div>
            <div className="relative">
              <BadgeCheck className="absolute top-3 left-3 text-gray-400" />
              <input type="text" placeholder="Numéro Pièce" value={data.proprietaire.numeroPiece} onChange={e => handleChange('numeroPiece', e.target.value, 'proprietaire')} className="w-full pl-10 py-2 border rounded-lg" required />
            </div>
            <div className="relative sm:col-span-2">
              <Home className="absolute top-3 left-3 text-gray-400" />
              <input type="text" placeholder="Adresse" value={data.proprietaire.adresse} onChange={e => handleChange('adresse', e.target.value, 'proprietaire')} className="w-full pl-10 py-2 border rounded-lg" required />
            </div>
            <div className="relative sm:col-span-2">
              <Phone className="absolute top-3 left-3 text-gray-400" />
              <input type="tel" placeholder="Téléphone" value={data.proprietaire.telephone} onChange={e => handleChange('telephone', e.target.value, 'proprietaire')} className="w-full pl-10 py-2 border rounded-lg" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default EnregistrerEngin;