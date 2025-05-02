import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    totalCredits: 0,
    loginCredits: 0,
    profileCredits: 0,
    interactionCredits: 0
  },
  loading: false,
  error: null
};

const creditSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {
    setCredits: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setCredits, setLoading, setError } = creditSlice.actions;
export default creditSlice.reducer;
