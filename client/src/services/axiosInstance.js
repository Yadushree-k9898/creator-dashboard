

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your base API URL
});

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
