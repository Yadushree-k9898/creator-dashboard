// "use client"

// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchAdminDashboard } from "../../../redux/slices/adminSlice"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BarChart, LineChart, PieChart, DonutChart } from "@tremor/react"
// import { Spinner } from "../../common/Spinner"
// import { ErrorAlert } from "../../common/ErrorAlert"

// const AdminAnalytics = () => {
//   const dispatch = useDispatch()
//   const { dashboard, loading, error } = useSelector((state) => state.admin)

//   useEffect(() => {
//     dispatch(fetchAdminDashboard())
//   }, [dispatch])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spinner />
//       </div>
//     )
//   }

//   if (error) {
//     return <ErrorAlert message={error} />
//   }

//   if (!dashboard) {
//     return <div>No dashboard data available</div>
//   }

//   // Format data for charts
//   const userGrowthData = [
//     {
//       name: "Total Users",
//       value: dashboard.userStats.totalUsers,
//     },
//     {
//       name: "New Users (Week)",
//       value: dashboard.userStats.newUsersLastWeek,
//     },
//     {
//       name: "New Users (Month)",
//       value: dashboard.userStats.newUsersLastMonth,
//     },
//     {
//       name: "Active Users (Week)",
//       value: dashboard.userStats.activeUsersLastWeek,
//     },
//   ]

//   const userRoleData = [
//     {
//       name: "Admins",
//       value: dashboard.userStats.totalAdmins,
//     },
//     {
//       name: "Creators",
//       value: dashboard.userStats.totalCreators,
//     },
//   ]

//   const creditDistributionData = dashboard.creditStats.creditsByActionType.map((item) => ({
//     name: item.action,
//     value: item.totalPoints,
//   }))

//   const feedInteractionData = dashboard.feedStats.dailyInteractions.map((item) => ({
//     date: item.date,
//     Saved: item.saved,
//     Reported: item.reported,
//     Shared: item.shared,
//   }))

