// src/pages/AddEventPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';

const AddEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    venue: '',
    artist: '',
    price: '',
    image: null,
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
      // Pour l'instant, on peut stocker le fichier dans formData.image
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Si vous devez envoyer un fichier, utilisez FormData
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('date', formData.date);
      dataToSend.append('venue', formData.venue);
      dataToSend.append('artist', formData.artist);
      dataToSend.append('price', formData.price);
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      const createdEvent = await eventService.createEvent(dataToSend);
      console.log('Événement créé:', createdEvent);
      setSuccess(true);
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
          <label htmlFor="venue" className="form-label">Lieu</label>
          <input
            type="text"
            className="form-control"
            id="venue"
            name="venue"
            value={formData.venue}
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
            step="0.01"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Création en cours..." : "Créer l'événement"}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
