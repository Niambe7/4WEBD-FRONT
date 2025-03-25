import React, { useEffect, useState } from 'react';
import eventService from '../services/eventService';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        setError("Erreur lors du chargement des événements");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="mb-4">Liste des événements</h2>
      <div className="row">
        {events.map((event) => {
          // Déclare et remplace les backslashes dans le chemin de l'image
          const imagePath = event.image.replace(/\\/g, '/');
          
          return (
            <div key={event.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img
                  // Préfixe le chemin par l'URL de ton microservice event-service
                  src={`http://localhost:7004/${imagePath}`}
                  className="card-img-top"
                  alt={event.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p><strong>Date :</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Lieu :</strong> {event.venue}</p>
                  <p><strong>Artiste :</strong> {event.artist}</p>
                  <p className="mt-auto"><strong>Prix :</strong> {event.price} €</p>
                  <Link to={`/events/${event.id}`} className="btn btn-primary">
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
