"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAdminDashboard } from "../../../redux/slices/adminSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, DonutChart } from "@tremor/react"
import { Spinner } from "../../common/Spinner"
import { ErrorAlert } from "../../common/ErrorAlert"

const AdminAnalytics = () => {
  const dispatch = useDispatch()
  const { dashboard, loading, error } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminDashboard())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!dashboard) {
    return <div>No dashboard data available</div>
  }

  // Format data for charts
  const userGrowthData = [
    {
      name: "Total Users",
      value: dashboard.userStats.totalUsers,
    },
    {
      name: "New Users (Week)",
      value: dashboard.userStats.newUsersLastWeek,
    },
    {
      name: "New Users (Month)",
      value: dashboard.userStats.newUsersLastMonth,
    },
    {
      name: "Active Users (Week)",
      value: dashboard.userStats.activeUsersLastWeek,
    },
  ]

  const userRoleData = [
    {
      name: "Admins",
      value: dashboard.userStats.totalAdmins,
    },
    {
      name: "Creators",
      value: dashboard.userStats.totalCreators,
    },
  ]

  const creditDistributionData = dashboard.creditStats.creditsByActionType.map((item) => ({
    name: item.action,
    value: item.totalPoints,
  }))

  const feedInteractionData = dashboard.feedStats.dailyInteractions.map((item) => ({
    date: item.date,
    Saved: item.saved,
    Reported: item.reported,
    Shared: item.shared,
  }))

  const postSourceData = dashboard.feedStats.postSourceDistribution.map((item) => ({
    name: item._id || "Unknown",
    value: item.count,
  }))

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="credits">Credit Analytics</TabsTrigger>
          <TabsTrigger value="feed">Feed Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={userGrowthData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={userRoleData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  colors={["indigo", "cyan"]}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Profile Completion Rate</h3>
                  <p className="text-2xl font-bold text-blue-900">{dashboard.userStats.profileCompletionRate}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800">Active User Rate</h3>
                  <p className="text-2xl font-bold text-green-900">{dashboard.userStats.activeUserRate}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800">Monthly Growth Rate</h3>
                  <p className="text-2xl font-bold text-purple-900">{dashboard.userStats.monthlyGrowthRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Credit Distribution by Action</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={creditDistributionData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()} credits`}
                  colors={["blue", "cyan", "indigo", "violet", "purple"]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800">Total Platform Credits</h3>
                    <p className="text-2xl font-bold text-blue-900">
                      {dashboard.creditStats.totalPlatformCredits.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="text-xs font-medium text-green-800">Login Points</h3>
                      <p className="text-xl font-bold text-green-900">
                        {dashboard.creditStats.totalLoginPoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="text-xs font-medium text-purple-800">Profile Points</h3>
                      <p className="text-xl font-bold text-purple-900">
                        {dashboard.creditStats.totalProfilePoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h3 className="text-xs font-medium text-indigo-800">Interaction Points</h3>
                      <p className="text-xl font-bold text-indigo-900">
                        {dashboard.creditStats.totalInteractionPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Credit Action Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Action</th>
                      <th className="text-right py-2 px-4">Total Points</th>
                      <th className="text-right py-2 px-4">Count</th>
                      <th className="text-right py-2 px-4">Avg. Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.creditStats.creditsByActionType.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{item.action}</td>
                        <td className="text-right py-2 px-4">{item.totalPoints.toLocaleString()}</td>
                        <td className="text-right py-2 px-4">{item.count.toLocaleString()}</td>
                        <td className="text-right py-2 px-4">{item.averagePoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Feed Interactions Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={feedInteractionData}
                  index="date"
                  categories={["Saved", "Reported", "Shared"]}
                  colors={["blue", "red", "green"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  yAxisWidth={40}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post Source Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={postSourceData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()} posts`}
                  colors={["blue", "cyan", "indigo"]}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feed Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-xs font-medium text-blue-800">Total Saved</h3>
                  <p className="text-xl font-bold text-blue-900">
                    {dashboard.feedStats.totalSavedPosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="text-xs font-medium text-red-800">Total Reported</h3>
                  <p className="text-xl font-bold text-red-900">
                    {dashboard.feedStats.totalReportedPosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-xs font-medium text-green-800">Total Shared</h3>
                  <p className="text-xl font-bold text-green-900">
                    {dashboard.feedStats.totalSharedPosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-xs font-medium text-yellow-800">Report Rate</h3>
                  <p className="text-xl font-bold text-yellow-900">{dashboard.feedStats.reportRate}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-xs font-medium text-purple-800">Share Rate</h3>
                  <p className="text-xl font-bold text-purple-900">{dashboard.feedStats.shareRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminAnalytics
