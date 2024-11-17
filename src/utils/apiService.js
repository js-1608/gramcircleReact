import axios from 'axios';

const API_BASE_URL = 'https://gramcircle.org/creator-api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; // Export the axios instance if needed
