import { axiosInstance } from "../utils/axiosConfig";

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    console.log("Réponse API dans authService:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    throw error;
  }
};

const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export default {
  login, register
};
