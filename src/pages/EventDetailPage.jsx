// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await eventService.getEvents();
        const foundEvent = events.find(ev => ev.id === parseInt(id, 10));
        setEvent(foundEvent);
      } catch (err) {
        setError("Erreur lors du chargement de l'événement.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Chargement de l'événement...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!event) return <p>Événement non trouvé.</p>;

  // Correction du chemin d'image
  const imagePath = event.image.replace(/\\/g, '/');

  const handleReservation = () => {
    // Redirige vers la page de paiement pour cet événement
    navigate(`/events/${id}/reserve`);
  };

  return (
    <div className="container mt-4">
      <h2>{event.title}</h2>
      <img
        src={`http://localhost:7004/${imagePath}`}
        alt={event.title}
        style={{ maxWidth: '400px', width: '100%', objectFit: 'cover' }}
      />
      <p><strong>Date :</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Lieu :</strong> {event.venue}</p>
      <p><strong>Artiste :</strong> {event.artist}</p>
      <p><strong>Prix :</strong> {event.price} €</p>
      <button className="btn btn-success" onClick={handleReservation}>
        Réserver
      </button>
    </div>
  );
};

export default EventDetailPage;
