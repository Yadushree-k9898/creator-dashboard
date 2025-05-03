import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import userSlice from './slices/userSlice';
import creditSlice from './slices/creditSlice';
import feedSlice from './slices/feedSlice'; // Add this import

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    credits: creditSlice,
    feed: feedSlice, // Add feed reducer
  },
});

export default store;
