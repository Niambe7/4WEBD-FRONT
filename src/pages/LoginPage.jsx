// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler une connexion
    const userData = { email };
    login(userData);
    navigate('/'); // redirige vers la page d'accueil
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className="btn btn-primary persologin">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
