import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez la logique d'inscription ici (envoi des données à l'API, etc.)
    try {
      // Simulez l'inscription avec succès
      console.log('Inscription réussie', { firstname, lastname, email, phone, password });
      navigate('/login'); // Redirige l'utilisateur vers la page de connexion après inscription
    } catch (err) {
      setError("Erreur lors de l'inscription, veuillez réessayer.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Créer un compte</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">Prénom :</label>
            <input
              type="text"
              id="firstname"
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Nom :</label>
            <input
              type="text"
              id="lastname"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email :</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Téléphone :</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe :</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Vous avez déjà un compte ? <a href="/login">Connectez-vous ici</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
