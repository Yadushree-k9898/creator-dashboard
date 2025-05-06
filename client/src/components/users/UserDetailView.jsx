import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ScrollArea } from "../ui/scroll-area"
import { formatDate } from "../../utils/formatDate"
import { User, CreditCard, Clock, Activity, FileText, Mail, Calendar, Shield } from "lucide-react"

const UserDetailView = ({ user, isOpen, onClose }) => {
  if (!user) return null

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return formatDate(dateString)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="bg-gradient-to-r from-primary/80 to-primary text-white p-6 -mx-6 -mt-6 mb-6">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Detailed information about {user.name || user.email}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Card className="mb-4 border-0 shadow-none">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-md">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name || "No Name"}</h3>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={user.role.toLowerCase() === "admin" ? "default" : "outline"}
                      className={user.role.toLowerCase() === "admin" ? "bg-violet-500 hover:bg-violet-600" : ""}
                    >
                      {user.role.toLowerCase() === "admin" ? (
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Admin
                        </div>
                      ) : (
                        "User"
                      )}
                    </Badge>
                    {user.profileCompleted && (
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                        Profile Completed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 bg-primary/5 p-3 rounded-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Credits</span>
                  <span className="text-xl font-bold text-primary">{user.credits || 0}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 px-4 pb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Joined</span>
                  </div>
                  <p className="text-sm font-medium mt-1 text-gray-900 dark:text-gray-100">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Last Login</span>
                  </div>
                  <p className="text-sm font-medium mt-1 text-gray-900 dark:text-gray-100">
                    {user.lastLogin ? formatRelativeTime(user.lastLogin) : "Never"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="activity"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="credits"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Credit History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-4 animate-fadeIn">
              <ScrollArea className="h-[300px]">
                {user.recentActivity && user.recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {user.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all duration-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <Activity className="h-4 w-4 text-primary mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.details}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatRelativeTime(activity.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <FileText className="h-8 w-8 mb-2 opacity-50" />
                    <p>No activity records found</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="credits" className="mt-4 animate-fadeIn">
              <ScrollArea className="h-[300px]">
                {user.creditHistory && user.creditHistory.length > 0 ? (
                  <div className="space-y-3">
                    {user.creditHistory.map((credit) => (
                      <div
                        key={credit.id}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all duration-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <CreditCard
                              className={`h-4 w-4 ${credit.amount >= 0 ? "text-emerald-500" : "text-rose-500"} mt-1`}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                <span
                                  className={
                                    credit.amount >= 0
                                      ? "text-emerald-600 dark:text-emerald-400"
                                      : "text-rose-600 dark:text-rose-400"
                                  }
                                >
                                  {credit.amount >= 0 ? "+" : ""}
                                  {credit.amount} credits
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{credit.reason}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatRelativeTime(credit.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <CreditCard className="h-8 w-8 mb-2 opacity-50" />
                    <p>No credit history found</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailView
