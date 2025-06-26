// src/config/apiConfig.js

// Obtener la URL base desde las variables de entorno
// const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.45:4000';

// Configuración de endpoints
export const API_CONFIG = {
  // URL base
  BASE_URL: API_BASE_URL,
  
  // Endpoints completos
  LUCES: {
    GET_ALL: `${API_BASE_URL}/api/luces/`,
    UPDATE_STATUS: `${API_BASE_URL}/api/luces/actualizar`
  },
  
  PUERTAS: {
    GET_ALL: `${API_BASE_URL}/api/puertas/`,
    UPDATE_STATUS: `${API_BASE_URL}/api/puertas/actualizar`
  },
  
  USUARIO: {
    LOGIN: `${API_BASE_URL}/api/usuario/login`,
    AGREGAR: `${API_BASE_URL}/api/usuario/agregar`
  }
};

// Función helper para construir URLs dinámicamente si lo necesitas
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Función para obtener la configuración de headers comunes
export const getCommonHeaders = () => {
  return {
    "Content-Type": "application/json"
  };
};

console.log('API Config loaded:', API_CONFIG.BASE_URL);