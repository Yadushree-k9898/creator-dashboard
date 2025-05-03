// Layout.jsx
import { useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useAuth } from "../../hooks/useAuth"

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Don't show sidebar on auth pages
  const isAuthPage = location.pathname.includes("/auth")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1">
        {isAuthenticated && !isAuthPage && <Sidebar />}
        <main className={`flex-1 p-4 ${isAuthenticated && !isAuthPage ? "md:ml-64" : ""}`}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export { Layout }
export default Layout
