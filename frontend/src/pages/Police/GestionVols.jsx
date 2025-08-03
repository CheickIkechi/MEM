import { useState } from 'react';
import api from '../../api/api';
import { Search, AlertTriangle, CheckCircle, Edit3, X } from 'lucide-react';

const GestionVols = () => {
  const [numero, setNumero] = useState('');
  const [engin, setEngin] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const rechercherEngin = async () => {
    setError('');
    try {
      const { data } = await api.get(`/engins/${numero}`);
      setEngin(data);
    } catch {
      setError('Engin non trouvé');
      setEngin(null);
    }
  };

  const changerStatut = async (newStatut) => {
    if (!engin) return;
    await api.patch(`/engins/${engin._id}/statut`, { statut: newStatut });
    setEngin({ ...engin, statut: newStatut });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Search className="mr-2 text-blue-600" /> Gestion des Vols
          </h2>
          {engin && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              <Edit3 className="inline mr-2" />
            </button>
          )}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Numéro Identification"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={rechercherEngin}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Rechercher
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {engin && (
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Engin: {engin.numeroIdentification}</h3>
              <p className={engin.statut === 'vole' ? 'text-red-500' : 'text-green-500'}>
                {engin.statut.toUpperCase()}
              </p>
            </div>
            <p>Marque: {engin.marque}</p>
            <p>Type: {engin.typeTransport}</p>
            <p>Téléphone proprio: {engin.telephoneProprietaire}</p>
          </div>
        )}
      </div>

{engin && (
  <button
    onClick={() => setShowModal(true)}
    className="absolute top-6 right-6 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
  >
  </button>
)}

{showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-4 w-80 space-y-4">
      <h3 className="text-lg font-semibold">Changer statut</h3>
      <p className="text-gray-600 text-center">{engin.numeroIdentification}</p>
      {engin.statut === 'propre' ? (
        <button
          onClick={() => changerStatut('vole')}
          className="w-full bg-red-600 text-white py-2 rounded-md text-sm"
        >
          Déclarer Volé
        </button>
      ) : (
        <button
          onClick={() => changerStatut('propre')}
          className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
        >
          Déclarer Propre
        </button>
      )}
      <button
        onClick={() => setShowModal(false)}
        className="w-full text-gray-500 text-sm mt-2"
      >
        Annuler
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default GestionVols;
