// import { useState } from "react"
// import { Edit, Trash2, Search, ChevronDown, ChevronUp, CreditCard, Eye, Filter, Plus } from "lucide-react"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Badge } from "../ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
// import { Skeleton } from "../ui/skeleton"
// import { formatDate } from "../../utils/formatDate"
// import { fetchAllUsers } from "../../redux/slices/adminSlice"

// const AdminUserTable = ({
//   users,
//   pagination,
//   onPageChange,
//   onViewUser,
//   onEditUser,
//   onDeleteUser,
//   onManageCredits,
//   isLoading,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortField, setSortField] = useState("createdAt")
//   const [sortDirection, setSortDirection] = useState("desc")
//   const [filterRole, setFilterRole] = useState("all")

//   // Handle sorting
//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("asc")
//     }
//   }

//   // Filter users
//   const filteredUsers = users
//     .filter((user) => {
//       // Filter by search term
//       const matchesSearch =
//         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())

//       // Filter by role
//       const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole

//       return matchesSearch && matchesRole
//     })
//     .sort((a, b) => {
//       // Sort by field
//       let comparison = 0

//       if (sortField === "name") {
//         comparison = (a.name || "").localeCompare(b.name || "")
//       } else if (sortField === "email") {
//         comparison = a.email.localeCompare(b.email)
//       } else if (sortField === "credits") {
//         comparison = (a.credits || 0) - (b.credits || 0)
//       } else if (sortField === "createdAt") {
//         comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       }

//       return sortDirection === "asc" ? comparison : -comparison
//     })

//   // Sort indicator
//   const getSortIndicator = (field) => {
//     if (sortField !== field) return null
//     return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
//   }

//   if (isLoading) {
//     return <AdminUserTableSkeleton />
//   }

//   return (
//     <Card className="shadow-md hover:shadow-lg transition-all duration-300">
//       <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white">
//         <CardTitle className="flex items-center justify-between">
//           <span className="flex items-center gap-2">
//             <Users className="h-5 w-5" />
//             User Management
//           </span>
//           <Button
//             variant="secondary"
//             size="sm"
//             className="gap-1 hover:bg-white/20 transition-colors duration-300"
//             onClick={() => console.log("Add new user")}
//           >
//             <Plus size={16} />
//             Add User
//           </Button>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div className="relative w-full md:w-64">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <Input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-md border border-gray-200 dark:border-gray-700">
//               <Filter size={18} className="text-gray-500" />
//               <select
//                 value={filterRole}
//                 onChange={(e) => setFilterRole(e.target.value)}
//                 className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none"
//               >
//                 <option value="all">All Roles</option>
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("name")}
//                 >
//                   <div className="flex items-center">Name {getSortIndicator("name")}</div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("email")}
//                 >
//                   <div className="flex items-center">Email {getSortIndicator("email")}</div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
//                 >
//                   Role
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("credits")}
//                 >
//                   <div className="flex items-center">Credits {getSortIndicator("credits")}</div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("createdAt")}
//                 >
//                   <div className="flex items-center">Joined {getSortIndicator("createdAt")}</div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
//                           {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {user.name || "No Name"}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <Badge
//                         variant={user.role.toLowerCase() === "admin" ? "default" : "outline"}
//                         className={user.role.toLowerCase() === "admin" ? "bg-violet-500 hover:bg-violet-600" : ""}
//                       >
//                         {user.role}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500 dark:text-gray-300">{user.credits || 0}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500 dark:text-gray-300">{formatDate(user.createdAt)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end space-x-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onViewUser(user)}
//                           title="View User"
//                           className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
//                         >
//                           <Eye size={16} />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onManageCredits(user)}
//                           title="Manage Credits"
//                           className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
//                         >
//                           <CreditCard size={16} />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onEditUser(user)}
//                           title="Edit User"
//                           className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
//                         >
//                           <Edit size={16} />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onDeleteUser(user)}
//                           title="Delete User"
//                           className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors duration-200"
//                         >
//                           <Trash2 size={16} />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pagination && pagination.totalPages > 1 && (
//           <div className="px-6 py-3 flex items-center justify-between border-t dark:border-gray-700">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => onPageChange(Math.max(1, pagination.currentPage - 1))}
//                 disabled={pagination.currentPage === 1}
//               >
//                 Previous
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
//                 disabled={pagination.currentPage === pagination.totalPages}
//               >
//                 Next
//               </Button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700 dark:text-gray-300">
//                   Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to{" "}
//                   <span className="font-medium">
//                     {Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)}
//                   </span>{" "}
//                   of <span className="font-medium">{pagination.totalUsers}</span> results
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="rounded-l-md"
//                     onClick={() => onPageChange(1)}
//                     disabled={pagination.currentPage === 1}
//                   >
//                     First
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => onPageChange(Math.max(1, pagination.currentPage - 1))}
//                     disabled={pagination.currentPage === 1}
//                   >
//                     Previous
//                   </Button>

