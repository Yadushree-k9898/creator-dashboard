import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import userSlice from './slices/userSlice';
import creditSlice from './slices/creditSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    credits: creditSlice,
  },
});

export default store;
