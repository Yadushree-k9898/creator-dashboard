import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { ScrollArea } from "../../ui/scroll-area"
import { Skeleton } from "../../ui/skeleton"
import { Save, Share2, Flag, TrendingUp } from "lucide-react"

// Import real chart components
import BarChartComponent from "./charts/BarChartComponent"
import PieChartComponent from "./charts/PieChartComponent"
import LineChartComponent from "./charts/LineChartComponent"

const SavedFeeds = ({ feedStats }) => {
  const [interactionData, setInteractionData] = useState([])
  const [sourceData, setSourceData] = useState([])
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    if (feedStats) {
      // Format interaction data for charts
      setInteractionData([
        { name: "Saved Posts", value: feedStats.totalSavedPosts || 0 },
        { name: "Reported Posts", value: feedStats.totalReportedPosts || 0 },
        { name: "Shared Posts", value: feedStats.totalSharedPosts || 0 },
      ])

      // Format source distribution data for pie chart
      if (Array.isArray(feedStats.postSourceDistribution) && feedStats.postSourceDistribution.length) {
        setSourceData(
          feedStats.postSourceDistribution.map((item) => ({
            name: item._id || "Unknown",
            value: item.count || 0,
          })),
        )
      }

      // Format daily interaction data for line/bar charts
      if (Array.isArray(feedStats.dailyInteractions) && feedStats.dailyInteractions.length) {
        setDailyData(
          feedStats.dailyInteractions.map((item) => ({
            date: item.date,
            Saved: item.saved || 0,
            Reported: item.reported || 0,
            Shared: item.shared || 0,
          })),
        )
      }
    }
  }, [feedStats])

  if (!feedStats) {
    return <SavedFeedsSkeleton />
  }

  // Chart colors
  const interactionColors = ["#6366f1", "#ef4444", "#f59e0b"]
  const sourceColors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"]

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-amber-500/80 to-amber-600 text-white">
        <CardTitle className="flex items-center">
          <Save className="mr-2 h-5 w-5" />
          Feed Interaction Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4 w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Sources
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Trends
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Saved */}
              <div className="bg-primary/5 p-4 rounded-lg shadow-sm group hover:shadow-md hover:bg-primary/10 transition-all">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-all">
                    <Save className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Saved Posts</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {(feedStats.totalSavedPosts || 0).toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
              {/* Reported */}
              <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg shadow-sm group hover:shadow-md hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all">
                <div className="flex items-center">
                  <div className="bg-rose-100 dark:bg-rose-800/30 p-2 rounded-full group-hover:bg-rose-200 dark:group-hover:bg-rose-800/40 transition-all">
                    <Flag className="h-6 w-6 text-rose-500 dark:text-rose-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-rose-700 dark:text-rose-300">Reported Posts</p>
                    <h3 className="text-xl font-bold text-rose-900 dark:text-rose-100">
                      {(feedStats.totalReportedPosts || 0).toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
              {/* Shared */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg shadow-sm group hover:shadow-md hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all">
                <div className="flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 transition-all">
                    <Share2 className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Shared Posts</p>
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      {(feedStats.totalSharedPosts || 0).toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <BarChartComponent data={interactionData} colors={interactionColors} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg shadow-sm group hover:shadow-md hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
                  <h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">Report Rate</h3>
                </div>
                <p className="text-xl font-bold text-orange-900 dark:text-orange-100">{feedStats.reportRate || "0%"}</p>
              </div>
              <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg shadow-sm group hover:shadow-md hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-violet-500 mr-2" />
                  <h3 className="text-sm font-medium text-violet-800 dark:text-violet-300">Share Rate</h3>
                </div>
                <p className="text-xl font-bold text-violet-900 dark:text-violet-100">{feedStats.shareRate || "0%"}</p>
              </div>
            </div>
          </TabsContent>

          {/* SOURCES */}
          <TabsContent value="sources" className="animate-fadeIn">
            <div className="h-80">
              <PieChartComponent data={sourceData} colors={sourceColors} />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Source Distribution
              </h4>
              {/* <ScrollArea className="h-40">
                <div className="space-y-2">
                  {sourceData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                      <span className="text-sm font-medium text-primary">{item.value.toLocaleString()} posts</span>
                    </div>
                  ))}
                </div>
              </ScrollArea> */}
              <ScrollArea className="h-full max-h-40 overflow-auto">
  <div className="space-y-2">
    {sourceData.map((item, idx) => (
      <div
        key={idx}
        className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {item.name}
        </span>
        <span className="text-sm font-medium text-primary">
          {item.value.toLocaleString()} posts
        </span>
      </div>
    ))}
  </div>
</ScrollArea>

            </div>
          </TabsContent>

          {/* TRENDS */}
          <TabsContent value="trends" className="animate-fadeIn">
            <div className="h-80">
              <LineChartComponent data={dailyData} keys={["Saved", "Reported", "Shared"]} colors={interactionColors} />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Daily Interaction Trends
              </h4>
              <ScrollArea className="h-40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2 text-gray-600 dark:text-gray-300">Date</th>
                      <th className="text-right py-2 text-primary">Saved</th>
                      <th className="text-right py-2 text-rose-500">Reported</th>
                      <th className="text-right py-2 text-amber-500">Shared</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyData.map((item, idx) => (
                      <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-2 text-gray-700 dark:text-gray-300">{item.date}</td>
                        <td className="text-right py-2 text-primary">{item.Saved}</td>
                        <td className="text-right py-2 text-rose-500">{item.Reported}</td>
                        <td className="text-right py-2 text-amber-500">{item.Shared}</td>
                        <td className="text-right py-2 font-medium text-gray-700 dark:text-gray-300">
                          {(item.Saved || 0) + (item.Reported || 0) + (item.Shared || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const SavedFeedsSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        <div className="flex items-center">
          <Skeleton className="h-5 w-5 mr-2 rounded-full" />
          <Skeleton className="h-5 w-48" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2 mb-4">
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-3 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Skeleton className="h-64 w-full mt-4 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SavedFeeds
