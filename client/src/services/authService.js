import API from "./axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

// Register a new user
export const register = async (userData) => {
  try {
    // Ensure the role is correct, either 'User' or 'admin'
    userData.role = userData.role.charAt(0).toUpperCase() + userData.role.slice(1); // Capitalize first letter

    const response = await API.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// Login a user
export const login = async (userData) => {
  try {
    const response = await API.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Get the current user
export const getMe = async () => {
  try {
    const response = await API.get(`${API_URL}/auth/me`);
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error.response?.data || error.message);
    throw error;
  }
};

// Refresh token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await API.post(`${API_URL}/auth/refresh`, { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Token refresh error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await API.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    // Even if the server-side logout fails, we'll still clear local storage
    throw error;
  }
};