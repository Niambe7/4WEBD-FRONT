// src/pages/MesReservationsPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import ticketService from '../services/ticketService';
import { AuthContext } from '../contexts/AuthContext';

const MesReservationsPage = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!user || !user.id) {
          throw new Error("Utilisateur non authentifié");
        }
        const data = await ticketService.getReservationsByUser(user.id);
        console.log("Tickets récupérés :", data);
        setReservations(data);
      } catch (err) {
        console.error("Erreur lors du chargement des tickets :", err);
        setError("Erreur lors du chargement de vos tickets.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [user]);

  if (loading) return <p>Chargement de vos tickets...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (reservations.length === 0)
    return <p className="text-center">Vous n'avez pas encore acheté de ticket.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Mes Tickets</h2>
      <div className="row">
{reservations.map((ticket) => {
  const imagePath = ticket.eventImage ? ticket.eventImage.replace(/\\/g, '/') : 'default-image.png';
  const fullImageUrl = `http://localhost:7004/${imagePath}`;
  console.log("URL de l'image :", fullImageUrl);
  return (
    <div key={ticket.id} className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={fullImageUrl}
          alt={ticket.eventTitle}
          className="card-img-top"
          style={{ objectFit: 'cover', height: '200px' }}
        />
        <div className="card-body">
          <h5 className="card-title">{ticket.eventTitle}</h5>
          <p className="card-text">
            <strong>Date :</strong> {new Date(ticket.eventDate.trim()).toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>Quantité :</strong> {ticket.quantity}
          </p>
        </div>
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default MesReservationsPage;
