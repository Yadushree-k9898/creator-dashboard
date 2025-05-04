// import { Card } from "@/components/ui/card"

// // Generic stat card component that can be reused across the dashboard
// export const StatCard = ({ title, value, icon, description, className = "" }) => {
//   return (
//     <Card className={`p-4 flex flex-col h-full ${className}`}>
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//         {icon && <div className="text-gray-400">{icon}</div>}
//       </div>
//       <div className="flex-1">
//         <p className="text-2xl font-bold">{value}</p>
//         {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
//       </div>
//     </Card>
//   )
// }

// // Progress bar component for showing completion percentages
// export const ProgressBar = ({ value, max, label, className = "" }) => {
//   const percentage = Math.min(Math.round((value / max) * 100), 100)

//   return (
//     <div className={`w-full ${className}`}>
//       {label && (
//         <div className="flex justify-between mb-1">
//           <span className="text-sm font-medium">{label}</span>
//           <span className="text-sm font-medium">{percentage}%</span>
//         </div>
//       )}
//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
//       </div>
//     </div>
//   )
// }

// // Activity item component for recent activity list
// export const ActivityItem = ({ action, details, timestamp, icon }) => {
//   // Format the timestamp
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
//     <div className="flex items-start space-x-3 py-3">
//       {icon && <div className="mt-0.5 text-gray-400">{icon}</div>}
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-medium">{action}</p>
//         <p className="text-xs text-gray-500 truncate">{details}</p>
//       </div>
//       <div className="text-xs text-gray-400">{formatDate(timestamp)}</div>
//     </div>
//   )
// }

// // Post item component for saved posts list
// export const PostItem = ({ title, source, url, content, isReported, isShared, timestamp }) => {
//   // Format the timestamp
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     })
//   }

//   return (
//     <Card className="p-4 mb-3">
//       <div className="flex justify-between items-start mb-2">
//         <h3 className="text-sm font-medium truncate">{title}</h3>
//         <div className="flex space-x-1">
//           {isShared && <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Shared</span>}
//           {isReported && <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">Reported</span>}
//         </div>
//       </div>
//       <p className="text-xs text-gray-500 mb-2 truncate">{content}</p>
//       <div className="flex justify-between items-center">
//         <span className="text-xs font-medium text-gray-500">{source}</span>
//         <span className="text-xs text-gray-400">{formatDate(timestamp)}</span>
//       </div>
//     </Card>
//   )
// }


import { Card } from "@/components/ui/card"

// Generic stat card component that can be reused across the dashboard
export const StatCard = ({ title, value, icon, description, className = "" }) => {
  return (
    <Card
      className={`p-5 flex flex-col h-full transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-lg bg-white dark:bg-gray-800 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {icon && <div className="text-primary transform transition-transform duration-300 hover:scale-110">{icon}</div>}
      </div>
      <div className="flex-1">
        <p className="text-3xl font-bold text-gray-900 dark:text-white animate-fadeIn">{value}</p>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{description}</p>}
      </div>
    </Card>
  )
}

// Progress bar component for showing completion percentages
export const ProgressBar = ({ value, max, label, className = "" }) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div className={`w-full ${className} transition-all duration-300 transform hover:translate-x-1`}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-sm font-medium text-primary">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

// Activity item component for recent activity list
export const ActivityItem = ({ action, details, timestamp, icon }) => {
  // Format the timestamp
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
    <div className="flex items-start space-x-3 py-3 px-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
      {icon && (
        <div className="mt-0.5 text-primary bg-primary/10 p-2 rounded-full transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{details}</p>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{formatDate(timestamp)}</div>
    </div>
  )
}

// Post item component for saved posts list
export const PostItem = ({ title, source, url, content, isReported, isShared, timestamp }) => {
  // Format the timestamp
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="p-4 mb-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium truncate text-gray-900 dark:text-white">{title}</h3>
        <div className="flex space-x-1">
          {isShared && (
            <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full animate-fadeIn">
              Shared
            </span>
          )}
          {isReported && (
            <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full animate-fadeIn">
              Reported
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{content}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{source}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(timestamp)}</span>
      </div>
    </Card>
  )
}
