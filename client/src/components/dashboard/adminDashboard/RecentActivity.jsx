// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Clock, User, Shield } from "lucide-react"

// const RecentActivity = ({ activities }) => {
//   if (!activities || activities.length === 0) {
//     return (
//       <Card className="h-full">
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-4">No recent activities</div>
//         </CardContent>
//       </Card>
//     )
//   }

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   return (
//     <Card className="h-full">
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Clock className="mr-2 h-5 w-5" />
//           Recent Platform Activity
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[400px] pr-4">
//           <div className="space-y-4">
//             {activities.map((activity) => (
//               <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
//                 <div className="flex-shrink-0 mt-1">
//                   {activity.user.role === "Admin" ? (
//                     <Shield className="h-5 w-5 text-purple-500" />
//                   ) : (
//                     <User className="h-5 w-5 text-blue-500" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between">
//                     <p className="text-sm font-medium">
//                       {activity.user.name} <span className="text-xs text-gray-500">({activity.user.email})</span>
//                     </p>
//                     <span className="text-xs text-gray-500">{formatDate(activity.createdAt)}</span>
//                   </div>
//                   <p className="text-sm text-gray-600">{activity.action}</p>
//                   <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }

// export default RecentActivity


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, User, Shield, Calendar } from 'lucide-react'

const RecentActivity = ({ activities }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  if (!activities || activities.length === 0) {
    return (
      <Card
        className={`h-full transition-all duration-500 shadow-md hover:shadow-lg transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>No recent activities</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card
      className={`h-full transition-all duration-500 shadow-md hover:shadow-lg transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Recent Platform Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3 animate-fadeIn">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:translate-y-[-2px] hover:shadow-sm"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-shrink-0 mt-1">
                  {activity.user.role === "Admin" ? (
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full transition-transform duration-300 hover:scale-110">
                      <Shield className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                    </div>
                  ) : (
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full transition-transform duration-300 hover:scale-110">
                      <User className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user.name}{" "}
                      <span className="text-xs text-gray-500 dark:text-gray-400">({activity.user.email})</span>
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(activity.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default RecentActivity
