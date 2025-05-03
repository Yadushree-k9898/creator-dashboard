// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserRole } from "../hooks/useUserRole";

// Layout
import { Layout } from "../components/layout/Layout";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Logout from "../pages/Auth/Logout";

// Home Page
import HomePage from "../pages/home/HomePage";

// Dashboard Pages
import UserDashboard from "../pages/Dashboard/UserDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ProfileSettings from "../pages/Dashboard/ProfileSettings";

// Feed Pages
import FeedPage from "../pages/Feed/FeedPage";
import SavedFeedPage from "../pages/Feed/SavedFeedPage";

// Not Found
import NotFound from "../pages/NotFound";

// Protected Route Component
import ProtectedRoute from "./ProtectedRoute";

// Import RoleBasedRoute with the correct path
import { RoleBasedRoute } from "./RoleBasedRoute";

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isAdmin } = useUserRole();

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />

          {/* Auth Routes */}
          <Route path="/auth/login" element={isAuthenticated ? <Navigate to="/dashboard/user" /> : <Login />} />
          <Route path="/auth/register" element={isAuthenticated ? <Navigate to="/dashboard/user" /> : <Register />} />
          <Route path="/auth/logout" element={<Logout />} />

          {/* Protected Routes - User */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route path="/dashboard/profile" element={<ProfileSettings />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/saved" element={<SavedFeedPage />} />
          </Route>

          {/* Protected Routes - Admin Only */}
          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                isAuthorized={isAdmin}
                redirectPath="/dashboard/user"
              />
            }
          >
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/users" element={<AdminDashboard />} />
            <Route path="/dashboard/credits" element={<AdminDashboard />} />
            <Route path="/dashboard/reports" element={<AdminDashboard />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
