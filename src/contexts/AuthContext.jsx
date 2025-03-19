

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null); // null si pas connecté

  
  const [user, setUser] = useState({ email: 'demo@exemple.com' });

  const login = (userData) => {
    setUser(userData);
    // stocker le token dans le localStorage par exemple
  };

  const logout = () => {
    setUser(null);
    // nettoyer le token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
