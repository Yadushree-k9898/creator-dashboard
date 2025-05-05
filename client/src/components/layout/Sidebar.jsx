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
  ChevronRight
} from "lucide-react"


const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()
  const { isAdmin } = useUserRole()

  // Navigation items for regular users
  const userNavItems = [
    { path: "/dashboard/user", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/feed", label: "Feed", icon: <Newspaper size={20} /> },
    { path: "/feed/saved", label: "Saved Content", icon: <Bookmark size={20} /> },
    { path: "/dashboard/profile", label: "Profile Settings", icon: <Settings size={20} /> }
  ]

  // Additional navigation items for admins
  const adminNavItems = [
    { path: "/dashboard/admin", label: "Admin Dashboard", icon: <BarChart size={20} /> },
    { path: "/dashboard/users", label: "Manage Users", icon: <Users size={20} /> },
    { path: "/dashboard/credits", label: "Credit Management", icon: <CreditCard size={20} /> },
    { path: "/dashboard/reports", label: "Reports", icon: <Flag size={20} /> }
  ]

  // Combine navigation items based on user role
  const navItems = isAdmin ? [...userNavItems, ...adminNavItems] : userNavItems

  // Check if a navigation item is active
  const isActive = (path) => {
    const [basePath, hash] = path.split("#")
    const currentPath = location.pathname
    const currentHash = location.hash

    // Check both base path and hash if provided
    if (hash) {
      return currentPath === basePath && currentHash === `#${hash}`
    }
    return currentPath === basePath
  }

  return (
    <aside className="sidebar fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-md 
      transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out z-20 
      overflow-y-auto flex flex-col">
      
      <div className="flex flex-col flex-1">
        {user && (
          <div className="p-4 border-b dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-900/50 
            transition-colors duration-300">
            {/* User Profile Section */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center 
                shadow-md transition-transform duration-300 hover:scale-110">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user.name || "Creator"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{isAdmin ? "Admin" : "Creator"}</p>
              </div>
            </div>
            
            {/* User Stats */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Credits</p>
                <p className="font-medium text-primary">{user.credits || 0}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-md">
                <p className="text-xs text-primary font-medium">{isAdmin ? "Admin" : "Creator"}</p>
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
                  <span className={`mr-3 transition-transform duration-300 ${
                    isActive(item.path) ? "" : "group-hover:translate-x-1"
                  }`}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && (
                    <ChevronRight size={16} className="ml-auto animate-pulse" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar