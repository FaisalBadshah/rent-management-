
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rentflow-api.example.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mocking the mobile AsyncStorage logic
api.interceptors.request.use(
  async (config) => {
    // In React Native: const token = await AsyncStorage.getItem('token');
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
