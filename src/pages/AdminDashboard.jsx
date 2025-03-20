// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { FaUsers, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';
import ManageUsers from './admin/ManageUsers';
import ManageEvents from './admin/ManageEvents';
import ManagePurchases from './admin/ManagePurchases';



const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleCardClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Tableau de bord d'administration</h2>
      
      {/* Affiche les cartes seulement si aucune section n'est sélectionnée */}
      {!activeSection && (
        <div className="row ">
          <div className="col-md-4 mb-3">
            <div 
              className="card text-center shadow size-box-admin my-card-hover"
              style={{ cursor: 'pointer' }} 
              onClick={() => handleCardClick('users')}
            >
              <div className="card-body">
                <FaUsers size={48} className="mb-3" />
                <h5 className="card-title">Gestion des Utilisateurs</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div 
              className="card text-center shadow .size-box-admin my-card-hover"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('events')}
            >
              <div className="card-body">
                <FaCalendarAlt size={48} className="mb-3" />
                <h5 className="card-title">Gestion des Événements</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div
              className="card text-center shadow size-box-admin my-card-hover"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick('purchases')}
            >
              <div className="card-body">
                <FaShoppingCart size={48} className="mb-3" />
                <h5 className="card-title">Gestion des Achats</h5>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sections de gestion */}
      {activeSection === 'users' && <ManageUsers goBack={() => setActiveSection(null)} />}
      {activeSection === 'events' && <ManageEvents goBack={() => setActiveSection(null)} />}
      {activeSection === 'purchases' && <ManagePurchases goBack={() => setActiveSection(null)} />}
    </div>
  );
};

export default AdminDashboard;
