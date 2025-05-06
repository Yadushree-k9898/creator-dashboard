import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useUserRole } from "../hooks/useUserRole"
import { Suspense, lazy } from "react"

// Layout
import Layout from "../components/layout/Layout"
import  Spinner  from "../components/common/Spinner"

// Auth Pages
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Logout from "../pages/Auth/Logout"

// Home Page
import HomePage from "../pages/home/HomePage"

// Lazy loaded components
const UserDashboard = lazy(() => import("../pages/Dashboard/UserDashboard"))
const AdminDashboard = lazy(() => import("../pages/Dashboard/AdminDashboard"))
const ProfileSettings = lazy(() => import("../pages/Dashboard/ProfileSettings"))
const FeedPage = lazy(() => import("../pages/Feed/FeedPage"))
const SavedFeedPage = lazy(() => import("../pages/Feed/SavedFeedPage"))
const NotFound = lazy(() => import("../pages/NotFound"))

// Protected Route Component
import ProtectedRoute from "./ProtectedRoute"
import RoleBasedRoute from "./RoleBasedRoute"

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Spinner size="lg" />
  </div>
)

const AppRouter = () => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const { isAdmin } = useUserRole()

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Routes */}
            <Route
              path="/auth/login"
              element={isAuthenticated ? <Navigate to={isAdmin ? "/dashboard/admin" : "/dashboard/user"} /> : <Login />}
            />
            <Route
              path="/auth/register"
              element={
                isAuthenticated ? <Navigate to={isAdmin ? "/dashboard/admin" : "/dashboard/user"} /> : <Register />
              }
            />
            <Route path="/auth/logout" element={<Logout />} />

            {/* Protected Routes - User */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route
                path="/dashboard"
                element={<Navigate to={isAdmin ? "/dashboard/admin" : "/dashboard/user"} replace />}
              />
              <Route
                path="/dashboard/user"
                element={isAdmin ? <Navigate to="/dashboard/admin" /> : <UserDashboard />}
              />
              <Route path="/dashboard/profile" element={<ProfileSettings />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/feed/saved" element={<SavedFeedPage />} />
            </Route>

            {/* Protected Routes - Admin Only */}
            <Route element={<RoleBasedRoute isAuthenticated={isAuthenticated} isAuthorized={isAdmin} />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/users" element={<AdminDashboard />} />
              <Route path="/dashboard/credits" element={<AdminDashboard />} />
              <Route path="/dashboard/reports" element={<AdminDashboard />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default AppRouter
