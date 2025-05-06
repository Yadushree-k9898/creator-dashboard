import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAdminDashboard, fetchAllUsers } from "../../redux/slices/adminSlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import AdminAnalytics from "../../components/dashboard/adminDashboard/AdminAnalytics"
import CreditStatsCard from "../../components/dashboard/adminDashboard/CreditStatsCard"
import RecentActivity from "../../components/dashboard/adminDashboard/RecentActivity"
import SavedFeeds from "../../components/dashboard/adminDashboard/SavedFeeds"
import AdminUserTable from "../../components/users/AdminUserTable"
import UserDetailView from "../../components/users/UserDetailView"
import UserCreditManager from "../../components/users/UserCreditManager"
import { LayoutDashboard, Users, Activity, Settings, RefreshCw } from "lucide-react"

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { dashboard, users, loading, error, pagination } = useSelector((state) => state.admin)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)
  const [isCreditManagerOpen, setIsCreditManagerOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    dispatch(fetchAdminDashboard())
    dispatch(fetchAllUsers({ page: 1, limit: 10 }))
  }, [dispatch])

  const handleRefreshData = () => {
    setIsRefreshing(true)
    Promise.all([
      dispatch(fetchAdminDashboard()),
      dispatch(fetchAllUsers({ page: pagination.currentPage, limit: pagination.limit })),
    ]).finally(() => {
      setTimeout(() => setIsRefreshing(false), 600) // Add a slight delay for better UX
    })
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setIsUserDetailOpen(true)
  }

  const handleEditUser = (user) => {
    // Navigate to edit user page or open modal
    console.log("Edit user:", user)
  }

  const handleDeleteUser = (user) => {
    // Open confirmation dialog and delete user
    console.log("Delete user:", user)
  }

  const handleManageCredits = (user) => {
    setSelectedUser(user)
    setIsCreditManagerOpen(true)
  }

  const handlePageChange = (page) => {
    dispatch(fetchAllUsers({ page, limit: pagination.limit }))
  }

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your platform and monitor key metrics</p>
        </div>
        <Button
          onClick={handleRefreshData}
          variant="outline"
          className="flex items-center gap-2 transition-all duration-300 hover:bg-primary/10"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-lg">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fadeIn">
          {/* Credit Stats Summary */}
          <CreditStatsCard creditStats={dashboard?.creditStats} />

          <Separator className="my-6" />

          {/* Analytics */}
          <AdminAnalytics dashboard={dashboard} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <RecentActivity activities={dashboard?.recentActivity} />

            {/* Saved Feeds */}
            <SavedFeeds feedStats={dashboard?.feedStats} />
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6 animate-fadeIn">
          <AdminUserTable
            users={users || []}
            pagination={pagination}
            onPageChange={handlePageChange}
            onViewUser={handleViewUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onManageCredits={handleManageCredits}
            isLoading={loading}
          />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 animate-fadeIn">
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white">
              <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <RecentActivity activities={dashboard?.recentActivity} fullHeight />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 animate-fadeIn">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white">
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Platform settings will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Detail Modal */}
      <UserDetailView user={selectedUser} isOpen={isUserDetailOpen} onClose={() => setIsUserDetailOpen(false)} />

      {/* Credit Manager Modal */}
      <UserCreditManager
        user={selectedUser}
        isOpen={isCreditManagerOpen}
        onClose={() => setIsCreditManagerOpen(false)}
      />
    </div>
  )
}

export default AdminDashboard
