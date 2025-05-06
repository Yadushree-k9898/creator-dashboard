"use client"

import { useState } from "react"
import { User, Shield } from "lucide-react"

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleRoleChange = (role) => {
    if (role !== selectedRole) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
      onRoleChange(role)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div
        onClick={() => handleRoleChange("user")}
        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
          selectedRole === "user"
            ? "border-primary bg-primary/10 dark:bg-primary/20"
            : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800"
        } ${isAnimating && selectedRole === "user" ? "animate-pulse" : ""}`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
            selectedRole === "user"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          }`}
        >
          <User size={24} />
        </div>
        <span
          className={`font-medium transition-colors duration-300 ${
            selectedRole === "user" ? "text-primary" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          User
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">Regular user account</p>
      </div>

      <div
        onClick={() => handleRoleChange("admin")}
        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
          selectedRole === "admin"
            ? "border-primary bg-primary/10 dark:bg-primary/20"
            : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800"
        } ${isAnimating && selectedRole === "admin" ? "animate-pulse" : ""}`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
            selectedRole === "admin"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          }`}
        >
          <Shield size={24} />
        </div>
        <span
          className={`font-medium transition-colors duration-300 ${
            selectedRole === "admin" ? "text-primary" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Admin
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">Administrative privileges</p>
      </div>
    </div>
  )
}

export default RoleSelector
