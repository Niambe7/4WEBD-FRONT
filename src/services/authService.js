import axiosInstance from '../utils/axiosConfig';

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    throw error;
  }
};

export default {
  login,
};
