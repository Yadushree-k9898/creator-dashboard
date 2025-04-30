// src/services/userService.js
import axios from '../lib/axiosInstance';

export const fetchUserData = async () => {
  const response = await axios.get('/api/user/dashboard');
  return response.data;
};

// ✅ Function to update user profile
export const updateUser = async (formData) => {
  const response = await axios.put('/api/user/profile', formData);
  return response.data;
};
