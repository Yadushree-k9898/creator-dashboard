import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Save, Share2, Flag, User, LogIn } from "lucide-react";
import { ActivityItem } from "./StatComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserActivityLogs } from "@/redux/slices/userSlice";
import { formatTimeAgo } from "../../../utils/formatDate"; 

const UserRecentActivity = () => {
  const dispatch = useDispatch();
  const { recentActivity, loading } = useSelector((state) => ({
    recentActivity: state.user.recentActivity,
    loading: state.user.loading,
  }));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUserActivityLogs());

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const getActivityIcon = (action) => {
    const trimmedAction = action.trim();
    switch (trimmedAction) {
      case "Logged in":
        return <LogIn className="h-4 w-4" />;
      case "Completed profile":
        return <User className="h-4 w-4" />;
      case "Saved a post":
        return <Save className="h-4 w-4" />;
      case "Shared a post":
        return <Share2 className="h-4 w-4" />;
      case "Reported a post":
        return <Flag className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card
      className={`h-full transition-all duration-500 shadow-md hover:shadow-lg transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {loading ? (
          <div className="space-y-2 flex-grow flex flex-col justify-center items-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-full animate-pulse" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-full overflow-y-auto pr-2">
            <div className="space-y-2 animate-fadeIn">
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => {
                  // Log the activity createdAt to check its value
                  console.log("Activity Date:", activity.createdAt);

                  // Ensure the date is valid
                  const timestamp = new Date(activity.createdAt);
                  const formattedTimestamp = isNaN(timestamp.getTime()) ? "Invalid date" : formatTimeAgo(timestamp);

                  return (
                    <ActivityItem
                      key={index}
                      action={activity.action}
                      details={activity.details}
                      timestamp={formattedTimestamp}
                      icon={getActivityIcon(activity.action)}
                    />
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No recent activity found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRecentActivity;
