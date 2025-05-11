import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import { saveToken, getToken, removeToken, saveUser, removeUser } from "../../utils/localStorage";

const initialState = {
  user: null,
  token: getToken(),
  credits: {},
  loading: false,
  error: null,
};

// Thunks for user registration
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData);

    // Handle token storage
    if (data.token) {
      saveToken(data.token);
    }
    
    // Save user data
    if (data.user) {
      saveUser(data.user);
    }

    return {
      user: data.user,
      credits: data.credits || {},
      token: data.token,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

// Thunks for user login
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData);

    // Handle token storage
    if (data.token) {
      saveToken(data.token);
    }
    
    // Save user data
    if (data.user) {
      saveUser(data.user);
    }

    return {
      user: data.user,
      credits: data.credits || {},
      token: data.token,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Thunks for fetching current user
export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const data = await authService.getMe();
    
    // Save user data
    if (data.user) {
      saveUser(data.user);
    }
    
    return { 
      user: data.user, 
      credits: data.credits || {} 
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch current user');
  }
});

// Thunk for logging out
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // Call the logout API
    await authService.logout();
    
    // Clear local storage regardless of API response
    removeToken();
    removeUser();
    
    return null;
  } catch (err) {
    // Even if the API call fails, we still want to clear local storage
    removeToken();
    removeUser();
    
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.credits = {};
      removeToken();
      removeUser();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    updateUserCredits: (state, action) => {
      if (state.credits) {
        state.credits = { ...state.credits, ...action.payload };
      } else {
        state.credits = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.credits = action.payload.credits;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.credits = action.payload.credits;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch current user cases
      .addCase(fetchCurrentUser.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.credits = action.payload.credits;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.credits = {};
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Even if the API call fails, we still want to clear the state
        state.loading = false;
        state.user = null;
        state.token = null;
        state.credits = {};
        state.error = null;
      });
  },
});

export const { logout, clearAuthError, updateUserCredits } = authSlice.actions;
export default authSlice.reducer;