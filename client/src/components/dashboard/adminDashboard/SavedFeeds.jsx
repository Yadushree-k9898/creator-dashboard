import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, PieChart } from "@tremor/react"
import { Save, Share2, Flag } from "lucide-react"

const SavedFeeds = ({ feedStats }) => {
  if (!feedStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Feed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">No feed statistics available</div>
        </CardContent>
      </Card>
    )
  }

  // Format data for charts
  const interactionData = [
    {
      name: "Saved Posts",
      value: feedStats.totalSavedPosts,
    },
    {
      name: "Reported Posts",
      value: feedStats.totalReportedPosts,
    },
    {
      name: "Shared Posts",
      value: feedStats.totalSharedPosts,
    },
  ]

  const sourceData = feedStats.postSourceDistribution.map((item) => ({
    name: item._id || "Unknown",
    value: item.count,
  }))

  const dailyData = feedStats.dailyInteractions.map((item) => ({
    date: item.date,
    Saved: item.saved,
    Reported: item.reported,
    Shared: item.shared,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Save className="mr-2 h-5 w-5" />
          Feed Interaction Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Save className="h-6 w-6 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-600">Saved Posts</p>
                    <h3 className="text-xl font-bold text-blue-900">{feedStats.totalSavedPosts.toLocaleString()}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Flag className="h-6 w-6 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Reported Posts</p>
                    <h3 className="text-xl font-bold text-red-900">{feedStats.totalReportedPosts.toLocaleString()}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Share2 className="h-6 w-6 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-600">Shared Posts</p>
                    <h3 className="text-xl font-bold text-green-900">{feedStats.totalSharedPosts.toLocaleString()}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <BarChart
                data={interactionData}
                index="name"
                categories={["value"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value.toLocaleString()}`}
                yAxisWidth={48}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800">Report Rate</h3>
                <p className="text-xl font-bold text-yellow-900">{feedStats.reportRate}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Share Rate</h3>
                <p className="text-xl font-bold text-purple-900">{feedStats.shareRate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sources">
            <div className="h-80">
              <PieChart
                data={sourceData}
                index="name"
                category="value"
                valueFormatter={(value) => `${value.toLocaleString()} posts`}
                colors={["blue", "cyan", "indigo", "violet", "purple"]}
              />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Source Distribution</h4>
              <ScrollArea className="h-40">
                <div className="space-y-2">
                  {sourceData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">{item.value.toLocaleString()} posts</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <div className="h-80">
              <BarChart
                data={dailyData}
                index="date"
                categories={["Saved", "Reported", "Shared"]}
                colors={["blue", "red", "green"]}
                stack={true}
                valueFormatter={(value) => `${value.toLocaleString()}`}
                yAxisWidth={48}
              />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Daily Interaction Trends</h4>
              <ScrollArea className="h-40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Date</th>
                      <th className="text-right py-2">Saved</th>
                      <th className="text-right py-2">Reported</th>
                      <th className="text-right py-2">Shared</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2">{item.date}</td>
                        <td className="text-right py-2">{item.Saved}</td>
                        <td className="text-right py-2">{item.Reported}</td>
                        <td className="text-right py-2">{item.Shared}</td>
                        <td className="text-right py-2 font-medium">{item.Saved + item.Reported + item.Shared}</td>
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

export default SavedFeeds
