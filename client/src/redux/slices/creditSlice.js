// redux/slices/creditSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users/dashboard";

export const fetchUserDashboard = createAsyncThunk(
  "credits/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch dashboard");
    }
  }
);

const creditSlice = createSlice({
  name: "credits",
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

export default creditSlice.reducer;
