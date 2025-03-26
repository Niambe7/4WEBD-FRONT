// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css'; // Assurez-vous que le chemin est correct

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Bienvenue sur Concert Tickets</h1>
        <p>Découvrez et achetez vos billets pour vos événements préférés.</p>
        <Link to="/events" className="btn-custom">
          Découvrez nos événements
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
