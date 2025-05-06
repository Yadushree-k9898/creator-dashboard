import { useSelector } from "react-redux"

/**
 * Custom hook to check user roles
 * @returns {Object} Object containing role check functions
 */
export const useUserRole = () => {
  const { user } = useSelector((state) => state.auth)

  // Check if user is admin - case insensitive comparison
  const isAdmin = user?.role?.toLowerCase() === "admin"

  // Check if user is a regular user - case insensitive comparison
  const isUser = user?.role?.toLowerCase() === "user"

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user || !user.role) return false
    return user.role.toLowerCase() === role.toLowerCase()
  }

  return { isAdmin, isUser, hasRole }
}
