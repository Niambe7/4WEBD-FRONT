// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../services/eventService';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Pour le moment, on réutilise mockEvents pour retrouver l'événement par ID
        const allEvents = await eventService.getEvents();
        const foundEvent = allEvents.find((ev) => ev.id === parseInt(id, 10));
        setEvent(foundEvent);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement", error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return <p>Chargement de l'événement...</p>;
  }

  return (
    <div>
      <h2>{event.title}</h2>
      <img
        src={event.imageUrl}
        alt={event.title}
        style={{ maxWidth: '400px', width: '100%' }}
      />
      <p><strong>Date :</strong> {event.date}</p>
      <p><strong>Lieu :</strong> {event.location}</p>
      <p><strong>Artiste :</strong> {event.artist}</p>
      <p><strong>Prix :</strong> {event.price} €</p>
      <button className="btn btn-success">Réserver</button>
    </div>
  );
};

export default EventDetailPage;
