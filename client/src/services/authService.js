// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/auth'; 

// // Register a new user
// export const register = async (userData) => {
//   // Ensure the role is correct, either 'User' or 'admin'
//   userData.role = userData.role.charAt(0).toUpperCase() + userData.role.slice(1); // Capitalize first letter

//   const response = await axios.post(`${API_URL}/register`, userData);
//   return response.data;
// };

// // Login a user
// export const login = async (userData) => {
//   const response = await axios.post(`${API_URL}/login`, userData);
//   return response.data;
// };

// // Get the current user
// export const getMe = async (token) => {
//   const response = await axios.get(`${API_URL}/me`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };



import axios from "axios"
import { getToken } from "../utils/localStorage"

const API_URL = "http://localhost:5000/api/auth"

// Register a new user
export const register = async (userData) => {
  // Ensure the role is correct, either 'User' or 'admin'
  userData.role = userData.role.charAt(0).toUpperCase() + userData.role.slice(1) // Capitalize first letter

  const response = await axios.post(`${API_URL}/register`, userData)
  return response.data
}

// Login a user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)
  return response.data
}

// Get the current user
export const getMe = async () => {
  const token = getToken()
  if (!token || !token.accessToken) {
    throw new Error("No authentication token found")
  }

  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  })
  return response.data
}
