import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your base API URL
});

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const tokenData = JSON.parse(localStorage.getItem("auth_token"));
    const token = tokenData?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
