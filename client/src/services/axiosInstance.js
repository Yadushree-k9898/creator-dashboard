import axios from "axios";
import { getToken, saveToken, removeToken } from "../utils/localStorage";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your base API URL
  timeout: 10000, // 10 seconds timeout
});

// Create a separate instance for token refresh to avoid infinite loops
const refreshAPI = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

// Track if a token refresh is in progress
let isRefreshing = false;
// Store pending requests that should be retried after token refresh
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && token.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is due to an expired token (401) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get current token
        const currentToken = getToken();
        
        // Only attempt refresh if we have a refresh token
        if (!currentToken || !currentToken.refreshToken) {
          throw new Error("No refresh token available");
        }
        
        // Call your refresh token endpoint
        const response = await refreshAPI.post("/api/auth/refresh", {
          refreshToken: currentToken.refreshToken
        });
        
        // Save the new token
        const newToken = response.data.token || response.data;
        saveToken(newToken);
        
        // Update Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken || newToken}`;
        
        // Process any queued requests with the new token
        processQueue(null, newToken.accessToken || newToken);
        
        // Retry the original request
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear the queue with an error
        processQueue(refreshError, null);
        
        // Clear tokens and redirect to login
        removeToken();
        
        // Only redirect if we're in a browser environment
        if (typeof window !== 'undefined') {
          window.location.href = "/auth/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;