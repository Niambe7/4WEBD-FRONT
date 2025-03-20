

// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   //const [user, setUser] = useState(null); // null si pas connecté

  
//   const [user, setUser] = useState({ email: 'demo@exemple.com' });

//   const login = (userData) => {
//     setUser(userData);
//     // stocker le token dans le localStorage par exemple
//   };

//   const logout = () => {
//     setUser(null);
//     // nettoyer le token
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

// Pour la démo, on initialise avec un admin par défaut.
const defaultAdmin = {
  email: 'admin@test.com',
  role: 'Admin', // ou 'EventCreator' selon le besoin
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultAdmin); // Pour tester, on part d'un admin connecté

  const login = (userData) => {
    setUser(userData);
    // Stockage en local ou autre gestion de token plus tard.
  };

  const logout = () => {
    setUser(null);
    // Nettoyage du token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
