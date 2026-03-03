// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const msg = err.response?.data?.error || err.message || 'Une erreur est survenue';
    return Promise.reject(new Error(msg));
  }
);

export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  uploadImage: (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post('/profile/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  uploadImage: (id, file) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post(`/projects/${id}/image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export const skillsAPI = {
  getAll: (category) => api.get('/skills', { params: category ? { category } : {} }),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const experienceAPI = {
  getAll: () => api.get('/experiences'),
  create: (data) => api.post('/experiences', data),
  update: (id, data) => api.put(`/experiences/${id}`, data),
  delete: (id) => api.delete(`/experiences/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
};

export default api;