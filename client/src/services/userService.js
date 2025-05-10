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


axiosInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem('auth_token');
    console.log('Auth token string:', tokenString); // 👀

    if (tokenString) {
      try {
        const tokenObj = JSON.parse(tokenString);
        console.log('Parsed token object:', tokenObj); // 👀
        if (tokenObj.accessToken) {
          config.headers.Authorization = `Bearer ${tokenObj.accessToken}`;
          console.log('Set Authorization:', config.headers.Authorization); // 👀
        }
      } catch (err) {
        console.error('Error parsing auth token:', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
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