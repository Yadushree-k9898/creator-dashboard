import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Change to match your backend


// Register a new user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;  // returns user and token
};

// Log in an existing user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;  // returns user, credits, and token
};

// Fetch current user details (optional for authenticated routes)
export const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
