// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000", // Your base API URL
// });

// // Attach token to every request
// API.interceptors.request.use(
//   (config) => {
//     const tokenData = JSON.parse(localStorage.getItem("auth_token"));
//     const token = tokenData?.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; 
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;



import axios from "axios"
import { getToken } from "../utils/localStorage"

const API = axios.create({
  baseURL: "http://localhost:5000", // Your base API URL
});

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && token.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error is due to an expired token (401) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Here you would implement token refresh logic if your backend supports it
        // For now, we'll just redirect to login
        window.location.href = "/auth/login"
        return Promise.reject(error)
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = "/auth/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default API;
