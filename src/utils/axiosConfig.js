import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // adapte selon ton backend
  timeout: 5000,
});

// Optionnel : ajouter un interceptors pour gérer les tokens d'authentification
axiosInstance.interceptors.request.use(
  (config) => {
    // Exemple : config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;