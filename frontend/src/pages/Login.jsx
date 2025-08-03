// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, Phone } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = await login(telephone, password);  // <-- On récupère le user après login

    // Redirection selon le rôle
    if (user.role === 'agent') {
      navigate('/agent/engins');
    } else if (user.role === 'police') {
      navigate('/police/vols');
    } else if (user.role === 'gestionnaire') {
      navigate('/gestionnaire/transfert');
    } else {
      navigate('/');  // fallback en cas d'erreur
    }

  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    setError('Téléphone ou mot de passe incorrect');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          MEM Secure Login
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="relative">
          <Phone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;

