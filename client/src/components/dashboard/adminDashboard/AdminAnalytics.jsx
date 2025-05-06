import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Skeleton } from "../../ui/skeleton"
import { Users, TrendingUp, CreditCard, Calendar } from "lucide-react"

// Import chart components (assuming you're using a charting library)
// For this example, I'll create placeholder components
const BarChart = ({ data, className }) => (
  <div className={`h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
    {/* This would be your actual chart component */}
    <div className="text-center text-gray-500 dark:text-gray-400">Bar Chart Visualization</div>
  </div>
)

const LineChart = ({ data, className }) => (
  <div className={`h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
    {/* This would be your actual chart component */}
    <div className="text-center text-gray-500 dark:text-gray-400">Line Chart Visualization</div>
  </div>
)

const PieChart = ({ data, className }) => (
  <div className={`h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
    {/* This would be your actual chart component */}
    <div className="text-center text-gray-500 dark:text-gray-400">Pie Chart Visualization</div>
  </div>
)

const DonutChart = ({ data, className }) => (
  <div className={`h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
    {/* This would be your actual chart component */}
    <div className="text-center text-gray-500 dark:text-gray-400">Donut Chart Visualization</div>
  </div>
)

const AdminAnalytics = ({ dashboard }) => {
  const [timeRange, setTimeRange] = useState("week")

  if (!dashboard) {
    return <AnalyticsSkeletons />
  }

  // Format data for charts (these would be your actual data transformations)
  const userGrowthData = [
    { name: "Total Users", value: dashboard.userStats?.totalUsers || 0 },
    { name: "New Users (Week)", value: dashboard.userStats?.newUsersLastWeek || 0 },
    { name: "New Users (Month)", value: dashboard.userStats?.newUsersLastMonth || 0 },
    { name: "Active Users (Week)", value: dashboard.userStats?.activeUsersLastWeek || 0 },
  ]

  const userRoleData = [
    { name: "Admins", value: dashboard.userStats?.totalAdmins || 0 },
    { name: "Regular Users", value: dashboard.userStats?.totalUsers - (dashboard.userStats?.totalAdmins || 0) },
  ]

  const creditDistributionData =
    dashboard.creditStats?.creditsByActionType?.map((item) => ({
      name: item.action,
      value: item.totalPoints,
    })) || []

  const feedInteractionData =
    dashboard.feedStats?.dailyInteractions?.map((item) => ({
      date: item.date,
      Saved: item.saved,
      Reported: item.reported,
      Shared: item.shared,
    })) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              timeRange === "week"
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              timeRange === "month"
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              timeRange === "year"
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4 w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger
            value="users"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <Users className="h-4 w-4" />
            User Analytics
          </TabsTrigger>
          <TabsTrigger
            value="credits"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <CreditCard className="h-4 w-4" />
            Credit Analytics
          </TabsTrigger>
          <TabsTrigger
            value="feed"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4" />
            Feed Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Users"
              value={dashboard.userStats?.totalUsers || 0}
              icon={<Users className="h-5 w-5 text-primary" />}
              change={dashboard.userStats?.userGrowthRate || "+0%"}
              isPositive={true}
            />
            <StatCard
              title="New Users"
              value={dashboard.userStats?.newUsersLastWeek || 0}
              icon={<Users className="h-5 w-5 text-green-500" />}
              change={"+12%"}
              isPositive={true}
              period="This Week"
            />
            <StatCard
              title="Active Users"
              value={dashboard.userStats?.activeUsersLastWeek || 0}
              icon={<Users className="h-5 w-5 text-amber-500" />}
              change={dashboard.userStats?.activeUserRate || "+0%"}
              isPositive={true}
              period="This Week"
            />
            <StatCard
              title="Profile Completion"
              value={dashboard.userStats?.profileCompletionRate || "0%"}
              icon={<Users className="h-5 w-5 text-violet-500" />}
              isPercentage={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={userGrowthData} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={userRoleData} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Credits"
              value={dashboard.creditStats?.totalPlatformCredits || 0}
              icon={<CreditCard className="h-5 w-5 text-primary" />}
              change={"+8%"}
              isPositive={true}
            />
            <StatCard
              title="Login Points"
              value={dashboard.creditStats?.totalLoginPoints || 0}
              icon={<Calendar className="h-5 w-5 text-green-500" />}
              change={"+5%"}
              isPositive={true}
            />
            <StatCard
              title="Profile Points"
              value={dashboard.creditStats?.totalProfilePoints || 0}
              icon={<Users className="h-5 w-5 text-amber-500" />}
              change={"+3%"}
              isPositive={true}
            />
            <StatCard
              title="Interaction Points"
              value={dashboard.creditStats?.totalInteractionPoints || 0}
              icon={<TrendingUp className="h-5 w-5 text-violet-500" />}
              change={"+15%"}
              isPositive={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Credit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart data={creditDistributionData} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Credit Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart data={feedInteractionData} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feed" className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Saved"
              value={dashboard.feedStats?.totalSavedPosts || 0}
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
              change={"+12%"}
              isPositive={true}
            />
            <StatCard
              title="Total Reported"
              value={dashboard.feedStats?.totalReportedPosts || 0}
              icon={<TrendingUp className="h-5 w-5 text-rose-500" />}
              change={"-5%"}
              isPositive={false}
            />
            <StatCard
              title="Total Shared"
              value={dashboard.feedStats?.totalSharedPosts || 0}
              icon={<TrendingUp className="h-5 w-5 text-amber-500" />}
              change={"+18%"}
              isPositive={true}
            />
            <StatCard
              title="Engagement Rate"
              value={dashboard.feedStats?.engagementRate || "0%"}
              icon={<TrendingUp className="h-5 w-5 text-violet-500" />}
              isPercentage={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Feed Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={feedInteractionData} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Interaction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart data={feedInteractionData} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, icon, change, isPositive = true, period = "", isPercentage = false }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {isPercentage ? value : value.toLocaleString()}
              </h3>
              {period && <p className="text-xs text-gray-500 mt-1">{period}</p>}
            </div>
            <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          </div>
          {change && (
            <div className="mt-2">
              <span
                className={`text-xs font-medium ${
                  isPositive ? "text-green-600 dark:text-green-400" : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {change}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div
          className={`h-1 w-full ${isPositive ? "bg-green-500 dark:bg-green-600" : "bg-rose-500 dark:bg-rose-600"}`}
        ></div>
      </CardContent>
    </Card>
  )
}

// Skeleton loading state
const AnalyticsSkeletons = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminAnalytics
