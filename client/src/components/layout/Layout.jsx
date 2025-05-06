import { useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useAuth } from "../../hooks/useAuth"

/**
 * Main Layout component that wraps the application content
 * Handles conditional rendering of sidebar based on authentication status
 */
const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Don't show sidebar on auth pages
  const isAuthPage = location.pathname.includes("/auth")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="flex flex-1">
        {isAuthenticated && !isAuthPage && <Sidebar />}

        <main className={`flex-1 transition-all duration-300 ${isAuthenticated && !isAuthPage ? "md:ml-64" : ""}`}>
          <div className="max-w-7xl mx-auto p-6 animate-fadeIn">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
