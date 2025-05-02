import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@/services/userService';

export const fetchUserDashboard = createAsyncThunk(
  'user/fetchDashboard',
  async (_, thunkAPI) => {
    try {
      return await userService.getDashboard();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    dashboard: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchUserDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;