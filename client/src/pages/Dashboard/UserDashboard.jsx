import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDashboard } from "@/redux/slices/userSlice"
import UserCreditStats from "@/components/dashboard/userDashboard/UserCreditStats"
import UserRecentActivity from "@/components/dashboard/userDashboard/UserRecentActivity"
import UserSavedPosts from "@/components/dashboard/userDashboard/UserSavedPosts"

const UserDashboard = () => {
  const dispatch = useDispatch()
  const { dashboard, loading, error } = useSelector((state) => state.user)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    dispatch(fetchUserDashboard())

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light")
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary relative before:content-[''] before:absolute before:w-full before:h-full before:border-t-2 before:border-transparent before:border-b-2 before:border-transparent before:rounded-full before:animate-ping before:opacity-75" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-6 rounded-lg shadow-md animate-fadeIn">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="text-center p-12 text-gray-500 animate-pulse">
        No dashboard data available.
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 overflow-auto animate-fadeIn ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-10">
        <main className="max-w-7xl mx-auto space-y-8">
          {/* Full Width Credit Stats */}
          <section className="w-full">
            <UserCreditStats creditStats={dashboard.creditStats} theme={theme} />
          </section>

          {/* Two-column layout on large screens for Saved Posts and Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserSavedPosts posts={dashboard.posts?.allPosts || []} theme={theme} />
            <UserRecentActivity activity={dashboard.recentActivity} theme={theme} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard
