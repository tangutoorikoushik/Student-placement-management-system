import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const jobsAPI = {
  getAll: () => api.get('/jobs'),
  create: (data) => api.post('/jobs', data),
};

export const applicationsAPI = {
  apply: (data) => api.post('/applications', data),
  getMyApps: () => api.get('/applications'),
};

export default api;
