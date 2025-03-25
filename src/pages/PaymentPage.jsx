import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import ticketService from '../services/ticketService';
import { AuthContext } from '../contexts/AuthContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await eventService.getEvents();
        const ev = events.find(e => e.id === parseInt(id, 10));
        if (ev) {
          setEventData(ev);
        } else {
          setError("Événement non trouvé.");
        }
      } catch (err) {
        setError("Erreur lors du chargement de l'événement.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    setError('');

    if (!stripe || !elements) {
      setError("Stripe n'est pas encore chargé.");
      setPaymentLoading(false);
      return;
    }

    // Récupérer les informations de la carte via Stripe Elements
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, token: stripeToken } = await stripe.createToken(cardElement);

    if (stripeError) {
      setError(stripeError.message);
      setPaymentLoading(false);
      return;
    }

    // Construire le payload attendu par votre API
    const payload = {
      eventId: eventData.id,
      userId: user ? user.id : 0,
      quantity: 1,
      token: stripeToken.id,
    };

    try {
      const response = await ticketService.reserveTicket(payload);
      console.log("Réponse ticket:", response);
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/mes-reservations');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du paiement.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!eventData) return <p>Événement non trouvé.</p>;

  const imagePath = eventData.image.replace(/\\/g, '/');

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Payer pour {eventData.title.trim()}</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <img 
              src={`http://localhost:7004/${imagePath}`} 
              className="card-img-top" 
              alt={eventData.title}
              style={{ objectFit: 'cover', height: '250px' }}
            />
            <div className="card-body">
              <p><strong>Date :</strong> {new Date(eventData.date).toLocaleDateString()}</p>
              <p><strong>Lieu :</strong> {eventData.venue}</p>
              <p><strong>Artiste :</strong> {eventData.artist}</p>
              <p><strong>Prix :</strong> {eventData.price} €</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4 className="mb-3 text-center">Informations de paiement</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            {paymentSuccess && <div className="alert alert-success">Paiement réussi !</div>}
            <form onSubmit={handlePaymentSubmit}>
              <CardElement options={{ hidePostalCode: true }} />
              <button type="submit" className="btn btn-success mt-4 w-100" disabled={paymentLoading || !stripe}>
                {paymentLoading ? "Paiement en cours..." : "Payer avec Stripe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
