// src/pages/Dashboard/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  User, 
  CreditCard, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  BarChart4,
  Activity
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // assuming your slice uses 'user'
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]); // Initialize as empty array
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'User') {
      // If not a regular user, redirect to admin dashboard or home
      navigate(user.role === 'Admin' ? '/admin/dashboard' : '/');
    } else {
      fetchUserProfile();
      fetchUserActivity();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProfile(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const fetchUserActivity = async () => {
    try {
      const { data } = await axios.get('/api/users/activity-log', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (Array.isArray(data)) {
        setActivityLogs(data);
      } else {
        setActivityLogs([]); // If the response is not an array, set it to empty
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, {profile.name}</h2>
          <p className="text-muted-foreground">Here's what's happening with your account today.</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {profile.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Profile Summary
            </CardTitle>
            <CardDescription>
              Your personal information and account status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Name</span>
              </div>
              <span className="font-medium">{profile.name}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Credits</span>
              </div>
              <span className="font-medium">{profile.credits}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                {profile.profileCompleted ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-muted-foreground">Profile Completed</span>
              </div>
              <Badge 
                variant={profile.profileCompleted ? "success" : "outline"}
                className={profile.profileCompleted ? 
                  "bg-green-100 text-green-800 hover:bg-green-200 border-green-200" : 
                  "bg-red-100 text-red-800 hover:bg-red-200 border-red-200"}
              >
                {profile.profileCompleted ? 'Yes' : 'No'}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Login</span>
              </div>
              <span className="font-medium">{formatDate(profile.lastLogin)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-primary" /> Account Stats
            </CardTitle>
            <CardDescription>
              Overview of your account activity and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center text-center h-full py-4">
                    <CreditCard className="h-8 w-8 text-primary mb-2" />
                    <div className="text-2xl font-bold">{profile.credits}</div>
                    <p className="text-xs text-muted-foreground">Total Credits</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center text-center h-full py-4">
                    <Activity className="h-8 w-8 text-primary mb-2" />
                    <div className="text-2xl font-bold">{activityLogs.length}</div>
                    <p className="text-xs text-muted-foreground">Activities</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Account Status</h4>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${profile.profileCompleted ? '100%' : '50%'}` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Basic</span>
                <span>Advanced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Activity className="h-4 w-4" /> Recent Activity
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <User className="h-4 w-4" /> Profile Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Activity Timeline
              </CardTitle>
              <CardDescription>
                Your recent actions and interactions on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activityLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No activity found. Start interacting with the platform to see your activities here.
                </div>
              ) : (
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <div key={log._id} className="flex gap-4 items-start">
                        <div className="mt-1">
                          <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-1 border-b pb-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{log.action}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(log.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>View and manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Email Address</h4>
                    <p className="text-sm text-muted-foreground break-all">{profile.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Role</h4>
                    <p className="text-sm text-muted-foreground">{profile.role}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Account Created</h4>
                    <p className="text-sm text-muted-foreground">{profile.createdAt ? formatDate(profile.createdAt) : 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Account Status</h4>
                    <Badge 
                      variant={profile.profileCompleted ? "success" : "outline"}
                      className={profile.profileCompleted ? 
                        "bg-green-100 text-green-800 hover:bg-green-200 border-green-200" : 
                        "bg-red-100 text-red-800 hover:bg-red-200 border-red-200"}
                    >
                      {profile.profileCompleted ? 'Complete' : 'Incomplete'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;