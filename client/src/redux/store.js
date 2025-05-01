import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Your auth slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});

export default store;
