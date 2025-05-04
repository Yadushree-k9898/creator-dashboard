// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Coins, TrendingUp, Users, Clock } from "lucide-react"

// const CreditStatsCard = ({ creditStats }) => {
//   if (!creditStats) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Credit Statistics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-4">No credit statistics available</div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Coins className="mr-2 h-5 w-5" />
//           Platform Credit Statistics
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <Coins className="h-8 w-8 text-blue-500 mr-3" />
//               <div>
//                 <p className="text-sm font-medium text-blue-600">Total Platform Credits</p>
//                 <h3 className="text-2xl font-bold text-blue-900">
//                   {creditStats.totalPlatformCredits.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <Clock className="h-8 w-8 text-green-500 mr-3" />
//               <div>
//                 <p className="text-sm font-medium text-green-600">Login Points</p>
//                 <h3 className="text-2xl font-bold text-green-900">{creditStats.totalLoginPoints.toLocaleString()}</h3>
//               </div>
//             </div>
//           </div>

//           <div className="bg-purple-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <Users className="h-8 w-8 text-purple-500 mr-3" />
//               <div>
//                 <p className="text-sm font-medium text-purple-600">Profile Points</p>
//                 <h3 className="text-2xl font-bold text-purple-900">
//                   {creditStats.totalProfilePoints.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="bg-indigo-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <TrendingUp className="h-8 w-8 text-indigo-500 mr-3" />
//               <div>
//                 <p className="text-sm font-medium text-indigo-600">Interaction Points</p>
//                 <h3 className="text-2xl font-bold text-indigo-900">
//                   {creditStats.totalInteractionPoints.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h4 className="text-sm font-medium mb-2">Credit Distribution by Action</h4>
//           <div className="space-y-2">
//             {creditStats.creditsByActionType?.map((item, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <span className="text-sm">{item.action}</span>
//                 <div className="flex items-center">
//                   <span className="text-sm font-medium">{item.totalPoints.toLocaleString()}</span>
//                   <span className="text-xs text-gray-500 ml-2">({item.count} actions)</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default CreditStatsCard


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, TrendingUp, Users, Clock } from 'lucide-react'

const CreditStatsCard = ({ creditStats }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!creditStats) {
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
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
            <Coins className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>No credit statistics available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`transition-all duration-500 shadow-md hover:shadow-lg transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2 h-5 w-5 text-primary" />
          Platform Credit Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3 transition-transform duration-300 hover:scale-110">
                <Coins className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Platform Credits</p>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  {creditStats.totalPlatformCredits.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3 transition-transform duration-300 hover:scale-110">
                <Clock className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Login Points</p>
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-300">
                  {creditStats.totalLoginPoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-3 transition-transform duration-300 hover:scale-110">
                <Users className="h-8 w-8 text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Profile Points</p>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                  {creditStats.totalProfilePoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3 transition-transform duration-300 hover:scale-110">
                <TrendingUp className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Interaction Points</p>
                <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300">
                  {creditStats.totalInteractionPoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md animate-fadeIn">
          <h4 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300 relative inline-block after:content-[''] after:absolute after:w-1/3 after:h-1 after:bg-primary/30 after:left-0 after:bottom-0">
            Credit Distribution by Action
          </h4>
          <div className="space-y-3">
            {creditStats.creditsByActionType?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded-md transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.action}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-primary">{item.totalPoints.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({item.count} actions)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreditStatsCard
