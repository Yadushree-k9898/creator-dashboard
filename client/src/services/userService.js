// src/services/userService.js
import axios from '../lib/axiosInstance';

export const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/users/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ✅ Function to update user profile
export const updateUser = async (formData) => {
  // FIX: Correct endpoint is /api/users/profile
  const response = await axios.put('/api/users/profile', formData);
  return response.data;
};
