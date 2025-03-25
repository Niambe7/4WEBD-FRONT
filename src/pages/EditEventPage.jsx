// src/pages/EditEventPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    venue: '',
    artist: '',
    price: '',
    image: '', // ce sera la chaîne du chemin d'image initialement
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Récupération des données de l'événement à modifier
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await eventService.getEvents();
        const eventToEdit = events.find(ev => ev.id === parseInt(id, 10));
        if (eventToEdit) {
          // Pour un input type="date", on veut le format "YYYY-MM-DD"
          const formattedDate = eventToEdit.date.slice(0, 10);
          setFormData({
            id: eventToEdit.id,
            title: eventToEdit.title.trim(),
            date: formattedDate,
            venue: eventToEdit.venue,
            artist: eventToEdit.artist,
            price: eventToEdit.price,
            image: eventToEdit.image, // chaîne, par exemple "uploads\event-1742738938317-593740077.png"
          });
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

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Optionnel : on peut afficher un aperçu de la nouvelle image en créant une URL temporaire
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');
    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('date', formData.date);
      dataToSend.append('venue', formData.venue);
      dataToSend.append('artist', formData.artist);
      dataToSend.append('price', formData.price);
      // Si un nouveau fichier est sélectionné, l'envoyer, sinon, l'API pourra garder l'image actuelle
      if (selectedFile) {
        dataToSend.append('image', selectedFile);
      }
      // On peut aussi inclure l'id si nécessaire
      dataToSend.append('id', formData.id);

      const updatedEvent = await eventService.updateEvent(dataToSend);
      console.log("Événement mis à jour:", updatedEvent);
      setSuccess(true);
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'événement.");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Modifier l'événement</h2>
      {success && <div className="alert alert-success">Événement mis à jour avec succès !</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="venue" className="form-label">Lieu</label>
          <input
            type="text"
            id="venue"
            name="venue"
            className="form-control"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artiste</label>
          <input
            type="text"
            id="artist"
            name="artist"
            className="form-control"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Prix (€)</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Choisir une nouvelle image (laisser vide pour garder l'actuelle)
          </label>
          <input
            type="file"
            id="imageUpload"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {/* Affichage de l'image actuelle */}
        {formData.image && !selectedFile && (
          <div className="mb-3">
            <p>Aperçu de l'image actuelle :</p>
            <img
              src={`http://localhost:7004/${formData.image.replace(/\\/g, '/')}`}
              alt="Image actuelle"
              style={{ maxWidth: '300px', objectFit: 'cover' }}
            />
          </div>
        )}
        {/* Si un nouveau fichier est sélectionné, on affiche son aperçu */}
        {selectedFile && (
          <div className="mb-3">
            <p>Aperçu de la nouvelle image :</p>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Nouvelle image"
              style={{ maxWidth: '300px', objectFit: 'cover' }}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitLoading}>
          {submitLoading ? "Mise à jour en cours..." : "Mettre à jour l'événement"}
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
