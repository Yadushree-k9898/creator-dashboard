// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your API URL

// Register User
export const registerUserService = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response; // Return the response containing user data and token
  } catch (error) {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
    throw error; // Re-throw to propagate the error to the UI
  }
};

// Login User
export const loginUserService = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response; // Return the response containing user data and token
};
