
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useUserRole } from "../../hooks/useUserRole"
import {
  Home,
  User,
  CreditCard,
  Newspaper,
  Bookmark,
  Settings,
  Users,
  BarChart,
  Flag,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()
  const { isAdmin } = useUserRole()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Navigation items for regular users
  const userNavItems = [
    { path: "/dashboard/user", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/feed", label: "Feed", icon: <Newspaper size={20} /> },
    { path: "/feed/saved", label: "Saved Content", icon: <Bookmark size={20} /> },
    { path: "/dashboard/profile", label: "Profile Settings", icon: <Settings size={20} /> },
  ]

  // Navigation items for admins
  const adminNavItems = [
    { path: "/dashboard/admin", label: "Admin Dashboard", icon: <BarChart size={20} /> },
    { path: "/dashboard/users", label: "Manage Users", icon: <Users size={20} /> },
    { path: "/dashboard/credits", label: "Credit Management", icon: <CreditCard size={20} /> },
    { path: "/dashboard/reports", label: "Reports", icon: <Flag size={20} /> },
  ]

  // Use only admin items for admin users, not both sets
  const navItems = isAdmin ? adminNavItems : userNavItems

  // Check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-4 right-4 md:hidden z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)] md:z-20
          ${isVisible ? "opacity-100" : "opacity-0 md:opacity-100"}
          overflow-y-auto flex flex-col`}
      >
        {user && (
          <div
            className="p-4 border-b dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-900/50 
            transition-colors duration-300"
          >
            {/* User Profile Section */}
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center 
                shadow-md transition-transform duration-300 hover:scale-110"
              >
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user.name || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{isAdmin ? "Admin" : "User"}</p>
              </div>
            </div>

            {/* User Stats */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Credits</p>
                <p className="font-medium text-primary">{user.credits || 0}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-md">
                <p className="text-xs text-primary font-medium">{isAdmin ? "Admin" : "User"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path} className="group">
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    className={`mr-3 transition-transform duration-300 ${
                      isActive(item.path) ? "" : "group-hover:translate-x-1"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && <ChevronRight size={16} className="ml-auto animate-pulse" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
