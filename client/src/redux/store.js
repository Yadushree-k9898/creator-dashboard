import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import userSlice from './slices/userSlice';
import creditSlice from './slices/creditSlice';
import feedSlice from './slices/feedSlice';
import adminSlice from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    credits: creditSlice,
    feed: feedSlice, 
    admin:adminSlice, 
  },
});

export default store;
