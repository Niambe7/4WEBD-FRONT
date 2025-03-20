// src/pages/admin/ManageEvents.jsx
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import eventService from '../../services/eventService';
import { useNavigate } from 'react-router-dom';

const ManageEvents = ({ goBack }) => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  // Récupère les événements via le service (les mêmes que sur la page des événements)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        setError('Erreur lors du chargement des événements.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filtrer les événements en fonction de la recherche
  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddEvent = () => {
    // Rediriger vers la page d'ajout ou ouvrir un modal
    navigate(`/add-event`);
  };

  const handleEdit = (id) => {
    
    navigate(`/events/${id}/edit`);
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await eventService.deleteEvent(id);
        // Mettre à jour le state local pour retirer l'événement supprimé
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression de l'événement.");
      }
    }
  };

  if (loading) {
    return <p>Chargement des événements...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button className="btn btn-link mb-3" onClick={goBack}>
        <FaArrowLeft /> Retour
      </button>
      <h3>Gestion des Événements</h3>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-success ms-2" onClick={handleAddEvent}>
          <FaPlus /> Ajouter
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Titre</th>
            <th>Artiste</th>
            <th>Lieu</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td>{ev.artist}</td>
              <td>{ev.location}</td>
              <td>{ev.date}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(ev.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(ev.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredEvents.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Aucun événement trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
