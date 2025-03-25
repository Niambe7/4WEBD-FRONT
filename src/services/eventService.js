import { axiosInstanceEvent } from '../utils/axiosConfig';


// Récupère la liste des événements depuis l'API
const getEvents = async () => {
  try {
    const response = await axiosInstanceEvent.get('/events');
    // Supposons que l'API renvoie { message: "Liste récupérée", events: [ ... ] }
    // On retourne la liste des événements
    console.log(response.data.image)
    return response.data.events || response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    throw error;
  }
};



const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
    const response = await axiosInstanceEvent.post('/events', eventData, {
      headers: {
        // Si vous utilisez FormData, laissez axios définir automatiquement le Content-Type
        // 'Content-Type': 'multipart/form-data'
      },
    });
    // L'API renvoie une réponse similaire à :
    // { message: "Événement créé avec succès", event: { id, title, date, venue, artist, price, image, ... } }
    return response.data.event;
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
    throw error;
  }
};

const updateEvent = async (eventData) => {
  try {
    // On suppose que eventData est un objet FormData qui contient un champ "id"
    const id = eventData.get('id');
    const response = await axiosInstanceEvent.put(`/events/${id}`, eventData, {
      headers: {
        // Pour FormData, axios configure automatiquement les en-têtes.
      },
    });
    return response.data.event;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement :", error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axiosInstanceEvent.delete(`/events/${id}`);
    // On suppose que l'API renvoie un message de succès ou un objet avec un status.
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement :", error);
    throw error;
  }
};

export default {
  getEvents, createEvent , updateEvent , deleteEvent
  // Ajoute createEvent, updateEvent, deleteEvent si besoin
};
