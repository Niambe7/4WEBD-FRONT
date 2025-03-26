import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

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
              <li>Email: support@senevent.com</li>
              <li>Téléphone: +33 1 23 45 67 89</li>
              <li>Avenue Guediawaye 44</li>
            </ul>
          </div>
          
          {/* Section Réseaux Sociaux */}
          <div className="col-md-4">
            <h5>Suivez-nous</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted"> <FaFacebookF/> </a></li>
              <li><a href="#" className="text-muted"> <FaTwitter/> </a></li>
              <li><a href="#" className="text-muted"> <FaInstagram/> </a></li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-muted">© 2025  SENEVENT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
