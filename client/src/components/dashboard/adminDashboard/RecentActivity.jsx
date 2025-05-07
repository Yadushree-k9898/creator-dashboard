import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLogs } from "../../../redux/slices/adminSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { Badge } from "../../ui/badge";
import { Clock, User, Shield, AlertCircle, Share2, Bookmark, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";

const RecentActivity = ({ fullHeight = false }) => {
  const dispatch = useDispatch();
  const { activityLogs, loading, error, logPagination } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchActivityLogs({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchActivityLogs({ page: 1, limit: 10 }));
  };

  const renderLoading = () => (
    <Card className={`${fullHeight ? "h-96" : "h-full"} border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white py-4 px-6 flex justify-between items-center">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Clock className="mr-3 h-5 w-5" />
          Recent Platform Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-80 p-6">
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <div className="animate-spin mb-4">
            <RefreshCw className="h-12 w-12 mx-auto opacity-60 text-violet-500" />
          </div>
          <p className="text-lg font-medium mb-2">Loading activities...</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderError = () => (
    <Card className={`${fullHeight ? "h-96" : "h-full"} border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white py-4 px-6 flex justify-between items-center">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Clock className="mr-3 h-5 w-5" />
          Recent Platform Activity
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-white hover:bg-violet-600/50" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Retry
        </Button>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-80 p-6">
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-rose-500" />
          <p className="text-lg font-medium mb-2">Error loading activities</p>
          <p className="text-sm max-w-md mx-auto">{error || "Something went wrong."}</p>
          <Button variant="outline" size="sm" className="mt-4 text-violet-600 hover:text-violet-700 border-violet-300 hover:border-violet-400" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderEmpty = () => (
    <Card className={`${fullHeight ? "h-96" : "h-full"} border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md transition-all duration-300`}>
      <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white py-4 px-6 flex justify-between items-center">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Clock className="mr-3 h-5 w-5" />
          Recent Platform Activity
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-white hover:bg-violet-600/50" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-80 p-6">
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium mb-2">No recent activities</p>
          <p className="text-sm max-w-md mx-auto">Activity will appear here as users interact with the platform</p>
        </div>
      </CardContent>
    </Card>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const getActivityIcon = (type) => {
    if (type?.includes("report")) return <AlertCircle className="h-5 w-5 text-rose-500" />;
    if (type?.includes("share")) return <Share2 className="h-5 w-5 text-amber-500" />;
    if (type?.includes("save")) return <Bookmark className="h-5 w-5 text-primary" />;
    if (type?.includes("admin")) return <Shield className="h-5 w-5 text-violet-500" />;
    return <User className="h-5 w-5 text-primary" />;
  };

  if (loading) return renderLoading();
  if (error) return renderError();
  if (!activityLogs || activityLogs.length === 0) return renderEmpty();

  return (
    <Card className={`shadow-md hover:shadow-lg transition-all duration-300 ${fullHeight ? "h-96" : "h-full"} border border-gray-200 dark:border-gray-700 overflow-hidden`}>
      <CardHeader className="bg-gradient-to-r from-violet-500/80 to-violet-600 text-white py-4 px-6 flex justify-between items-center">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Clock className="mr-3 h-5 w-5" />
          Recent Platform Activity
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-white hover:bg-violet-600/50" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={fullHeight ? "h-80" : "h-80"}>
          <div className="p-4 space-y-3">
            {activityLogs.map((activity) => (
              <div
                key={activity._id || `activity-${activity.createdAt}`}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-gray-750 group"
              >
                <div className="flex-shrink-0 mt-1 bg-violet-100 dark:bg-violet-900/30 p-2.5 rounded-full group-hover:bg-violet-200 dark:group-hover:bg-violet-800/40 transition-colors duration-300">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <p className="text-sm font-medium flex flex-wrap items-center gap-2 text-gray-900 dark:text-gray-100">
                        {activity.user?.name || "Unknown User"}
                        {activity.user?.role && (
                          <Badge
                            variant={activity.user.role === "Admin" ? "default" : "outline"}
                            className={`text-xs ${activity.user.role === "Admin" ? "bg-violet-500 hover:bg-violet-600" : ""}`}
                          >
                            {activity.user.role}
                          </Badge>
                        )}
                      </p>
                      {activity.user?.email && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.user.email}</p>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 sm:mt-0 inline-block">
                      {formatRelativeTime(activity.createdAt)}
                    </span>
                  </div>
                  <div className="mt-2.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{activity.description}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;