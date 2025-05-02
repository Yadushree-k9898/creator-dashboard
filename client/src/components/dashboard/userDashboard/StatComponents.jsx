import { Card } from "@/components/ui/card"

// Generic stat card component that can be reused across the dashboard
export const StatCard = ({ title, value, icon, description, className = "" }) => {
  return (
    <Card className={`p-4 flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold">{value}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    </Card>
  )
}

// Progress bar component for showing completion percentages
export const ProgressBar = ({ value, max, label, className = "" }) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
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
    <div className="flex items-start space-x-3 py-3">
      {icon && <div className="mt-0.5 text-gray-400">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{action}</p>
        <p className="text-xs text-gray-500 truncate">{details}</p>
      </div>
      <div className="text-xs text-gray-400">{formatDate(timestamp)}</div>
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
    <Card className="p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium truncate">{title}</h3>
        <div className="flex space-x-1">
          {isShared && <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Shared</span>}
          {isReported && <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">Reported</span>}
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2 truncate">{content}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">{source}</span>
        <span className="text-xs text-gray-400">{formatDate(timestamp)}</span>
      </div>
    </Card>
  )
}
