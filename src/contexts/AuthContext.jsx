// src/contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  let initialUser = null;
  try {
    if (storedUser && storedUser !== "undefined") {
      initialUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Erreur lors du parsing de storedUser :", error);
  }
  
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(storedToken || null);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error("Erreur de connexion", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
