<<<<<<< HEAD
// // Redux Toolkit slice for authentication
=======
>>>>>>> parent of aa6cda1 (get token and save token resolved)
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as authService from '../../services/authService';
// import { saveToken, getToken, removeToken } from '../../utils/localStorage';

// const initialState = {
//   user: null,
//   token: getToken(),
//   credits: {},
//   loading: false,
//   error: null,
// };

<<<<<<< HEAD
// // Thunks for user registration
// export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
//   try {
//     const data = await authService.register(userData);
//     const { token } = data;
//     const accessToken = token?.accessToken || token;
//     const refreshToken = token?.refreshToken;
//     saveToken({ accessToken, refreshToken });
//     return { user: data.user, credits: data.credits, token: accessToken };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
//   }
// });

// // Thunks for user login
// export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
//   try {
//     const data = await authService.login(userData);
//     const { token } = data;
//     const accessToken = token?.accessToken || token;
//     const refreshToken = token?.refreshToken;
//     saveToken({ accessToken, refreshToken });
//     return { user: data.user, credits: data.credits, token: accessToken };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
//   }
// });

// // Thunks for fetching current user
// export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
//   try {
//     const token = getToken()?.accessToken;
//     const data = await authService.getMe(token);
//     return { user: data.user, credits: data.credits };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch current user');
=======
// // Thunks for registration, login, and fetching current user
// export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
//   try {
//     const data = await authService.register(userData);
//     saveToken(data.token); // Save token when registering
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
//   try {
//     const data = await authService.login(userData);
//     saveToken(data.token); // Save token after login
//     return { user: data.user, credits: data.credits, token: data.token };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
//   try {
//     const token = getToken(); // Get the token from localStorage
//     const data = await authService.getMe(token);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
>>>>>>> parent of aa6cda1 (get token and save token resolved)
//   }
// });

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
<<<<<<< HEAD
//       state.user = null;
//       state.token = null;
//       state.credits = {};
//       removeToken();
=======
//       // Reset user data and clear the token on logout
//       state.user = null;
//       state.token = null;
//       state.credits = {};
//       removeToken(); 
>>>>>>> parent of aa6cda1 (get token and save token resolved)
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => { state.loading = true; })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
<<<<<<< HEAD
//         state.credits = action.payload.credits;
=======
>>>>>>> parent of aa6cda1 (get token and save token resolved)
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, (state) => { state.loading = true; })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
<<<<<<< HEAD
//         state.token = action.payload.token;
//         state.credits = action.payload.credits;
=======
//         state.credits = action.payload.credits;
//         state.token = action.payload.token;
>>>>>>> parent of aa6cda1 (get token and save token resolved)
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchCurrentUser.pending, (state) => { state.loading = true; })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.credits = action.payload.credits;
//       })
//       .addCase(fetchCurrentUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;




<<<<<<< HEAD
// Redux Toolkit slice for authentication
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as authService from "../../services/authService"
import { saveToken, getToken, removeToken } from "../../utils/localStorage"
=======

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';
import { saveToken, getToken, removeToken } from '../../utils/localStorage';
>>>>>>> parent of aa6cda1 (get token and save token resolved)

const initialState = {
  user: null,
  token: getToken()?.accessToken || null,
  credits: {},
  loading: false,
  error: null,
}

<<<<<<< HEAD
// Thunks for user registration
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData)

    // Handle different token structures from backend
    if (data.token) {
      saveToken(data.token)
    }

    return {
      user: data.user,
      credits: data.credits || {},
      token: data.token?.accessToken || data.token,
    }
=======
// Thunks for registration, login, and fetching current user
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData);
    saveToken(data.token); // Save token when registering
    return data;
>>>>>>> parent of aa6cda1 (get token and save token resolved)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed")
  }
})

<<<<<<< HEAD
// Thunks for user login
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData)

    // Handle different token structures from backend
    if (data.token) {
      saveToken(data.token)
    }

    return {
      user: data.user,
      credits: data.credits || {},
      token: data.token?.accessToken || data.token,
    }
=======
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData);
    saveToken(data.token); // Save token after login
    return { user: data.user, credits: data.credits, token: data.token };
>>>>>>> parent of aa6cda1 (get token and save token resolved)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed")
  }
})

<<<<<<< HEAD
// Thunks for fetching current user
export const fetchCurrentUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const data = await authService.getMe()
    return { user: data.user, credits: data.credits || {} }
=======
export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const token = getToken(); // Get the token from localStorage
    const data = await authService.getMe(token);
    return data;
>>>>>>> parent of aa6cda1 (get token and save token resolved)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch current user")
  }
})

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
<<<<<<< HEAD
      state.user = null
      state.token = null
      state.credits = {}
      removeToken()
    },
    clearAuthError: (state) => {
      state.error = null
=======
      // Reset user data and clear the token on logout
      state.user = null;
      state.token = null;
      state.credits = {};
      removeToken(); 
>>>>>>> parent of aa6cda1 (get token and save token resolved)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.credits = action.payload.credits
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.credits = action.payload.credits
=======
        state.loading = false;
        state.user = action.payload.user;
        state.credits = action.payload.credits;
        state.token = action.payload.token;
>>>>>>> parent of aa6cda1 (get token and save token resolved)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.credits = action.payload.credits
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
