// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import eventService from '../services/eventService';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  // Appel simulé à l'API au montage du composant
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Liste des événements</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img
                src={event.imageUrl}
                className="card-img-top"
                alt={event.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">
                  <strong>Date :</strong> {event.date}
                </p>
                <p className="card-text">
                  <strong>Lieu :</strong> {event.location}
                </p>
                <p className="card-text">
                  <strong>Artiste :</strong> {event.artist}
                </p>
                <p className="card-text mt-auto">
                  <strong>Billet à partir de :</strong> {event.price} €
                </p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">
                  Réserver
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
