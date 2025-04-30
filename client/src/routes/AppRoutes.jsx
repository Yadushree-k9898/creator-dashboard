import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import FeedPage from '../pages/Feed/FeedPage';
import ProfilePage from '../pages/Profile/ProfilePage';

// You might have a NotFound page for handling undefined paths
// import NotFound from '../pages/NotFound';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"  // Correct lowercase path
        element={<ProtectedRoute role="User" element={<UserDashboard />} />}
      />
      <Route
        path="/feed"
        element={<ProtectedRoute role=" User" element={<FeedPage />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute role="User" element={<ProfilePage />} />}
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"  // Admin dashboard route (make sure it's correct)
        element={<ProtectedRoute role="Admin" element={<AdminDashboard />} />}
      />
      {/* Other Admin Routes can be added here as needed */}
      
      {/* Fallback Route for undefined paths */}
      {/* Uncomment and use if you have a NotFound component */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