//                   {/* Page numbers */}
//                   {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                     let pageNum
//                     if (pagination.totalPages <= 5) {
//                       pageNum = i + 1
//                     } else if (pagination.currentPage <= 3) {
//                       pageNum = i + 1
//                     } else if (pagination.currentPage >= pagination.totalPages - 2) {
//                       pageNum = pagination.totalPages - 4 + i
//                     } else {
//                       pageNum = pagination.currentPage - 2 + i
//                     }

//                     return (
//                       <Button
//                         key={pageNum}
//                         variant={pagination.currentPage === pageNum ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => onPageChange(pageNum)}
//                         className={pagination.currentPage === pageNum ? "bg-primary text-white" : ""}
//                       >
//                         {pageNum}
//                       </Button>
//                     )
//                   })}

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
//                     disabled={pagination.currentPage === pagination.totalPages}
//                   >
//                     Next
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="rounded-r-md"
//                     onClick={() => onPageChange(pagination.totalPages)}
//                     disabled={pagination.currentPage === pagination.totalPages}
//                   >
//                     Last
//                   </Button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// // Missing Users component
// const Users = ({ className, ...props }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//       {...props}
//     >
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   )
// }

// // Skeleton loading state
// const AdminUserTableSkeleton = () => {
//   return (
//     <Card className="shadow-md">
//       <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
//         <div className="flex items-center justify-between">
//           <Skeleton className="h-6 w-48" />
//           <Skeleton className="h-9 w-24" />
//         </div>
//       </CardHeader>
//       <CardContent className="p-0">
//         <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <Skeleton className="h-10 w-64" />
//           <Skeleton className="h-10 w-32" />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 {[...Array(6)].map((_, i) => (
//                   <th key={i} className="px-6 py-3">
//                     <Skeleton className="h-4 w-20" />
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {[...Array(5)].map((_, i) => (
//                 <tr key={i}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <Skeleton className="h-10 w-10 rounded-full" />
//                       <Skeleton className="h-4 w-24 ml-4" />
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Skeleton className="h-4 w-32" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Skeleton className="h-6 w-16 rounded-full" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Skeleton className="h-4 w-12" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Skeleton className="h-4 w-24" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right">
//                     <div className="flex justify-end space-x-2">
//                       {[...Array(4)].map((_, j) => (
//                         <Skeleton key={j} className="h-8 w-8 rounded-md" />
//                       ))}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="px-6 py-3 flex items-center justify-between border-t dark:border-gray-700">
//           <Skeleton className="h-4 w-64" />
//           <Skeleton className="h-8 w-64" />
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default AdminUserTable

import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Eye,
  Filter,
  Plus,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/slices/adminSlice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "../../utils/formatDate";

const AdminUserTable = ({
  onPageChange,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onManageCredits,
}) => {
  const dispatch = useDispatch();
  const {
    users,
    isLoading,
    pagination,
    currentPage,
  } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    dispatch(fetchAllUsers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const filteredUsers = users
    ?.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = (a.name || "").localeCompare(b.name || "");
      } else if (sortField === "email") {
        comparison = a.email.localeCompare(b.email);
      } else if (sortField === "credits") {
        comparison = (a.credits || 0) - (b.credits || 0);
      } else if (sortField === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-10 mb-4 w-full" />
        <Skeleton className="h-10 mb-4 w-full" />
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </span>
          <Button
            variant="secondary"
            size="sm"
            className="gap-1 hover:bg-white/20 transition-colors duration-300"
            onClick={() => console.log("Add new user")}
          >
            <Plus size={16} />
            Add User
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-md border border-gray-200 dark:border-gray-700">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {["name", "email", "role", "credits", "createdAt"].map((field, idx) => {
                  const labelMap = {
                    name: "Name",
                    email: "Email",
                    role: "Role",
                    credits: "Credits",
                    createdAt: "Joined",
                  };

                  return (
                    <th
                      key={idx}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                        field !== "role" ? "cursor-pointer" : ""
                      }`}
                      onClick={() => field !== "role" && handleSort(field)}
                    >
                      <div className="flex items-center">
                        {labelMap[field]} {getSortIndicator(field)}
                      </div>
                    </th>
                  );
                })}
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                        {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name || "No Name"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={user.role.toLowerCase() === "admin" ? "default" : "outline"}
                        className={user.role.toLowerCase() === "admin" ? "bg-violet-500 hover:bg-violet-600" : ""}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{user.credits || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onViewUser(user)} title="View User">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onManageCredits(user)} title="Manage Credits">
                          <CreditCard size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEditUser(user)} title="Edit User">
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteUser(user)}
                          title="Delete User"
                          className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.currentPage === 1}
                onClick={() => onPageChange(pagination.currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => onPageChange(pagination.currentPage + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
