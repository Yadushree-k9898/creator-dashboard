import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLogs } from "../../../redux/slices/adminSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { Badge } from "../../ui/badge";
import { Clock, Save, Share2, Flag, User, LogIn, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";
import {formatDate} from "../../../utils/formatDate";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading activities</div>;

  return (
    <Card className={`shadow-md ${fullHeight ? "h-96" : "h-full"} border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col`}>
      <CardHeader className="bg-gradient-to-r from-violet-500 to-violet-600 text-white py-3 px-4 flex justify-between items-center">
        <CardTitle className="flex items-center text-lg">
          <Clock className="mr-2 h-5 w-5" />
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-3 flex-1">
        <ScrollArea className="flex-1 overflow-auto">
          {activityLogs?.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start p-2 mb-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex-shrink-0 p-2 rounded-full bg-violet-100 dark:bg-violet-900">
                {getActivityIcon(activity.action)}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-semibold truncate">
                  {activity.user?.name || "Unknown User"}
                </p>
                {activity.details && (
                  <p className="text-xs text-gray-500 truncate">
                    {activity.details}
                  </p>
                )}
                <span className="text-xs text-gray-400">
                  {formatDate(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
