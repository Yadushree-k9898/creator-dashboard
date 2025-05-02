import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Save, Share2, Flag, User, LogIn } from "lucide-react"
import { ActivityItem } from "./StatComponents"
import { useCredits } from "@/hooks/useCredits"

const UserRecentActivity = () => {
  const { recentActivity, loading } = useCredits()

  // Function to get the appropriate icon for each activity type
  const getActivityIcon = (action) => {
    switch (action) {
      case "Logged in":
        return <LogIn className="h-4 w-4" />
      case "Completed profile":
        return <User className="h-4 w-4" />
      case "Saved a post":
        return <Save className="h-4 w-4" />
      case "Shared a post":
        return <Share2 className="h-4 w-4" />
      case "Reported a post":
        return <Flag className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start space-x-3 py-3">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="w-16 h-3 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[350px]">
            <div className="space-y-1">
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    action={activity.action}
                    details={activity.details}
                    timestamp={activity.createdAt}
                    icon={getActivityIcon(activity.action)}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">No recent activity found</p>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default UserRecentActivity
