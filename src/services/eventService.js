import axiosInstance from '../utils/axiosConfig';


// Fonction qui permet de recuperer les evenement 


// const getEvents = async () => {
//   try {
//     const response = await axiosInstance.get('/events');
//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des événements", error);
//     throw error;
//   }
// };



const mockEvents = [
    {
      id: 1,
      title: "Humour & Théâtre",
      date: "15 avril 2025",
      location: "Théâtre du Rire, Paris",
      artist: "Troupe d'humoristes",
      price: 40.0,
      imageUrl: "https://picsum.photos/400/250?random=1",
    },
    {
      id: 2,
      title: "Kangdaniel Concert [ACT]",
      date: "9 mai 2025",
      location: "Elysée Montmartre - PARIS",
      artist: "KANGDANIEL",
      price: 85.0,
      imageUrl: "https://picsum.photos/400/250?random=2",
    },
    {
      id: 3,
      title: "Eric Clapton",
      date: "31 mai 2025",
      location: "Accor Arena, Paris",
      artist: "Eric Clapton",
      price: 60.0,
      imageUrl: "https://picsum.photos/400/250?random=3",
    },
    {
      id: 4,
      title: "Gims - Le Dernier Tour",
      date: "16 décembre 2025",
      location: "Stade de France, Paris",
      artist: "Gims",
      price: 70.0,
      imageUrl: "https://picsum.photos/400/250?random=4",
    },
  ];

  const getEvents = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEvents);
      }, 500); // on simule 500ms de latence
    });
  };


  // Fonction pour créer un événement (simulation)
  const createEvent = async (eventData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // On simule la création en assignant un id unique basé sur le timestamp
        const newEvent = { ...eventData, id: Date.now() };
        // Ajout du nouvel événement dans le tableau simulé
        mockEvents.push(newEvent);
        resolve(newEvent);
      }, 500);
    });
  };

export default {
  getEvents, createEvent
  // Ajoute createEvent, updateEvent, deleteEvent si besoin
};
