import { useState } from 'react';
import api from '../../api/api';
import { Search, AlertTriangle, CheckCircle, Edit3 } from 'lucide-react';

const GestionVols = () => {
  const [numero, setNumero] = useState('');
  const [engin, setEngin] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const rechercherEngin = async () => {
    setError(''); setEngin(null);
    try {
      const { data } = await api.get(`/engins/${numero}`);
      setEngin(data);
    } catch {
      setError('Engin non trouvé');
    }
  };

  const changerStatut = async (newStatut) => {
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
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              <Edit3 className="inline mr-1" /> Modifier
            </button>
          )}
        </div>

        {/* Recherche */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Numéro Identification"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={rechercherEngin}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Rechercher
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {/* Détails de l'engin */}
        {engin && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">
            <h3 className="text-xl font-semibold">Engin {engin.numeroIdentification}</h3>
            <p><strong>Statut:</strong> <span className={engin.statut==='vole'?'text-red-500':'text-green-500'}>{engin.statut.toUpperCase()}</span></p>
            <p><strong>Type:</strong> {engin.typeTransport}</p>
            <p><strong>Marque:</strong> {engin.marque}</p>
            <hr/>
            <h4 className="font-semibold">Propriétaire</h4>
            <p><strong>Nom:</strong> {engin.proprietaire.nom} {engin.proprietaire.prenom}</p>
            <p><strong>Pièce:</strong> {engin.proprietaire.typePiece} - {engin.proprietaire.numeroPiece}</p>
            <p><strong>Adresse:</strong> {engin.proprietaire.adresse}</p>
            <p><strong>Téléphone:</strong> {engin.proprietaire.telephone}</p>
          </div>
        )}
      </div>

      {/* Modal pour changer le statut */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 space-y-4">
            <h3 className="text-lg font-semibold">Changer le statut</h3>
            <p className="text-gray-600 text-center">{engin.numeroIdentification}</p>
            {engin.statut === 'propre' ? (
              <button
                onClick={() => changerStatut('vole')}
                className="w-full bg-red-600 text-white py-2 rounded"
              >
                <AlertTriangle className="inline mr-2" /> Déclarer Volé
              </button>
            ) : (
              <button
                onClick={() => changerStatut('propre')}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                <CheckCircle className="inline mr-2" /> Déclarer Propre
              </button>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="w-full text-center text-gray-500 mt-2"
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
