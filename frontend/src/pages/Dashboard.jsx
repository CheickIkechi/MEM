// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { Archive, ShieldCheck, Repeat } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const cards = [
    {
      role: 'agent',
      icon: <Archive className="w-8 h-8" />,
      label: 'Agent',
      desc: 'Enregistrer des engins',
      bg: 'bg-green-600 hover:bg-green-700'
    },
    {
      role: 'police',
      icon: <ShieldCheck className="w-8 h-8" />,
      label: 'Police',
      desc: 'Gérer les vols',
      bg: 'bg-red-600 hover:bg-red-700'
    },
    {
      role: 'gestionnaire',
      icon: <Repeat className="w-8 h-8" />,
      label: 'Gestionnaire',
      desc: 'Transférer une propriété',
      bg: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
        
      <h1 className="text-4xl font-bold mb-12">Mon Engin Mali</h1>
      <p className="mb-8 text-gray-700 text-center max-w-lg">
        Choisissez votre profil pour vous connecter et accéder à la fonctionnalité qui vous est dédiée.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {cards.map(c => (
          <div
            key={c.role}
            onClick={() => navigate(`/login?role=${c.role}`)}
            className={`${c.bg} cursor-pointer p-6 rounded-xl shadow-lg text-white flex flex-col items-center transition`}
          >
            {c.icon}
            <h2 className="mt-4 text-2xl font-semibold">{c.label}</h2>
            <p className="mt-2 text-center">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
