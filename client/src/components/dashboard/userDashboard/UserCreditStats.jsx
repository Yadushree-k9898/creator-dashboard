import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Award, Calendar, Users } from "lucide-react"
import { StatCard, ProgressBar } from "./StatComponents"
import userService from "@/services/userService" 

const UserCreditStats = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await userService.getDashboard()
        setDashboardData(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch dashboard:", err)
        setError("Unable to load credit data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const credits = dashboardData?.creditStats

  if (loading) {
    return (
      <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Coins className="mr-2 h-5 w-5 text-primary" />
            Credit Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              ></div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded w-24"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded w-12"></div>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !credits) {
    return (
      <Card className="transition-all duration-300 shadow-md hover:shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Coins className="mr-2 h-5 w-5 text-primary" />
            Credit Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-md border border-red-100 dark:border-red-900/20 text-red-800 dark:text-red-400">
            {error || "Unable to load credit data. Please try again later."}
          </div>
        </CardContent>
      </Card>
    )
  }

  const creditData = {
    totalCredits: Number(credits.totalCredits) || 0,
    loginCredits: Number(credits.loginCredits) || 0,
    profileCredits: Number(credits.profileCredits) || 0,
    interactionCredits: Number(credits.interactionCredits) || 0,
  }

  const totalCredits =
    creditData.totalCredits || creditData.loginCredits + creditData.profileCredits + creditData.interactionCredits

  return (
    <Card
      className={`transition-all duration-500 shadow-md hover:shadow-lg transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2 h-5 w-5 text-primary" />
          Credit Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StatCard
            title="Total Credits"
            value={totalCredits}
            icon={<Coins className="h-5 w-5" />}
            description="Your total earned credits"
            className="border-t-4 border-primary"
          />
          <StatCard
            title="Login Credits"
            value={creditData.loginCredits}
            icon={<Calendar className="h-5 w-5" />}
            description="Credits earned from daily logins"
            className="border-t-4 border-blue-500"
          />
          <StatCard
            title="Profile Credits"
            value={creditData.profileCredits}
            icon={<Users className="h-5 w-5" />}
            description="Credits from profile completion"
            className="border-t-4 border-purple-500"
          />
          <StatCard
            title="Interaction Credits"
            value={creditData.interactionCredits}
            icon={<Award className="h-5 w-5" />}
            description="Credits from post interactions"
            className="border-t-4 border-green-500"
          />
        </div>

        <div className="space-y-5 mt-8">
          <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 relative inline-block after:content-[''] after:absolute after:w-1/3 after:h-1 after:bg-primary/30 after:left-0 after:bottom-0">
            Credit Breakdown
          </h3>
          <ProgressBar value={creditData.loginCredits} max={totalCredits} label="Login Credits" className="mb-4" />
          <ProgressBar value={creditData.profileCredits} max={totalCredits} label="Profile Credits" className="mb-4" />
          <ProgressBar value={creditData.interactionCredits} max={totalCredits} label="Interaction Credits" />
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCreditStats
