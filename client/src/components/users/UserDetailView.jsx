"use client"
import { formatDate } from "../../utils/formatDate"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Mail, Calendar, CreditCard, Clock, Edit, Bookmark, Activity, Shield } from "lucide-react"

const UserDetailView = ({ user, onEdit, onClose }) => {
  if (!user) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name || "No Name"}</h2>
              <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
                <Mail size={16} className="mr-1" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center mt-1">
                <Badge variant={user.role === "admin" ? "default" : "outline"}>
                  {user.role === "admin" ? "Admin" : "User"}
                </Badge>
                {user.isVerified && (
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit size={16} className="mr-1" /> Edit
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                <p className="font-medium text-gray-900 dark:text-white">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Active</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.lastActive ? formatDate(user.lastActive, { format: "relative" }) : "Never"}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <CreditCard size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Credits</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.credits || 0}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Bookmark size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Saved Posts</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.savedPosts?.length || 0}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Activity size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Feed Interactions</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.feedInteractions || 0}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Shield size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Profile Completion</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.profileCompletion || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {user.bio && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Bio</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Credit History</h3>
          {user.creditHistory && user.creditHistory.length > 0 ? (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {user.creditHistory.slice(0, 5).map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={entry.amount > 0 ? "text-green-500" : "text-red-500"}>
                          {entry.amount > 0 ? "+" : ""}
                          {entry.amount}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {entry.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No credit history available</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

export default UserDetailView
