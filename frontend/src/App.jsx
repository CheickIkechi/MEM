import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EnregistrerEngin from './pages/Agent/EnregistrerEngin';
import GestionVols from './pages/Police/GestionVols';
import TransfertPropriete from './pages/Gestionnaire/TransfertPropriete';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './Contexts/AuthContext';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dasboard" element={<Dashboard />} />
          <Route path="/agent/engins" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <EnregistrerEngin />
            </ProtectedRoute>
          } />
          <Route path="/police/vols" element={
            <ProtectedRoute allowedRoles={['police']}>
              <GestionVols />
            </ProtectedRoute>
          } />
          <Route path="/gestionnaire/transfert" element={
            <ProtectedRoute allowedRoles={['gestionnaire']}>
              <TransfertPropriete />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
