import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@/services/userService';

// Async thunk to fetch user dashboard data
export const fetchUserDashboard = createAsyncThunk(
  'user/fetchUserDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch user activity logs
export const fetchUserActivityLogs = createAsyncThunk(
  'user/fetchUserActivityLogs',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getActivityLogs();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await userService.updateProfile(profileData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    dashboard: null,
    recentActivity: [],
    loading: false,
    profileUpdateLoading: false,
    error: null,
    dashboardLoaded: false,
    activityLoaded: false,
    profileUpdateSuccess: false,
  },
  reducers: {
    clearUserErrors: (state) => {
      state.error = null;
    },
    resetProfileUpdateStatus: (state) => {
      state.profileUpdateSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Dashboard fetch cases
      .addCase(fetchUserDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDashboard.fulfilled, (state, action) => {
        console.log('Dashboard data:', action.payload);  
        state.loading = false;
        state.dashboard = action.payload;
        state.dashboardLoaded = true;
      })
      .addCase(fetchUserDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Activity logs fetch cases
      .addCase(fetchUserActivityLogs.pending, (state) => {
        // Only show loading if we don't have activity logs yet
        if (!state.activityLoaded) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchUserActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.recentActivity = action.payload;
        state.activityLoaded = true;
      })
      .addCase(fetchUserActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Profile update cases
      .addCase(updateUserProfile.pending, (state) => {
        state.profileUpdateLoading = true;
        state.error = null;
        state.profileUpdateSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdateSuccess = true;
        
        // Update dashboard data if it exists
        if (state.dashboard && action.payload.profile) {
          state.dashboard.profile = action.payload.profile;
        }
        
        // Update credits if they were returned
        if (state.dashboard && action.payload.creditStats) {
          state.dashboard.creditStats = action.payload.creditStats;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.error = action.payload;
        state.profileUpdateSuccess = false;
      });
  },
});

export const { clearUserErrors, resetProfileUpdateStatus } = userSlice.actions;
export default userSlice.reducer;