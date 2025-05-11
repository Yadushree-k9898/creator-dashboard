import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLogs } from "../../../redux/slices/adminSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { Clock, Save, Share2, Flag, User, LogIn, RefreshCw } from 'lucide-react';
import { Button } from "../../ui/button";
import { formatDate } from "../../../utils/formatDate";

const RecentActivity = ({ fullHeight = false }) => {
  const dispatch = useDispatch();
  const { activityLogs, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchActivityLogs({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchActivityLogs({ page: 1, limit: 10 }));
  };

  const getActivityIcon = (action) => {
    const trimmedAction = action.trim().toUpperCase();
    switch (trimmedAction) {
      case "LOGIN":
        return <LogIn className="h-4 w-4" />;
      case "PROFILE_COMPLETION":
        return <User className="h-4 w-4" />;
      case "SAVED_POST":
        return <Save className="h-4 w-4" />;
      case "SHARED_POST":
        return <Share2 className="h-4 w-4" />;
      case "REPORTED_POST":
        return <Flag className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card className={`shadow-md ${fullHeight ? "h-[600px]" : "h-[400px]"} border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col`}>
        <CardHeader className="bg-gradient-to-r from-violet-500 to-violet-600 text-white py-3 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <Clock className="mr-2 h-5 w-5" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" disabled>
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
            Loading...
          </Button>
        </CardHeader>
        <CardContent className="p-3 flex-1 flex items-center justify-center">
          <div className="w-full space-y-3">
            {[...Array(5)].map((_, index) => (
              <div 
                key={index} 
                className="flex items-start p-2 rounded-lg animate-pulse bg-gray-100 dark:bg-gray-800"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="ml-3 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`shadow-md ${fullHeight ? "h-[600px]" : "h-[400px]"} border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col`}>
        <CardHeader className="bg-gradient-to-r from-violet-500 to-violet-600 text-white py-3 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <Clock className="mr-2 h-5 w-5" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Retry
          </Button>
        </CardHeader>
        <CardContent className="p-3 flex-1 flex items-center justify-center">
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-md border border-red-100 dark:border-red-900/20 text-red-800 dark:text-red-400 text-center">
            <p className="font-medium mb-2">Error loading activities</p>
            <p className="text-sm">{error?.message || "Please try again later"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`shadow-md ${fullHeight ? "h-[600px]" : "h-[400px]"} border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col`}>
      <CardHeader className="bg-gradient-to-r from-violet-500 to-violet-600 text-white py-3 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Clock className="mr-2 h-5 w-5" />
          Recent Activity
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          className="text-white hover:bg-white/20 transition-all duration-200"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            {activityLogs?.length > 0 ? (
              activityLogs.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-start p-3 mb-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-750 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 p-2 rounded-full bg-violet-100 dark:bg-violet-900/30 group-hover:bg-violet-200 dark:group-hover:bg-violet-900/50 transition-colors">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {activity.user?.name || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {activity.action?.replace(/_/g, ' ') || 'Activity'}
                    </p>
                    {activity.details && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
                        {activity.details}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                      {formatDate(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
                <Clock className="h-12 w-12 mb-3 text-gray-300 dark:text-gray-600" />
                <p>No activity logs found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;