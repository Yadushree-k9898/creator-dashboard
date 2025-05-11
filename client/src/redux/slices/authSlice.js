// // Redux Toolkit slice for authentication
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
//   }
// });

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.credits = {};
//       removeToken();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => { state.loading = true; })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.credits = action.payload.credits;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, (state) => { state.loading = true; })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.credits = action.payload.credits;
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




// Redux Toolkit slice for authentication
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as authService from "../../services/authService"
import { saveToken, getToken, removeToken } from "../../utils/localStorage"

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
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});


// Thunks for user login
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
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
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});


// Thunks for fetching current user
export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const data = await authService.getMe()
    return { user: data.user, credits: data.credits || {} }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch current user');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.credits = {}
      removeToken()
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.credits = action.payload.credits;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.credits = action.payload.credits
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => { state.loading = true; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.credits = action.payload.credits;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
