import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Save, Share2, Flag, User, LogIn } from 'lucide-react';
import { ActivityItem } from "./StatComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserActivityLogs } from "@/redux/slices/userSlice";

const UserRecentActivity = () => {
  const dispatch = useDispatch();
  const { recentActivity, loading, error } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUserActivityLogs());

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const getActivityIcon = (action) => {
    const trimmedAction = action?.trim()?.toUpperCase() || "";
    
    switch (trimmedAction) {
      case "LOGIN":
        return <LogIn className="h-4 w-4" />;
      case "PROFILE_COMPLETION":
      case "PROFILE_UPDATE":
        return <User className="h-4 w-4" />;
      case "SAVED_POST":
      case "SAVE_POST":
        return <Save className="h-4 w-4" />;
      case "SHARED_POST":
      case "SHARE_POST":
        return <Share2 className="h-4 w-4" />;
      case "REPORTED_POST":
      case "REPORT_POST":
        return <Flag className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid date";
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (error) {
    return (
      <Card className="h-full transition-all duration-300 shadow-md hover:shadow-lg">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 py-3">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <Clock className="mr-2 h-5 w-5 text-rose-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-md border border-red-100 dark:border-red-900/20 text-red-800 dark:text-red-400">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`h-full transition-all duration-500 shadow-md hover:shadow-lg transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 py-3">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 flex flex-col h-[calc(100%-60px)] min-h-[300px]">
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
          <ScrollArea className="h-full pr-2">
            <div className="space-y-2 animate-fadeIn">
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                        {getActivityIcon(activity.action)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {activity.action?.replace(/_/g, ' ') || 'Activity'}
                        </p>
                        {activity.details && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {activity.details}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
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