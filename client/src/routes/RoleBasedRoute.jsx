
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedRoute = ({ isAuthenticated, isAuthorized, redirectPath }) => {

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is not authorized for the route, redirect to the specified path
  if (!isAuthorized) {
    return <Navigate to={redirectPath} />;
  }

  // If the user is authenticated and authorized, render the nested routes
  return <Outlet />;
};

export { RoleBasedRoute };  
