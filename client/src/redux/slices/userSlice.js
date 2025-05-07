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
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if we already have activity logs to prevent redundant calls
      const { recentActivity } = getState().user;
      if (recentActivity && recentActivity.length > 0) {
        return recentActivity;
      }
      
      const data = await userService.getActivityLogs();
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
    error: null,
    dashboardLoaded: false,
    activityLoaded: false,
  },
  reducers: {
    clearUserErrors: (state) => {
      state.error = null;
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
      });
  },
});

export const { clearUserErrors } = userSlice.actions;
export default userSlice.reducer;