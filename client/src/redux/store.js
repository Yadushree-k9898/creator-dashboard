import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import creditReducer from './slices/creditSlice';
// import feedReducer from './slices/feedSlice';
// import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // credits: creditReducer,
    // feed: feedReducer,
    // user: userReducer,
  },
});
