// import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
// import { ScrollArea } from "../../ui/scroll-area"
// import { Badge } from "../../ui/badge"
// import { Clock, User, Shield, AlertCircle, Share2, Bookmark } from "lucide-react"

// const RecentActivity = ({ activities, fullHeight = false }) => {
//   if (!activities || activities.length === 0) {
//     return (
//       <Card className={fullHeight ? "h-[600px]" : "h-full"}>
//         <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white">
//           <CardTitle className="flex items-center">
//             <Clock className="mr-2 h-5 w-5" />
//             Recent Platform Activity
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex items-center justify-center h-[400px]">
//           <div className="text-center py-4 text-gray-500 dark:text-gray-400">
//             <Clock className="h-12 w-12 mx-auto mb-3 opacity-30" />
//             <p className="text-lg font-medium">No recent activities</p>
//             <p className="text-sm">Activity will appear here as users interact with the platform</p>
//           </div>
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

//   // Format relative time
//   const formatRelativeTime = (dateString) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffInSeconds = Math.floor((now - date) / 1000)

//     if (diffInSeconds < 60) return "just now"
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
//     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
//     return formatDate(dateString)
//   }

//   // Get icon based on activity type
//   const getActivityIcon = (activity) => {
//     const type = activity.type || activity.action.toLowerCase()

//     if (type.includes("report")) return <AlertCircle className="h-5 w-5 text-rose-500" />
//     if (type.includes("share")) return <Share2 className="h-5 w-5 text-amber-500" />
//     if (type.includes("save")) return <Bookmark className="h-5 w-5 text-primary" />

//     return activity.user.role === "Admin" ? (
//       <Shield className="h-5 w-5 text-violet-500" />
//     ) : (
//       <User className="h-5 w-5 text-primary" />
//     )
//   }

//   return (
//     <Card className={`shadow-md hover:shadow-lg transition-all duration-300 ${fullHeight ? "h-[600px]" : "h-full"}`}>
//       <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white">
//         <CardTitle className="flex items-center">
//           <Clock className="mr-2 h-5 w-5" />
//           Recent Platform Activity
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ScrollArea className={fullHeight ? "h-[540px]" : "h-[400px]"}>
//           <div className="p-4 space-y-3">
//             {activities.map((activity) => (
//               <div
//                 key={activity.id}
//                 className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-gray-750 group"
//               >
//                 <div className="flex-shrink-0 mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-full group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300">
//                   {getActivityIcon(activity)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100">
//                         {activity.user.name}
//                         <Badge
//                           variant={activity.user.role === "Admin" ? "default" : "outline"}
//                           className={`text-xs ${activity.user.role === "Admin" ? "bg-violet-500 hover:bg-violet-600" : ""}`}
//                         >
//                           {activity.user.role}
//                         </Badge>
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user.email}</p>
//                     </div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                       {formatRelativeTime(activity.createdAt)}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-700 dark:text-gray-200 mt-1 font-medium">{activity.action}</p>
//                   <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{activity.details}</p>
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


import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { ScrollArea } from "../../ui/scroll-area"
import { Badge } from "../../ui/badge"
import { Clock, User, Shield, AlertCircle, Share2, Bookmark } from "lucide-react"

const RecentActivity = ({ activities, fullHeight = false }) => {
  if (!activities || activities.length === 0) {
    return (
      <Card className={fullHeight ? "h-[600px]" : "h-full"}>
        <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white">
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Recent Platform Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No recent activities</p>
            <p className="text-sm">Activity will appear here as users interact with the platform</p>
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

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return formatDate(dateString)
  }

  // Get icon based on activity type
  const getActivityIcon = (activity) => {
    const type = activity.type || (activity.action ? activity.action.toLowerCase() : "")

    if (type.includes("report")) return <AlertCircle className="h-5 w-5 text-rose-500" />
    if (type.includes("share")) return <Share2 className="h-5 w-5 text-amber-500" />
    if (type.includes("save")) return <Bookmark className="h-5 w-5 text-primary" />

    return activity.user && activity.user.role === "Admin" ? (
      <Shield className="h-5 w-5 text-violet-500" />
    ) : (
      <User className="h-5 w-5 text-primary" />
    )
  }

  return (
    <Card className={`shadow-md hover:shadow-lg transition-all duration-300 ${fullHeight ? "h-[600px]" : "h-full"}`}>
      <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Recent Platform Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={fullHeight ? "h-[540px]" : "h-[400px]"}>
          <div className="p-4 space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id || `activity-${Math.random()}`}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-gray-750 group"
              >
                <div className="flex-shrink-0 mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-full group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-300">
                  {getActivityIcon(activity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      {activity.user && (
                        <>
                          <p className="text-sm font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            {activity.user.name}
                            <Badge
                              variant={activity.user.role === "Admin" ? "default" : "outline"}
                              className={`text-xs ${activity.user.role === "Admin" ? "bg-violet-500 hover:bg-violet-600" : ""}`}
                            >
                              {activity.user.role}
                            </Badge>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user.email}</p>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {activity.createdAt ? formatRelativeTime(activity.createdAt) : "N/A"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-200 mt-1 font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{activity.details}</p>
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
