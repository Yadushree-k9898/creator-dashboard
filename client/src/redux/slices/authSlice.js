// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserService, loginUserService } from '../../services/authService'; // Import service functions

// Async actions for register and login
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await registerUserService(userData); // Call register service
    return response.data; // Return user data and token
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await loginUserService(userData); // Call login service
    return response.data; // Return user data and token
  }
);

// Auth slice definition
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle', // Track loading state
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
