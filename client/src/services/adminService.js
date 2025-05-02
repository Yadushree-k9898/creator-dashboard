import axios from "axios"

// Base URL for API requests
const API_URL = "/api/admin"

// Get all users with pagination
export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/users?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user:", error)
    throw error
  }
}

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const response = await axios.put(`${API_URL}/users/role`, { userId, role })
    return response.data
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Update user credits
export const updateUserCredits = async (userId, credits) => {
  try {
    const response = await axios.put(`${API_URL}/users/credits`, { userId, credits })
    return response.data
  } catch (error) {
    console.error("Error updating user credits:", error)
    throw error
  }
}

// Get admin dashboard data
export const getAdminDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`)
    return response.data
  } catch (error) {
    console.error("Error fetching admin dashboard:", error)
    throw error
  }
}
