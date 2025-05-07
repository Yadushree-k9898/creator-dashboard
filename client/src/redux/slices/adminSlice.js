// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import * as adminService from "../../services/adminService"

// // Async thunks for API calls
// export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async ({ page, limit }, { rejectWithValue }) => {
//   try {
//     return await adminService.getAllUsers(page, limit)
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch users")
//   }
// })

// export const fetchUserById = createAsyncThunk("admin/fetchUserById", async (userId, { rejectWithValue }) => {
//   try {
//     return await adminService.getUserById(userId)
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch user")
//   }
// })

// export const updateUserRole = createAsyncThunk(
//   "admin/updateUserRole",
//   async ({ userId, role }, { rejectWithValue }) => {
//     try {
//       return await adminService.updateUserRole(userId, role)
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update user role")
//     }
//   },
// )

// export const updateUserCredits = createAsyncThunk(
//   "admin/updateUserCredits",
//   async ({ userId, credits }, { rejectWithValue }) => {
//     try {
//       return await adminService.updateUserCredits(userId, credits)
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update user credits")
//     }
//   },
// )

// export const fetchAdminDashboard = createAsyncThunk("admin/fetchAdminDashboard", async (_, { rejectWithValue }) => {
//   try {
//     return await adminService.getAdminDashboard()
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch admin dashboard")
//   }
// })

// // Initial state
// const initialState = {
//   users: [],
//   selectedUser: null,
//   dashboard: null,
//   pagination: {
//     totalUsers: 0,
//     totalPages: 0,
//     currentPage: 1,
//     limit: 10,
//   },
//   loading: false,
//   error: null,
//   updateStatus: "idle",
// }

// // Create the slice
// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {
//     resetUpdateStatus: (state) => {
//       state.updateStatus = "idle"
//       state.error = null
//     },
//     setCurrentPage: (state, action) => {
//       state.pagination.currentPage = action.payload
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch all users
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         state.loading = false
//         state.users = action.payload.users
//         state.pagination = {
//           totalUsers: action.payload.totalUsers,
//           totalPages: action.payload.totalPages,
//           currentPage: action.payload.currentPage,
//           limit: state.pagination.limit,
//         }
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       // Fetch user by ID
//       .addCase(fetchUserById.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         state.loading = false
//         state.selectedUser = action.payload
//       })
//       .addCase(fetchUserById.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       // Update user role
//       .addCase(updateUserRole.pending, (state) => {
//         state.updateStatus = "loading"
//         state.error = null
//       })
//       .addCase(updateUserRole.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded"
//         // Update the user in the users array if present
//         if (state.selectedUser && state.selectedUser._id === action.meta.arg.userId) {
//           state.selectedUser.role = action.meta.arg.role
//         }
//         state.users = state.users.map((user) =>
//           user._id === action.meta.arg.userId ? { ...user, role: action.meta.arg.role } : user,
//         )
//       })
//       .addCase(updateUserRole.rejected, (state, action) => {
//         state.updateStatus = "failed"
//         state.error = action.payload
//       })

//       // Update user credits
//       .addCase(updateUserCredits.pending, (state) => {
//         state.updateStatus = "loading"
//         state.error = null
//       })
//       .addCase(updateUserCredits.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded"
//         // Update the user in the users array if present
//         if (state.selectedUser && state.selectedUser._id === action.meta.arg.userId) {
//           state.selectedUser.credits = action.meta.arg.credits
//         }
//         state.users = state.users.map((user) =>
//           user._id === action.meta.arg.userId ? { ...user, credits: action.meta.arg.credits } : user,
//         )
//       })
//       .addCase(updateUserCredits.rejected, (state, action) => {
//         state.updateStatus = "failed"
//         state.error = action.payload
//       })

//       // Fetch admin dashboard
//       .addCase(fetchAdminDashboard.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
//         state.loading = false
//         state.dashboard = action.payload
//       })
//       .addCase(fetchAdminDashboard.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })
//   },
// })

// // Export actions and reducer
// export const { resetUpdateStatus, setCurrentPage } = adminSlice.actions
// export default adminSlice.reducer


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as adminService from "../../services/adminService";

// Async thunks for API calls
export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async ({ page, limit }, { rejectWithValue }) => {
  try {
    return await adminService.getAllUsers(page, limit);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

export const fetchUserById = createAsyncThunk("admin/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    return await adminService.getUserById(userId);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
  }
});

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      return await adminService.updateUserRole(userId, role);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user role");
    }
  }
);

export const updateUserCredits = createAsyncThunk(
  "admin/updateUserCredits",
  async ({ userId, credits }, { rejectWithValue }) => {
    try {
      return await adminService.updateUserCredits(userId, credits);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user credits");
    }
  }
);

export const fetchAdminDashboard = createAsyncThunk("admin/fetchAdminDashboard", async (_, { rejectWithValue }) => {
  try {
    return await adminService.getAdminDashboard();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch admin dashboard");
  }
});

// Fetch activity logs
export const fetchActivityLogs = createAsyncThunk(
  "admin/fetchActivityLogs",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return await adminService.getActivityLogs(page, limit);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch activity logs");
    }
  }
);

// Initial state
const initialState = {
  users: [],
  selectedUser: null,
  dashboard: null,
  activityLogs: [],
  pagination: {
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  },
  logPagination: {
    totalLogs: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  },
  loading: false,
  error: null,
  updateStatus: "idle",
};

// Create the slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setLogCurrentPage: (state, action) => {
      state.logPagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = {
          totalUsers: action.payload.totalUsers,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          limit: state.pagination.limit,
        };
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch admin dashboard - FIX
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch activity logs
      .addCase(fetchActivityLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.activityLogs = action.payload.logs;
        state.logPagination = {
          totalLogs: action.payload.totalLogs,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          limit: state.logPagination.limit,
        };
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetUpdateStatus, setCurrentPage, setLogCurrentPage } = adminSlice.actions;
export default adminSlice.reducer;
