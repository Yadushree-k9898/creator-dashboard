// src/routes/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Shared dynamic route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
          </ProtectedRoute>
        } 
      />

      {/* Explicit role-based routes (optional but useful) */}
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
