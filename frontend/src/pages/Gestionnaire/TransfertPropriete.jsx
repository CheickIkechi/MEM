// src/pages/Gestionnaire/TransfertPropriete.jsx
import { useState } from 'react';
import api from '../../api/api';
import { Repeat, Key } from 'lucide-react';

const TransfertPropriete = () => {
  const [enginId, setEnginId] = useState('');
  const [oldProprioId, setOldProprioId] = useState('');
  const [newProprioId, setNewProprioId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transferts', { enginId, oldProprioId, newProprioId });
      setMessage('Transfert effectué avec succès');
      setEnginId(''); setOldProprioId(''); setNewProprioId('');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage('Erreur lors du transfert');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Repeat className="mr-2 text-blue-600" /> Transfert de Propriété
        </h2>
        {message && <p className="text-center text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Key className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="ID Engin"
              value={enginId}
              onChange={e => setEnginId(e.target.value)}
              className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <input
            type="text"
            placeholder="ID Ancien Propriétaire"
            value={oldProprioId}
            onChange={e => setOldProprioId(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="ID Nouveau Propriétaire"
            value={newProprioId}
            onChange={e => setNewProprioId(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Effectuer le Transfert
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransfertPropriete;
