import { useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext';
import api from '../../api/api'
import { Search, AlertTriangle, CheckCircle, LogOut } from 'lucide-react'

const GestionVols = () => {
  const { logout } = useAuth()
  const [numero, setNumero] = useState('')
  const [engin, setEngin] = useState(null)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  const rechercherEngin = async () => {
    setError(''); setEngin(null)
    try {
      const { data } = await api.get(`/engins/${numero}`)
      setEngin(data)
    } catch {
      setError('Engin non trouvé')
    }
  }

  const changerStatut = async (newStatut) => {
    await api.patch(`/engins/${engin._id}/statut`, { statut: newStatut })
    setEngin({ ...engin, statut: newStatut })
    setShowModal(false)
  }

  return (
    <div className="relative min-h-screen  bg-cover bg-center" style={{ backgroundImage: "url('/police.jpg')" }}>
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 p-6 flex flex-col items-center text-white">
        {/* Logout Button */}
        <button className="absolute top-6 right-6 text-red-400 hover:text-red-600" onClick={logout}>
          <LogOut />
        </button>

        <header className="w-full max-w-sm flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Search className="mr-2 text-blue-400" /> Gestion des Vols
          </h2>
        </header>

        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between">
            {engin && (
              <button onClick={() => setShowModal(true)} className="text-yellow-300 hover:text-yellow-500">
{engin.statut === 'propre' ? (
  <div className="flex items-center">
    <AlertTriangle className="inline mr-1" />
    <span>Signaler Volé</span>
  </div>
) : (
  <div className="flex items-center">
    <CheckCircle className="inline mr-1" />
    <span>Rétablir Propre</span>
  </div>
)}

              </button>
            )}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Numéro Identification"
              value={numero}
              onChange={e => setNumero(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-black"
            />
            <button onClick={rechercherEngin} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Rechercher
            </button>
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}

          {engin && (
            <div className="bg-white bg-opacity-90 p-4 rounded-xl shadow space-y-2 text-sm text-black">
              <p><strong>Numéro :</strong> {engin.numeroIdentification}</p>
              <p>
                <strong>Statut :</strong>{' '}
                <span className={engin.statut === 'vole' ? 'text-red-500' : 'text-green-500'}>
                  {engin.statut.toUpperCase()}
                </span>
              </p>
              <p><strong>Type :</strong> {engin.typeTransport}</p>
              <p><strong>Marque :</strong> {engin.marque}</p>
              <hr />
              <p><strong>Propriétaire :</strong> {engin.proprietaire.nom} {engin.proprietaire.prenom}</p>
              <p><strong>Pièce :</strong> {engin.proprietaire.typePiece} – {engin.proprietaire.numeroPiece}</p>
              <p><strong>Adresse :</strong> {engin.proprietaire.adresse}</p>
              <p><strong>Téléphone :</strong> {engin.proprietaire.telephone}</p>
            </div>
          )}
        </div>
      </div>

{showModal && engin && (
  <div key={engin._id + engin.statut} className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg w-64 space-y-4">
      <h3 className="text-lg font-semibold text-center">Changer le statut</h3>
      <p className="text-center text-gray-600">{engin.numeroIdentification}</p>
      <button
        onClick={() => changerStatut(engin.statut === 'propre' ? 'vole' : 'propre')}
        className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        {engin.statut === 'propre' ? 'Déclarer Volé' : 'Déclarer Propre'}
      </button>
      <button onClick={() => setShowModal(false)} className="w-full py-1 text-center text-gray-500 hover:text-gray-700">
        Annuler
      </button>
    </div>
  </div>
)}

    </div>
  )
}

export default GestionVols
