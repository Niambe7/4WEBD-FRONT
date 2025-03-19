// src/pages/AddEventPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';

const AddEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    artist: '',
    price: '',
    imageUrl: '', // contiendra l'URL temporaire de l'image uploadée
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

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
      // Création d'une URL temporaire pour l'aperçu de l'image
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
      // Ici, pour l'instant, on envoie formData incluant l'URL d'aperçu.
      // Plus tard, tu pourras créer un FormData pour envoyer le fichier.
      const createdEvent = await eventService.createEvent(formData);
      console.log('Événement créé :', createdEvent);
      setSuccess(true);
      // Redirection vers la page des événements après quelques secondes
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (err) {
      setError("Erreur lors de la création de l'événement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un événement</h2>
      {success && (
        <div className="alert alert-success" role="alert">
          Événement créé avec succès !
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
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
        {/* Champ d'upload pour l'image */}
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
        {/* Affichage de l'aperçu de l'image si disponible */}
        {formData.imageUrl && (
          <div className="mb-3">
            <p>Aperçu de l'image :</p>
            <img src={formData.imageUrl} alt="Aperçu" style={{ maxWidth: '300px' }} />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Création en cours..." : "Créer l'événement"}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