//   const postSourceData = dashboard.feedStats.postSourceDistribution.map((item) => ({
//     name: item._id || "Unknown",
//     value: item.count,
//   }))

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="users">
//         <TabsList className="mb-4">
//           <TabsTrigger value="users">User Analytics</TabsTrigger>
//           <TabsTrigger value="credits">Credit Analytics</TabsTrigger>
//           <TabsTrigger value="feed">Feed Analytics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="users" className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>User Growth</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <BarChart
//                   data={userGrowthData}
//                   index="name"
//                   categories={["value"]}
//                   colors={["blue"]}
//                   valueFormatter={(value) => `${value.toLocaleString()}`}
//                   yAxisWidth={48}
//                 />
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>User Roles</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <DonutChart
//                   data={userRoleData}
//                   index="name"
//                   category="value"
//                   valueFormatter={(value) => `${value.toLocaleString()}`}
//                   colors={["indigo", "cyan"]}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>User Engagement Metrics</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <h3 className="text-sm font-medium text-blue-800">Profile Completion Rate</h3>
//                   <p className="text-2xl font-bold text-blue-900">{dashboard.userStats.profileCompletionRate}</p>
//                 </div>
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <h3 className="text-sm font-medium text-green-800">Active User Rate</h3>
//                   <p className="text-2xl font-bold text-green-900">{dashboard.userStats.activeUserRate}</p>
//                 </div>
//                 <div className="p-4 bg-purple-50 rounded-lg">
//                   <h3 className="text-sm font-medium text-purple-800">Monthly Growth Rate</h3>
//                   <p className="text-2xl font-bold text-purple-900">{dashboard.userStats.monthlyGrowthRate}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="credits" className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Credit Distribution by Action</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <PieChart
//                   data={creditDistributionData}
//                   index="name"
//                   category="value"
//                   valueFormatter={(value) => `${value.toLocaleString()} credits`}
//                   colors={["blue", "cyan", "indigo", "violet", "purple"]}
//                 />
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Credit Statistics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="p-4 bg-blue-50 rounded-lg">
//                     <h3 className="text-sm font-medium text-blue-800">Total Platform Credits</h3>
//                     <p className="text-2xl font-bold text-blue-900">
//                       {dashboard.creditStats.totalPlatformCredits.toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <h3 className="text-xs font-medium text-green-800">Login Points</h3>
//                       <p className="text-xl font-bold text-green-900">
//                         {dashboard.creditStats.totalLoginPoints.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="p-4 bg-purple-50 rounded-lg">
//                       <h3 className="text-xs font-medium text-purple-800">Profile Points</h3>
//                       <p className="text-xl font-bold text-purple-900">
//                         {dashboard.creditStats.totalProfilePoints.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="p-4 bg-indigo-50 rounded-lg">
//                       <h3 className="text-xs font-medium text-indigo-800">Interaction Points</h3>
//                       <p className="text-xl font-bold text-indigo-900">
//                         {dashboard.creditStats.totalInteractionPoints.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Credit Action Breakdown</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="text-left py-2 px-4">Action</th>
//                       <th className="text-right py-2 px-4">Total Points</th>
//                       <th className="text-right py-2 px-4">Count</th>
//                       <th className="text-right py-2 px-4">Avg. Points</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dashboard.creditStats.creditsByActionType.map((item, index) => (
//                       <tr key={index} className="border-b hover:bg-gray-50">
//                         <td className="py-2 px-4">{item.action}</td>
//                         <td className="text-right py-2 px-4">{item.totalPoints.toLocaleString()}</td>
//                         <td className="text-right py-2 px-4">{item.count.toLocaleString()}</td>
//                         <td className="text-right py-2 px-4">{item.averagePoints}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="feed" className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Feed Interactions Over Time</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <LineChart
//                   data={feedInteractionData}
//                   index="date"
//                   categories={["Saved", "Reported", "Shared"]}
//                   colors={["blue", "red", "green"]}
//                   valueFormatter={(value) => `${value.toLocaleString()}`}
//                   yAxisWidth={40}
//                 />
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Post Source Distribution</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <PieChart
//                   data={postSourceData}
//                   index="name"
//                   category="value"
//                   valueFormatter={(value) => `${value.toLocaleString()} posts`}
//                   colors={["blue", "cyan", "indigo"]}
//                 />
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Feed Engagement Metrics</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <h3 className="text-xs font-medium text-blue-800">Total Saved</h3>
//                   <p className="text-xl font-bold text-blue-900">
//                     {dashboard.feedStats.totalSavedPosts.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="p-4 bg-red-50 rounded-lg">
//                   <h3 className="text-xs font-medium text-red-800">Total Reported</h3>
//                   <p className="text-xl font-bold text-red-900">
//                     {dashboard.feedStats.totalReportedPosts.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <h3 className="text-xs font-medium text-green-800">Total Shared</h3>
//                   <p className="text-xl font-bold text-green-900">
//                     {dashboard.feedStats.totalSharedPosts.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="p-4 bg-yellow-50 rounded-lg">
//                   <h3 className="text-xs font-medium text-yellow-800">Report Rate</h3>
//                   <p className="text-xl font-bold text-yellow-900">{dashboard.feedStats.reportRate}</p>
//                 </div>
//                 <div className="p-4 bg-purple-50 rounded-lg">
//                   <h3 className="text-xs font-medium text-purple-800">Share Rate</h3>
//                   <p className="text-xl font-bold text-purple-900">{dashboard.feedStats.shareRate}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default AdminAnalytics




"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAdminDashboard } from "../../../redux/slices/adminSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, DonutChart } from "@tremor/react"
import { Spinner } from "../../common/Spinner"
import { ErrorAlert } from "../../common/ErrorAlert"
import { Users, CreditCard, Share2, TrendingUp, Activity, ChevronRight, BarChartIcon, PieChartIcon } from 'lucide-react'

