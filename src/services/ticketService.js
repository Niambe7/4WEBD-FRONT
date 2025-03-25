// src/services/ticketService.js
import { axiosInstanceTicket } from '../utils/axiosConfig';

const reserveTicket = async (ticketData) => {
    try {
      // On envoie ticketData sous forme de JSON
      const response = await axiosInstanceTicket.post('/tickets/buy', ticketData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'achat du ticket :", error);
      throw error;
    }
  };

  const getReservationsByUser = async (userId) => {
    try {
      const response = await axiosInstanceTicket.get(`/tickets/user/${userId}`);
      // On suppose que l'API renvoie { tickets: [...] }
      return response.data.tickets || response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets pour l'utilisateur :", error);
      throw error;
    }
  };

export default {
  reserveTicket, getReservationsByUser
};
