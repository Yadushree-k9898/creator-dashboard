// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { BarChart, PieChart } from "@tremor/react"
// import { Save, Share2, Flag } from "lucide-react"

// const SavedFeeds = ({ feedStats }) => {
//   if (!feedStats) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Feed Statistics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-4">No feed statistics available</div>
//         </CardContent>
//       </Card>
//     )
//   }

//   // Format data for charts
//   const interactionData = [
//     {
//       name: "Saved Posts",
//       value: feedStats.totalSavedPosts,
//     },
//     {
//       name: "Reported Posts",
//       value: feedStats.totalReportedPosts,
//     },
//     {
//       name: "Shared Posts",
//       value: feedStats.totalSharedPosts,
//     },
//   ]

//   const sourceData = feedStats.postSourceDistribution.map((item) => ({
//     name: item._id || "Unknown",
//     value: item.count,
//   }))

//   const dailyData = feedStats.dailyInteractions.map((item) => ({
//     date: item.date,
//     Saved: item.saved,
//     Reported: item.reported,
//     Shared: item.shared,
//   }))

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Save className="mr-2 h-5 w-5" />
//           Feed Interaction Statistics
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="overview">
//           <TabsList className="mb-4">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="sources">Sources</TabsTrigger>
//             <TabsTrigger value="trends">Trends</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <Save className="h-6 w-6 text-blue-500 mr-2" />
//                   <div>
//                     <p className="text-sm font-medium text-blue-600">Saved Posts</p>
//                     <h3 className="text-xl font-bold text-blue-900">{feedStats.totalSavedPosts.toLocaleString()}</h3>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-red-50 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <Flag className="h-6 w-6 text-red-500 mr-2" />
//                   <div>
//                     <p className="text-sm font-medium text-red-600">Reported Posts</p>
//                     <h3 className="text-xl font-bold text-red-900">{feedStats.totalReportedPosts.toLocaleString()}</h3>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-green-50 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <Share2 className="h-6 w-6 text-green-500 mr-2" />
//                   <div>
//                     <p className="text-sm font-medium text-green-600">Shared Posts</p>
//                     <h3 className="text-xl font-bold text-green-900">{feedStats.totalSharedPosts.toLocaleString()}</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <BarChart
//                 data={interactionData}
//                 index="name"
//                 categories={["value"]}
//                 colors={["blue"]}
//                 valueFormatter={(value) => `${value.toLocaleString()}`}
//                 yAxisWidth={48}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div className="p-4 bg-yellow-50 rounded-lg">
//                 <h3 className="text-sm font-medium text-yellow-800">Report Rate</h3>
//                 <p className="text-xl font-bold text-yellow-900">{feedStats.reportRate}</p>
//               </div>
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <h3 className="text-sm font-medium text-purple-800">Share Rate</h3>
//                 <p className="text-xl font-bold text-purple-900">{feedStats.shareRate}</p>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="sources">
//             <div className="h-80">
//               <PieChart
//                 data={sourceData}
//                 index="name"
//                 category="value"
//                 valueFormatter={(value) => `${value.toLocaleString()} posts`}
//                 colors={["blue", "cyan", "indigo", "violet", "purple"]}
//               />
//             </div>
//             <div className="mt-4">
//               <h4 className="text-sm font-medium mb-2">Source Distribution</h4>
//               <ScrollArea className="h-40">
//                 <div className="space-y-2">
//                   {sourceData.map((item, index) => (
//                     <div key={index} className="flex justify-between items-center">
//                       <span className="text-sm">{item.name}</span>
//                       <span className="text-sm font-medium">{item.value.toLocaleString()} posts</span>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </div>
//           </TabsContent>

