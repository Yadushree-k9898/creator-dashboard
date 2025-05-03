"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useUserRole } from "../../hooks/useUserRole"

const Navbar = () => {
  const { isAuthenticated } = useAuth()
  const { isAdmin } = useUserRole()

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ]

  const userLinks = [
    { to: "/dashboard/user", label: "Dashboard" },
    { to: "/feed", label: "Feed" },
  ]

  const adminLinks = [
    { to: "/dashboard/admin", label: "Admin Dashboard" },
    { to: "/dashboard/users", label: "Manage Users" },
  ]

  const renderLinks = () => {
    if (!isAuthenticated) return publicLinks
    if (isAdmin) return [...publicLinks, ...userLinks, ...adminLinks]
    return [...publicLinks, ...userLinks]
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            {renderLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