const AdminAnalytics = () => {
  const dispatch = useDispatch()
  const { dashboard, loading, error } = useSelector((state) => state.admin)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("users")

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchAdminDashboard())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 animate-fadeIn">
        <div className="flex flex-col items-center">
          <Spinner className="h-12 w-12 text-primary" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="animate-fadeIn">
        <ErrorAlert message={error} />
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400 animate-fadeIn">
        <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <p className="text-xl">No dashboard data available</p>
      </div>
    )
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
    <div
      className={`space-y-6 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <Tabs defaultValue="users" onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
          >
            <Users className="h-4 w-4 mr-2" />
            User Analytics
          </TabsTrigger>
          <TabsTrigger
            value="credits"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Credit Analytics
          </TabsTrigger>
          <TabsTrigger
            value="feed"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Feed Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={userGrowthData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  yAxisWidth={48}
                  className="h-64"
                />
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                  User Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={userRoleData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  colors={["indigo", "cyan"]}
                  className="h-64"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                User Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Profile Completion Rate
                  </h3>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                    {dashboard.userStats.profileCompletionRate}
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-400 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Active User Rate
                  </h3>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                    {dashboard.userStats.activeUserRate}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-sm font-medium text-purple-800 dark:text-purple-400 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" /> Monthly Growth Rate
                  </h3>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                    {dashboard.userStats.monthlyGrowthRate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                  Credit Distribution by Action
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={creditDistributionData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()} credits`}
                  colors={["blue", "cyan", "indigo", "violet", "purple"]}
                  className="h-64"
                />
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Credit Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" /> Total Platform Credits
                    </h3>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                      {dashboard.creditStats.totalPlatformCredits.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                      <h3 className="text-xs font-medium text-green-800 dark:text-green-400">Login Points</h3>
                      <p className="text-xl font-bold text-green-900 dark:text-green-300">
                        {dashboard.creditStats.totalLoginPoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                      <h3 className="text-xs font-medium text-purple-800 dark:text-purple-400">Profile Points</h3>
                      <p className="text-xl font-bold text-purple-900 dark:text-purple-300">
                        {dashboard.creditStats.totalProfilePoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                      <h3 className="text-xs font-medium text-indigo-800 dark:text-indigo-400">Interaction Points</h3>
                      <p className="text-xl font-bold text-indigo-900 dark:text-indigo-300">
                        {dashboard.creditStats.totalInteractionPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Credit Action Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Action</th>
                      <th className="text-right py-2 px-4 text-gray-700 dark:text-gray-300">Total Points</th>
                      <th className="text-right py-2 px-4 text-gray-700 dark:text-gray-300">Count</th>
                      <th className="text-right py-2 px-4 text-gray-700 dark:text-gray-300">Avg. Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.creditStats.creditsByActionType.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{item.action}</td>
                        <td className="text-right py-2 px-4 text-primary">
                          {item.totalPoints.toLocaleString()}
                        </td>
                        <td className="text-right py-2 px-4 text-gray-700 dark:text-gray-300">
                          {item.count.toLocaleString()}
                        </td>
                        <td className="text-right py-2 px-4 text-gray-700 dark:text-gray-300">{item.averagePoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feed" className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Feed Interactions Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={feedInteractionData}
                  index="date"
                  categories={["Saved", "Reported", "Shared"]}
                  colors={["blue", "red", "green"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  yAxisWidth={40}
                  className="h-64"
                />
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                  Post Source Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={postSourceData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()} posts`}
                  colors={["blue", "cyan", "indigo"]}
                  className="h-64"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="transition-all duration-300 shadow-md hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 h-5 w-5 text-primary" />
                Feed Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-xs font-medium text-blue-800 dark:text-blue-400">Total Saved</h3>
                  <p className="text-xl font-bold text-blue-900 dark:text-blue-300">
                    {dashboard.feedStats.totalSavedPosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-xs font-medium text-red-800 dark:text-red-400">Total Reported</h3>
                  <p className="text-xl font-bold text-red-900 dark:text-red-300">
                    {dashboard.feedStats.totalReportedPosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-xs font-medium text-green-800 dark:text-green-400">Total Shared</h3>
                  <p className="text-xl font-bold text-green-900 dark:text-green-300">
                    {dashboard.feedStats.totalSharedPosts.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-xs font-medium text-yellow-800 dark:text-yellow-400">Report Rate</h3>
                  <p className="text-xl font-bold text-yellow-900 dark:text-yellow-300">{dashboard.feedStats.reportRate}</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                  <h3 className="text-xs font-medium text-purple-800 dark:text-purple-400">Share Rate</h3>
                  <p className="text-xl font-bold text-purple-900 dark:text-purple-300">{dashboard.feedStats.shareRate}</p>
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
