import axios from 'axios';

const API = 'http://localhost:5000/api/users';

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request timeout to prevent hanging requests
axiosInstance.defaults.timeout = 10000; // 10 seconds timeout

// Add request interceptor to attach auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      // Redirect to login if needed
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard API - get all user dashboard data
const getDashboard = async () => {
  try {
    const res = await axiosInstance.get('/dashboard');
    if (!res.data) {
      throw new Error('No data received from server');
    }
    return res.data;
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    throw error;
  }
};

// Activity logs API - get user activity history
const getActivityLogs = async () => {
  try {
    const res = await axiosInstance.get('/activity');
    if (!res.data) {
      throw new Error('No activity logs found');
    }
    return res.data;
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }
};

// Save post API
const savePost = async (postData) => {
  try {
    const res = await axiosInstance.post('/save-post', postData);
    return res.data;
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

// Report post API
const reportPost = async (postId) => {
  try {
    const res = await axiosInstance.put(`/report-post/${postId}`);
    return res.data;
  } catch (error) {
    console.error('Error reporting post:', error);
    throw error;
  }
};

// Share post API
const sharePost = async (postId) => {
  try {
    const res = await axiosInstance.post(`/share-post/${postId}`);
    return res.data;
  } catch (error) {
    console.error('Error sharing post:', error);
    throw error;
  }
};

const userService = {
  getDashboard,
  getActivityLogs,
  savePost,
  reportPost,
  sharePost,
};

export default userService;