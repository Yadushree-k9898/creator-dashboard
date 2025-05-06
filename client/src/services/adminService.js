// import API from "./axiosInstance";

// const API_URL = "http://localhost:5000/api/admin";  

// // Get all users with pagination
// export const getAllUsers = async (page = 1, limit = 10) => {
//   try {
//     const response = await API.get(`${API_URL}/users?page=${page}&limit=${limit}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// // Get user by ID
// export const getUserById = async (userId) => {
//   try {
//     const response = await API.get(`${API_URL}/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error;
//   }
// };

// // Update user role
// export const updateUserRole = async (userId, role) => {
//   try {
//     const response = await API.put(`${API_URL}/users/role`, { userId, role });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user role:", error);
//     throw error;
//   }
// };

// // Update user credits
// export const updateUserCredits = async (userId, credits) => {
//   try {
//     const response = await API.put(`${API_URL}/users/credits`, { userId, credits });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user credits:", error);
//     throw error;
//   }
// };

// // Get admin dashboard data
// export const getAdminDashboard = async () => {
//   try {
//     const response = await API.get(`${API_URL}/dashboard`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching admin dashboard:", error);
//     throw error;
//   }
// };


// import API from "./axiosInstance";

// const API_URL = "http://localhost:5000/api/admin";

// // Helper to get the latest token from localStorage dynamically
// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

// // Get all users with pagination
// export const getAllUsers = async (page = 1, limit = 10) => {
//   try {
//     const response = await API.get(`${API_URL}/users?page=${page}&limit=${limit}`, authHeader());
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// // Get user by ID
// export const getUserById = async (userId) => {
//   try {
//     const response = await API.get(`${API_URL}/users/${userId}`, authHeader());
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error;
//   }
// };

// // Update user role
// export const updateUserRole = async (userId, role) => {
//   try {
//     const response = await API.put(
//       `${API_URL}/users/role`,
//       { userId, role },
//       authHeader()
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user role:", error);
//     throw error;
//   }
// };

// // Update user credits
// export const updateUserCredits = async (userId, credits) => {
//   try {
//     const response = await API.put(
//       `${API_URL}/users/credits`,
//       { userId, credits },
//       authHeader()
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user credits:", error);
//     throw error;
//   }
// };

// // Get admin dashboard data
// export const getAdminDashboard = async () => {
//   try {
//     const response = await API.get(`${API_URL}/dashboard`, authHeader());
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching admin dashboard:", error);
//     throw error;
//   }
// };


import API from "./axiosInstance";

const API_URL = "/api/admin"; // baseURL is already set in axiosInstance

export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`${API_URL}/users?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await API.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await API.put(`${API_URL}/users/role`, { userId, role });
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export const updateUserCredits = async (userId, credits) => {
  try {
    const response = await API.put(`${API_URL}/users/credits`, { userId, credits });
    return response.data;
  } catch (error) {
    console.error("Error updating user credits:", error);
    throw error;
  }
};

export const getAdminDashboard = async () => {
  try {
    const response = await API.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    throw error;
  }
};
