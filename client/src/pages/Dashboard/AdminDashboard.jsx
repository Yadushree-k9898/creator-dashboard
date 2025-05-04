// src/pages/Dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  CreditCard, 
  Share2, 
  BookmarkPlus, 
  AlertTriangle, 
  Activity, 
  TrendingUp 
} from 'lucide-react';

const StatCard = ({ title, value, icon, description }) => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Alert>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No dashboard data is currently available.</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Prepare chart data for daily interactions
  const dailyInteractionData = dashboardData.feedStats?.dailyInteractions?.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    saved: item.saved,
    reported: item.reported,
    shared: item.shared
  })) || [];

  const creditsByActionChartData = dashboardData.creditStats?.creditsByActionType?.map(item => ({
    name: item.action,
    points: item.totalPoints
  })) || [];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, admin! Here you can manage users and platform data.</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary">
          Admin Panel
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value={dashboardData.userStats?.totalUsers ?? 0} 
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description={`${dashboardData.userStats?.newUsersLastMonth ?? 0} new in last month`}
        />
        <StatCard 
          title="Platform Credits" 
          value={dashboardData.creditStats?.totalPlatformCredits ?? 0} 
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard 
          title="Active User Rate" 
          value={`${dashboardData.userStats?.activeUserRate ?? 0}%`} 
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          description={`${dashboardData.userStats?.activeUsersLastWeek ?? 0} active last week`}
        />
        <StatCard 
          title="Monthly Growth" 
          value={`${dashboardData.userStats?.monthlyGrowthRate ?? 0}%`} 
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> User Statistics
              </CardTitle>
              <CardDescription>
                Overview of user metrics and demographics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="font-medium">{dashboardData.userStats?.totalUsers ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Admins</span>
                    <span className="font-medium">{dashboardData.userStats?.totalAdmins ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Creators</span>
                    <span className="font-medium">{dashboardData.userStats?.totalCreators ?? 0}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">New Users (Week)</span>
                    <span className="font-medium">{dashboardData.userStats?.newUsersLastWeek ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">New Users (Month)</span>
                    <span className="font-medium">{dashboardData.userStats?.newUsersLastMonth ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Growth Rate</span>
                    <span className="font-medium">{dashboardData.userStats?.monthlyGrowthRate ?? 0}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Completed Profiles</span>
                    <span className="font-medium">{dashboardData.userStats?.usersWithCompletedProfiles ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profile Completion Rate</span>
                    <span className="font-medium">{dashboardData.userStats?.profileCompletionRate ?? 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Users (Week)</span>
                    <span className="font-medium">{dashboardData.userStats?.activeUsersLastWeek ?? 0}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Users by Credits</CardTitle>
              <CardDescription>Users with the highest credit balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Credits</div>
                  <div className="col-span-3">Last Login</div>
                  <div className="col-span-1">Profile</div>
                </div>
                <div className="divide-y">
                  {dashboardData.topUsers?.map((user) => (
                    <div key={user.id} className="grid grid-cols-12 p-3 text-sm">
                      <div className="col-span-4 font-medium">{user.name}</div>
                      <div className="col-span-2">
                        <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'} className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                      <div className="col-span-2">{user.credits}</div>
                      <div className="col-span-3 text-muted-foreground">{formatDate(user.lastLogin)}</div>
                      <div className="col-span-1">
                        {user.profileCompleted ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Yes</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">No</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credits Tab */}
        <TabsContent value="credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Credit Statistics
              </CardTitle>
              <CardDescription>
                Overview of platform credits and point distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Credit Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Platform Credits</span>
                      <span className="font-bold">{dashboardData.creditStats?.totalPlatformCredits ?? 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Login Points</span>
                      <span>{dashboardData.creditStats?.totalLoginPoints ?? 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Profile Points</span>
                      <span>{dashboardData.creditStats?.totalProfilePoints ?? 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Interaction Points</span>
                      <span>{dashboardData.creditStats?.totalInteractionPoints ?? 0}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Credits by Action Type</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={creditsByActionChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="points" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Credit Distribution by Action</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-4">Action Type</div>
                    <div className="col-span-3">Total Points</div>
                    <div className="col-span-2">Count</div>
                    <div className="col-span-3">Average Points</div>
                  </div>
                  <div className="divide-y">
                    {dashboardData.creditStats?.creditsByActionType?.map((action, index) => (
                      <div key={index} className="grid grid-cols-12 p-3 text-sm">
                        <div className="col-span-4 font-medium">{action.action}</div>
                        <div className="col-span-3">{action.totalPoints}</div>
                        <div className="col-span-2">{action.count}</div>
                        <div className="col-span-3">{action.averagePoints}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feed Tab */}
        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" /> Feed Interaction Statistics
              </CardTitle>
              <CardDescription>
                User engagement with feed content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Saved Posts</p>
                            <p className="text-2xl font-bold">{dashboardData.feedStats?.totalSavedPosts ?? 0}</p>
                          </div>
                          <BookmarkPlus className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Reported Posts</p>
                            <p className="text-2xl font-bold">{dashboardData.feedStats?.totalReportedPosts ?? 0}</p>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Shared Posts</p>
                            <p className="text-2xl font-bold">{dashboardData.feedStats?.totalSharedPosts ?? 0}</p>
                          </div>
                          <Share2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Post Source Distribution</h3>
                    <div className="space-y-2">
                      {dashboardData.feedStats?.postSourceDistribution?.map((source, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-muted-foreground">{source._id}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ 
                                  width: `${(source.count / Math.max(...dashboardData.feedStats.postSourceDistribution.map(s => s.count))) * 100}%` 
                                }}
                              />
                            </div>
                            <span>{source.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Daily Interactions (Last 7 Days)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyInteractionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="saved" fill="#4ade80" name="Saved" />
                        <Bar dataKey="reported" fill="#f87171" name="Reported" />
                        <Bar dataKey="shared" fill="#60a5fa" name="Shared" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" /> Recent Activities
              </CardTitle>
              <CardDescription>
                Latest user actions on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-3">User</div>
                  <div className="col-span-2">Action</div>
                  <div className="col-span-5">Details</div>
                  <div className="col-span-2">Date</div>
                </div>
                <div className="divide-y">
                  {dashboardData.recentActivities?.map((activity) => (
                    <div key={activity.id} className="grid grid-cols-12 p-3 text-sm">
                      <div className="col-span-3">
                        <div className="font-medium">{activity.user.name}</div>
                        <div className="text-xs text-muted-foreground">{activity.user.email}</div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          {activity.action}
                        </Badge>
                      </div>
                      <div className="col-span-5 text-muted-foreground">{activity.details}</div>
                      <div className="col-span-2 text-muted-foreground">
                        {new Date(activity.createdAt).toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;


