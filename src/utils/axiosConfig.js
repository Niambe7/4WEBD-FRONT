// src/utils/axiosConfig.js
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_URL || 'http://localhost:7002', // URL du microservice auth
  timeout: 5000,
});

export const axiosInstanceEvent = axios.create({
  baseURL: process.env.REACT_APP_API_EVENT_URL || 'http://localhost:7004', // URL du microservice event-service
  timeout: 5000,
});

export const axiosInstanceTicket = axios.create({
  baseURL: process.env.REACT_APP_API_EVENT_URL || 'http://localhost:7006', // URL du microservice event-service
  timeout: 5000,
});

// Intercepteur pour ajouter le token aux requêtes si présent
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstanceEvent.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstanceTicket.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);