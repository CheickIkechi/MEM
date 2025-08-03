import { createContext, useState, useEffect } from 'react';
import api from '../api/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- Ajout loading

  const login = async (telephone, password) => {
    const { data } = await api.post('/auth/login', { telephone, password });
    localStorage.setItem('token', data.token);
    const profile = await fetchProfile();
    return profile;
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      setUser(data);
      return data;
    } catch {
      logout();  // Token invalide -> déconnecte
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
