import { Navigate, Outlet, useLocation } from "react-router-dom"

/**
 * A wrapper component for routes that require authentication
 * @param {boolean} isAuthenticated - Whether the user is authenticated
 * @param {string} redirectPath - Path to redirect to if not authenticated
 * @returns {JSX.Element} The protected route or redirect
 */
const ProtectedRoute = ({ isAuthenticated, redirectPath = "/auth/login", children }) => {
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
  }

  // If there are children, render them, otherwise render the outlet
  return children ? children : <Outlet />
}

export default ProtectedRoute
