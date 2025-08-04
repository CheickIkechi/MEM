// src/hooks/useAuth.jsx (ou AuthContext.jsx)
import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()          // ← hook de navigation

  // Récupère le profil et, si invalide, force logout
  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile')
      setUser(data)
      return data
    } catch {
      // Token invalide : déconnecte et renvoie sur login
      handleLogout()
      return null
    }
  }

  // Login : stocke le token, set header et fetchProfile
  const login = async (telephone, password) => {
    const { data } = await api.post('/auth/login', { telephone, password })
    localStorage.setItem('token', data.token)
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`
    const profile = await fetchProfile()
    return profile
  }

  // Déconnexion “propre”
 // Déconnexion “propre”
  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token')
    delete api.defaults.headers.common.Authorization
    setUser(null)
    console.log('Déconnexion terminée. Redirection vers /login');
    navigate('/')
  }

  // Au premier rendu, recharge le profil si token
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      console.log('Token trouvé en localStorage. Tentative de récupération du profil...');
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      fetchProfile().finally(() => {
        console.log('Fin de tentative de récupération du profil (avec token).');
        setLoading(false)
      })
    } else {
      console.log('Aucun token trouvé. L’utilisateur n’est pas connecté.');
      setLoading(false)
    }
  }, [])


  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout: handleLogout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// hook d’accès simple
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
