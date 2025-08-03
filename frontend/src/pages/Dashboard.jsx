
// src/pages/Dashboard.jsx
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { LogOut, Archive, ShieldCheck, Repeat } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  const actions = {
    agent: {
      icon: <Archive className="w-6 h-6" />, 
      label: 'Enregistrer Engin', 
      to: '/agent/engins', 
      bg: 'bg-green-600 hover:bg-green-700'
    },
    police: {
      icon: <ShieldCheck className="w-6 h-6" />, 
      label: 'Gérer Vols', 
      to: '/police/vols', 
      bg: 'bg-red-600 hover:bg-red-700'
    },
    gestionnaire: {
      icon: <Repeat className="w-6 h-6" />, 
      label: 'Transfert Propriété', 
      to: '/gestionnaire/transfert', 
      bg: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const { icon, label, to, bg } = actions[user.role] || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bienvenue, {user.nom}</h1>
        <button
          onClick={logout}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {icon && (
          <Link
            to={to}
            className={`${bg} flex items-center p-6 rounded-xl shadow-lg text-white transition`}
          >
            <div className="mr-4">{icon}</div>
            <div>
              <p className="text-xl font-semibold">{label}</p>
              <p className="text-sm opacity-90">Accéder à la fonction</p>
            </div>
          </Link>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
