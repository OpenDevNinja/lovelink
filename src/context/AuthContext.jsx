import { createContext, useContext, useState } from 'react';
import { currentUser } from '../data';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password) => {
    // Simulate login
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const signup = (userData) => {
    setUser({ ...currentUser, ...userData });
    setIsAuthenticated(true);
  };

  const updateProfile = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
