import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: GET request
export const fetchData = async (endpoint: string, params?: Record<string, any>) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};

// Example: POST request
export const postData = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export default api;
