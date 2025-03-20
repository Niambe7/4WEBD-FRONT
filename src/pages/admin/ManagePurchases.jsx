// src/pages/admin/ManagePurchases.jsx
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ManagePurchases = ({ goBack }) => {
  const [purchases] = useState([
    { id: 1, user: 'Jean Dupont', event: 'Concert A', date: '2025-03-20' },
    { id: 2, user: 'Marie Durand', event: 'Théâtre B', date: '2025-03-21' },
  ]);
  const [search, setSearch] = useState('');

  const filteredPurchases = purchases.filter((p) =>
    p.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <button className="btn btn-link mb-3" onClick={goBack}>
        <FaArrowLeft /> Retour
      </button>
      <h3>Gestion des Achats</h3>
      
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un achat par nom d'utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Ici tu pourrais ajouter un bouton pour forcer un refresh, etc. */}
      </div>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Utilisateur</th>
            <th>Événement</th>
            <th>Date d'achat</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.user}</td>
              <td>{p.event}</td>
              <td>{p.date}</td>
            </tr>
          ))}
          {filteredPurchases.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Aucun achat trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePurchases;
