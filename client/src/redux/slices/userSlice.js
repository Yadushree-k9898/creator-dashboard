// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData, updateUser } from '../../services/userService';

// Thunk to fetch user dashboard data
export const fetchUserDashboard = createAsyncThunk(
  'user/fetchUserDashboard',
  async () => {
    const data = await fetchUserData();
    return data;
  }
);

// ✅ Thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formData) => {
    const data = await updateUser(formData);
    return data;
  }
);

const initialState = {
  userProfile: null,
  userCredits: null,
  userPosts: [],
  activityLog: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.profile;
        state.userCredits = action.payload.credits;
        state.userPosts = action.payload.posts;
        state.activityLog = action.payload.activityLog;
      })
      .addCase(fetchUserDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Handle update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
