import { Navigate, Outlet, useLocation } from "react-router-dom"

/**
 * A wrapper component for routes that require specific role authorization
 * @param {boolean} isAuthenticated - Whether the user is authenticated
 * @param {boolean} isAuthorized - Whether the user has the required role
 * @param {string} redirectPath - Path to redirect to if not authorized
 * @returns {JSX.Element} The protected route or redirect
 */
const RoleBasedRoute = ({ isAuthenticated, isAuthorized, redirectPath = "/dashboard/user", children }) => {
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page with return URL if not authenticated
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
  }

  if (!isAuthorized) {
    // Redirect to specified path if authenticated but not authorized
    return <Navigate to={redirectPath} replace />
  }

  // If there are children, render them, otherwise render the outlet
  return children ? children : <Outlet />
}

export default RoleBasedRoute
