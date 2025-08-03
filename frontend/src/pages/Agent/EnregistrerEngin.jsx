// src/pages/Agent/EnregistrerEngin.jsx
import { useState } from 'react';
import api from '../../api/api';
import { brandsByType } from '../../constant/brands';
import { Truck, Phone, Hash, Tag } from 'lucide-react';

const EnregistrerEngin = () => {
  const [data, setData] = useState({
    numeroIdentification: '',
    telephoneProprietaire: '',
    typeTransport: 'moto',
    marque: brandsByType['moto'][0]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/engins', data);
      setSuccess('Engin enregistré avec succès !');
      setData({ numeroIdentification: '', telephoneProprietaire: '', typeTransport: 'moto', marque: brandsByType['moto'][0] });
    } catch (err) {
      setError(err.response?.data?.message || "Erreur à l'enregistrement");
    }
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setData({ ...data, typeTransport: type, marque: brandsByType[type][0] });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Truck className="mr-2 text-green-600" /> Enregistrer un Engin
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Hash className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Numéro Identification"
              value={data.numeroIdentification}
              onChange={e => setData({ ...data, numeroIdentification: e.target.value })}
              className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="tel"
              placeholder="Téléphone Propriétaire"
              value={data.telephoneProprietaire}
              onChange={e => setData({ ...data, telephoneProprietaire: e.target.value })}
              className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <select
              value={data.typeTransport}
              onChange={handleTypeChange}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {Object.keys(brandsByType).map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={data.marque}
              onChange={e => setData({ ...data, marque: e.target.value })}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {brandsByType[data.typeTransport].map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnregistrerEngin;