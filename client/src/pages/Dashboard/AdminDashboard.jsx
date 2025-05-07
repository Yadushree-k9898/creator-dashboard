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
import { LayoutDashboard, Users, Activity, RefreshCw, ChevronRight } from "lucide-react"

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
      setTimeout(() => setIsRefreshing(false), 600) 
    })
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setIsUserDetailOpen(true)
  }

  const handleEditUser = (user) => {
    console.log("Edit user:", user)
  }

  const handleDeleteUser = (user) => {
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
    <div className="p-4 md:p-6 space-y-6 animate-fadeIn max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
            <span className="bg-violet-100 dark:bg-violet-900/40 p-2 rounded-lg mr-3">
              <LayoutDashboard className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </span>
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center text-sm">
            <ChevronRight className="h-3 w-3 mr-1 text-violet-500" />
            Manage your platform and monitor key metrics
          </p>
        </div>
        <Button 
          onClick={handleRefreshData} 
          variant="outline" 
          className="flex items-center gap-2 border-violet-200 hover:border-violet-300 hover:bg-violet-50 dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/20" 
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 text-violet-600 dark:text-violet-400 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <TabsList className="bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg w-full md:w-auto grid grid-cols-3 md:flex">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm"
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm"
            >
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:shadow-sm"
            >
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <CreditStatsCard creditStats={dashboard?.creditStats} />
          <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />
          <AdminAnalytics dashboard={dashboard} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RecentActivity />
            <SavedFeeds feedStats={dashboard?.feedStats} />
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 py-4 px-6 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <Users className="mr-3 h-5 w-5 text-violet-600 dark:text-violet-400" />
                Platform Users
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <RecentActivity fullHeight />
        </TabsContent>
      </Tabs>

      <UserDetailView user={selectedUser} isOpen={isUserDetailOpen} onClose={() => setIsUserDetailOpen(false)} />
      <UserCreditManager user={selectedUser} isOpen={isCreditManagerOpen} onClose={() => setIsCreditManagerOpen(false)} />
    </div>
  )
}

export default AdminDashboard