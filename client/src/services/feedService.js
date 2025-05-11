import API from "./axiosInstance";
import { getAuthHeaders } from "../utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch Reddit posts with pagination
export const fetchRedditPosts = async (page = 1) => {
  try {
    const response = await API.get(`${API_URL}/api/feed/reddit?page=${page}`);
    return response.data.posts || [];
  } catch (error) {
    console.error("Error fetching Reddit posts:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Dev.to posts with optional search query and pagination
export const fetchDevToPosts = async (searchQuery = "", page = 1) => {
  try {
    const url = searchQuery
      ? `${API_URL}/devto?q=${encodeURIComponent(searchQuery)}&page=${page}`
      : `${API_URL}/devto?page=${page}`;
    const response = await API.get(url);
    return response.data.posts || [];
  } catch (error) {
    console.error("Error fetching Dev.to posts:", error.response?.data || error.message);
    throw error;
  }
};

// Save a post
export const savePost = async (postData) => {
  try {
    const response = await API.post(`${API_URL}/api/feed/save`, postData);
    return response.data;
  } catch (error) {
    console.error("Error saving post:", error.response?.data || error.message);
    throw error;
  }
};

// Report a post
export const reportPost = async (postData) => {
  try {
    const response = await API.post(`${API_URL}/api/feed/report`, postData);
    return response.data;
  } catch (error) {
    console.error("Error reporting post:", error.response?.data || error.message);
    throw error;
  }
};

// Share a post
export const sharePost = async (postData) => {
  try {
    const response = await API.post(`${API_URL}/api/feed/share`, postData);
    return response.data;
  } catch (error) {
    console.error("Error sharing post:", error.response?.data || error.message);
    throw error;
  }
};

// Get saved posts
export const getSavedPosts = async () => {
  try {
    const response = await API.get(`${API_URL}/api/feed/saved`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching saved posts:", error.message);
    throw error;
  }
};