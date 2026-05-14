import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('petconnect_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('petconnect_token');
      localStorage.removeItem('petconnect_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Users
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  toggleFavorite: (sitterId) => api.post(`/users/favorites/${sitterId}`),
  getNotifications: () => api.get('/users/notifications'),
  markNotificationsRead: () => api.put('/users/notifications/read'),
};

// Sitters
export const sitterAPI = {
  getAll: (params) => api.get('/sitters', { params }),
  getById: (id) => api.get(`/sitters/${id}`),
  updateProfile: (data) => api.put('/sitters/profile', data),
  getDashboardStats: () => api.get('/sitters/dashboard/stats'),
};

// Bookings
export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getAll: (params) => api.get('/bookings', { params }),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
};

// Pets
export const petAPI = {
  getAll: () => api.get('/pets'),
  create: (data) => api.post('/pets', data),
  update: (id, data) => api.put(`/pets/${id}`, data),
  delete: (id) => api.delete(`/pets/${id}`),
};

// Reviews
export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getBySitter: (sitterId) => api.get(`/reviews/sitter/${sitterId}`),
};

// Messages
export const messageAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (userId) => api.get(`/messages/${userId}`),
  sendMessage: (data) => api.post('/messages', data),
};

// Payments
export const paymentAPI = {
  createCheckout: (data) => api.post('/payments/create-checkout-session', data),
};

// AI
export const aiAPI = {
  getRecommendations: (data) => api.post('/ai/recommend', data),
  chatbot: (message) => api.post('/ai/chatbot', { message }),
};

// Admin
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  toggleUserStatus: (id, isActive) => api.put(`/admin/users/${id}/status`, { isActive }),
  getBookings: (params) => api.get('/admin/bookings', { params }),
};

// Services
export const serviceAPI = {
  getAll: () => api.get('/services'),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  getProviders: (slug) => api.get(`/services/${slug}/providers`),
};

export default api;
