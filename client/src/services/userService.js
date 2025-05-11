import API from "./axiosInstance";

const API_URL = "/api/users";

// Dashboard API - get all user dashboard data
const getDashboard = async () => {
  try {
    const res = await API.get(`${API_URL}/dashboard`);
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
    const res = await API.get(`${API_URL}/activity`);
    if (!res.data) {
      throw new Error('No activity logs found');
    }
    return res.data;
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }
};

// Update profile API
const updateProfile = async (profileData) => {
  try {
    const res = await API.put(`${API_URL}/profile`, profileData);
    return res.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Save post API
const savePost = async (postData) => {
  try {
    const res = await API.post(`${API_URL}/save-post`, postData);
    return res.data;
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

// Report post API
const reportPost = async (postId, reason) => {
  try {
    const res = await API.put(`${API_URL}/report-post/${postId}`, { reason });
    return res.data;
  } catch (error) {
    console.error('Error reporting post:', error);
    throw error;
  }
};

// Share post API
const sharePost = async (postId) => {
  try {
    const res = await API.post(`${API_URL}/share-post/${postId}`);
    return res.data;
  } catch (error) {
    console.error('Error sharing post:', error);
    throw error;
  }
};

const userService = {
  getDashboard,
  getActivityLogs,
  updateProfile,
  savePost,
  reportPost,
  sharePost,
};

export default userService;