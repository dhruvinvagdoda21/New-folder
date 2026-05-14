'use client';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('petconnect_token');
      const user = localStorage.getItem('petconnect_user');
      if (token && user) {
        set({ token, user: JSON.parse(user), isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    }
  },

  login: (user, token) => {
    localStorage.setItem('petconnect_token', token);
    localStorage.setItem('petconnect_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('petconnect_token');
    localStorage.removeItem('petconnect_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    const updated = { ...userData };
    localStorage.setItem('petconnect_user', JSON.stringify(updated));
    set({ user: updated });
  },
}));
