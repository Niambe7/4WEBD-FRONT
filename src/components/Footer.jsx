import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-4">
      <div className="container text-center">
        <div className="row">
          {/* Section Services */}
          <div className="col-md-4">
            <h5>Nos Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">Réservation de billets</a></li>
              <li><a href="#" className="text-muted">Événements à venir</a></li>
              <li><a href="#" className="text-muted">Service client</a></li>
            </ul>
          </div>
          
          {/* Section Contact */}
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: support@concerttickets.com</li>
              <li>Téléphone: +33 1 23 45 67 89</li>
              <li>Adresse: 123, Rue des Concerts, Paris</li>
            </ul>
          </div>
          
          {/* Section Réseaux Sociaux */}
          <div className="col-md-4">
            <h5>Suivez-nous</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">Facebook</a></li>
              <li><a href="#" className="text-muted">Twitter</a></li>
              <li><a href="#" className="text-muted">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-muted">© 2025 Concert Tickets</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
