// src/pages/Agent/TransfertPropriete.jsx
import { useState } from 'react';
import api from '../../api/api';
import { Repeat, Key, User, BadgeCheck, Phone, Home, LogOut } from 'lucide-react';
import { useAuth } from '../../Contexts/AuthContext';

const TransfertPropriete = () => {
      const {  logout } = useAuth()
    
  const [numeroIdent, setNumeroIdent] = useState('');
  const [engin, setEngin] = useState(null);
  const [newProprioData, setNewProprioData] = useState({
    nom: '', prenom: '', typePiece: 'CNI', numeroPiece: '', adresse: '', telephone: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Recherche l'engin
  const rechercherEngin = async () => {
    setError(''); setEngin(null); setMessage('');
    try {
      const { data } = await api.get(`/engins/${numeroIdent}`);
      setEngin(data);
      // Pré-remplir le champ telephone pour ancien proprio
    } catch {
      setError('Engin non trouvé');
    }
  };

  // Handle change
  const handleChange = (field, value) => {
    setNewProprioData(prev => ({ ...prev, [field]: value }));
  };

  // Transfert
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    try {
      const payload = {
        enginId: engin._id,
        oldProprioTel: engin.proprietaire.telephone,
        newProprioData
      };
      const res = await api.post('/transferts', payload);
      setMessage(res.data.message);
      // reset
      setEngin(null);
      setNumeroIdent('');
      setNewProprioData({ nom: '', prenom: '', typePiece: 'CNI', numeroPiece: '', adresse: '', telephone: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du transfert.');
    }
  };

return (
  <div className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/case.jpg')" }}>
    {/* Overlay sombre */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

    <div className="relative z-10 w-full max-w-xl p-6 space-y-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-3xl font-bold flex items-center">
          <Repeat className="mr-2 text-blue-400 text-lg" /> Transfert de Propriété
        </h5>
        <button onClick={logout} className="text-red-400 hover:text-red-600">
          <LogOut />
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Key className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Numéro Identification"
            value={numeroIdent}
            onChange={e => setNumeroIdent(e.target.value)}
            className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <button onClick={rechercherEngin} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Rechercher Engin
        </button>
        {error && <p className="text-red-300">{error}</p>}
      </div>

      {engin && (
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow space-y-6 text-black">
          <div>
            <p><strong>Engin :</strong> {engin.numeroIdentification}</p>
            <p><strong>Proprio actuel :</strong> {engin.proprietaire.nom} {engin.proprietaire.prenom}</p>
            <p><strong>Téléphone actuel :</strong> {engin.proprietaire.telephone}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Nouveau Propriétaire</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" />
                <input type="text" placeholder="Nom" value={newProprioData.nom} onChange={e => handleChange('nom', e.target.value)} className="w-full pl-10 py-2 border rounded-lg" required />
              </div>
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" />
                <input type="text" placeholder="Prénom" value={newProprioData.prenom} onChange={e => handleChange('prenom', e.target.value)} className="w-full pl-10 py-2 border rounded-lg" required />
              </div>
              <div className="relative">
                <BadgeCheck className="absolute top-3 left-3 text-gray-400" />
                <select value={newProprioData.typePiece} onChange={e => handleChange('typePiece', e.target.value)} className="w-full pl-10 py-2 border rounded-lg">
                  <option value="CNI">CNI</option>
                  <option value="NINA">NINA</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </div>
              <div className="relative">
                <BadgeCheck className="absolute top-3 left-3 text-gray-400" />
                <input type="text" placeholder="Numéro Pièce" value={newProprioData.numeroPiece} onChange={e => handleChange('numeroPiece', e.target.value)} className="w-full pl-10 py-2 border rounded-lg" required />
              </div>
              <div className="relative sm:col-span-2">
                <Home className="absolute top-3 left-3 text-gray-400" />
                <input type="text" placeholder="Adresse" value={newProprioData.adresse} onChange={e => handleChange('adresse', e.target.value)} className="w-full pl-10 py-2 border rounded-lg" required />
              </div>
              <div className="relative sm:col-span-2">
                <Phone className="absolute top-3 left-3 text-gray-400" />
                <input type="tel" placeholder="Téléphone" value={newProprioData.telephone} onChange={e => handleChange('telephone', e.target.value)} className="w-full pl-10 py-2 border rounded-lg" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Confirmer Transfert
            </button>
          </form>

          {message && <p className="text-center text-green-600">{message}</p>}
        </div>
      )}
    </div>
  </div>
);

};

export default TransfertPropriete;