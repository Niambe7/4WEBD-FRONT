// src/pages/admin/ManageUsers.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';

const ManageUsers = ({ goBack }) => {
  // Données factices pour la démonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'Administrateur', role: 'Admin' },
    { id: 2, name: 'Jean Dupont', role: 'User' },
  ]);
  const [search, setSearch] = useState('');

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    // TODO: Ouvrir un modal ou rediriger vers un formulaire d'ajout
    alert('Ajouter un nouvel utilisateur');
  };

  const handleEdit = (id) => {
    // TODO: Ouvrir un modal ou rediriger vers un formulaire de modification
    alert(`Modifier l'utilisateur ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Suppression dans le state local (simulation)
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      {/* Bouton pour revenir au dashboard */}
      <button className="btn btn-link mb-3" onClick={goBack}>
        <FaArrowLeft /> Retour
      </button>
      
      <h3>Gestion des Utilisateurs</h3>
      
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-success ms-2" onClick={handleAddUser}>
          <FaPlus /> Ajouter
        </button>
      </div>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Nom</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(u.id)}>
                  <FaEdit />
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
