import { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // ou 'expo-router' si RN
import { AuthContext } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Chargement...</div>;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
