// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("User:", user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">SENEVENT</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Événements</Link>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
            {user && user.role === 'user' && (
              <li className="nav-item">
                <Link className="nav-link" to="/mes-reservations">Mes Reservations</Link>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>
                  Déconnexion
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Connexion</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