//           <TabsContent value="trends">
//             <div className="h-80">
//               <BarChart
//                 data={dailyData}
//                 index="date"
//                 categories={["Saved", "Reported", "Shared"]}
//                 colors={["blue", "red", "green"]}
//                 stack={true}
//                 valueFormatter={(value) => `${value.toLocaleString()}`}
//                 yAxisWidth={48}
//               />
//             </div>
//             <div className="mt-4">
//               <h4 className="text-sm font-medium mb-2">Daily Interaction Trends</h4>
//               <ScrollArea className="h-40">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="text-left py-2">Date</th>
//                       <th className="text-right py-2">Saved</th>
//                       <th className="text-right py-2">Reported</th>
//                       <th className="text-right py-2">Shared</th>
//                       <th className="text-right py-2">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dailyData.map((item, index) => (
//                       <tr key={index} className="border-b hover:bg-gray-50">
//                         <td className="py-2">{item.date}</td>
//                         <td className="text-right py-2">{item.Saved}</td>
//                         <td className="text-right py-2">{item.Reported}</td>
//                         <td className="text-right py-2">{item.Shared}</td>
//                         <td className="text-right py-2 font-medium">{item.Saved + item.Reported + item.Shared}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </ScrollArea>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }

// export default SavedFeeds



"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, PieChart } from "@tremor/react"
import { Save, Share2, Flag, ChevronRight } from 'lucide-react'

const SavedFeeds = ({ feedStats }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!feedStats) {
    return (
      <Card
        className={`transition-all duration-500 shadow-md hover:shadow-lg transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <Save className="mr-2 h-5 w-5 text-primary" />
            Feed Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
            <Save className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>No feed statistics available</p>
          </div>
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
    <Card
      className={`transition-all duration-500 shadow-md hover:shadow-lg transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Save className="mr-2 h-5 w-5 text-primary" />
          Feed Interaction Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="animate-fadeIn">
          <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="sources"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
            >
              Sources
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
            >
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                <div className="flex items-center">
                  <Save className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Saved Posts</p>
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300">
                      {feedStats.totalSavedPosts.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                <div className="flex items-center">
                  <Flag className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Reported Posts</p>
                    <h3 className="text-xl font-bold text-red-900 dark:text-red-300">
                      {feedStats.totalReportedPosts.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                <div className="flex items-center">
                  <Share2 className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Shared Posts</p>
                    <h3 className="text-xl font-bold text-green-900 dark:text-green-300">
                      {feedStats.totalSharedPosts.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <BarChart
                data={interactionData}
                index="name"
                categories={["value"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value.toLocaleString()}`}
                yAxisWidth={48}
                className="h-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Report Rate
                </h3>
                <p className="text-xl font-bold text-yellow-900 dark:text-yellow-300">{feedStats.reportRate}</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-400 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" /> Share Rate
                </h3>
                <p className="text-xl font-bold text-purple-900 dark:text-purple-300">{feedStats.shareRate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="h-80">
                <PieChart
                  data={sourceData}
                  index="name"
                  category="value"
                  valueFormatter={(value) => `${value.toLocaleString()} posts`}
                  colors={["blue", "cyan", "indigo", "violet", "purple"]}
                />
              </div>
            </div>
            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Source Distribution</h4>
              <ScrollArea className="h-40 pr-4">
                <div className="space-y-2">
                  {sourceData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 rounded-md transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.value.toLocaleString()} posts
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
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
            </div>
            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Daily Interaction Trends</h4>
              <ScrollArea className="h-40 pr-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2 text-gray-700 dark:text-gray-300">Date</th>
                      <th className="text-right py-2 text-blue-600 dark:text-blue-400">Saved</th>
                      <th className="text-right py-2 text-red-600 dark:text-red-400">Reported</th>
                      <th className="text-right py-2 text-green-600 dark:text-green-400">Shared</th>
                      <th className="text-right py-2 text-gray-700 dark:text-gray-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="py-2 text-gray-700 dark:text-gray-300">{item.date}</td>
                        <td className="text-right py-2 text-blue-600 dark:text-blue-400">{item.Saved}</td>
                        <td className="text-right py-2 text-red-600 dark:text-red-400">{item.Reported}</td>
                        <td className="text-right py-2 text-green-600 dark:text-green-400">{item.Shared}</td>
                        <td className="text-right py-2 font-medium text-gray-700 dark:text-gray-300">
                          {item.Saved + item.Reported + item.Shared}
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

export default SavedFeeds
