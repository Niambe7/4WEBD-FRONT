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
    location: '',
    artist: '',
    price: '',
    imageUrl: '',
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Charger les données de l'événement à modifier
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await eventService.getEvents();
        const eventToEdit = events.find((ev) => ev.id === parseInt(id, 10));
        if (eventToEdit) {
          setFormData(eventToEdit);
        } else {
          setError("Événement non trouvé.");
        }
      } catch (err) {
        setError("Erreur lors de la récupération de l'événement.");
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Créer une URL temporaire pour l'aperçu de l'image
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updatedEvent = await eventService.updateEvent(formData);
      console.log("Événement mis à jour:", updatedEvent);
      setSuccess(true);
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'événement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Modifier l'événement</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          Événement mis à jour avec succès !
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Lieu</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artiste</label>
          <input
            type="text"
            className="form-control"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Prix (€)</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        {/* Champ de téléchargement pour l'image */}
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">Choisir une image</label>
          <input
            type="file"
            className="form-control"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {/* Affichage de l'aperçu de l'image */}
        {formData.imageUrl && (
          <div className="mb-3">
            <p>Aperçu de l'image :</p>
            <img src={formData.imageUrl} alt="Aperçu" style={{ maxWidth: '300px' }} />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Mise à jour en cours..." : "Mettre à jour l'événement"}
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;
