import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import API_BASE from '../../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('portfolio_token')
  );

  const getToken = () => localStorage.getItem('portfolio_token');

  // POST /api/auth/login → returns {success, token, username} or {success, error}
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${API_BASE}/api/auth/login`, { username, password });
      if (data.success) {
        localStorage.setItem('portfolio_token', data.token);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      const error = err.response?.data?.error || 'Login failed. Please try again.';
      return { success: false, error };
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setIsAuthenticated(false);
  };

  // PUT /api/auth/change-password (JWT required)
  const changePassword = async (currentPass, newPass) => {
    try {
      const token = getToken();
      const { data } = await axios.put(
        `${API_BASE}/api/auth/change-password`,
        { currentPassword: currentPass, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (err) {
      const error = err.response?.data?.error || 'Failed to change password.';
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
