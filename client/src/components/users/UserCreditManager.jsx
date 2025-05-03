"use client"

import { useState } from "react"
import { Plus, Minus, Check, X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { CREDIT_ACTIONS, CREDIT_VALUES } from "../../utils/constants"

const UserCreditManager = ({ user, onAddCredits, onRemoveCredits, onClose }) => {
  const [creditAmount, setCreditAmount] = useState(0)
  const [reason, setReason] = useState("")
  const [operation, setOperation] = useState("add")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate input
    if (creditAmount <= 0) {
      setError("Credit amount must be greater than 0")
      return
    }

    if (!reason.trim()) {
      setError("Please provide a reason")
      return
    }

    // Clear error
    setError("")

    // Call the appropriate function based on operation
    if (operation === "add") {
      onAddCredits(user._id, creditAmount, reason)
    } else {
      onRemoveCredits(user._id, creditAmount, reason)
    }

    // Reset form
    setCreditAmount(0)
    setReason("")
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Manage Credits for {user.name || user.email}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Credits</p>
            <p className="text-2xl font-bold text-primary">{user.credits || 0}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={operation === "add" ? "default" : "outline"}
              size="sm"
              onClick={() => setOperation("add")}
              className="flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add
            </Button>
            <Button
              variant={operation === "remove" ? "default" : "outline"}
              size="sm"
              onClick={() => setOperation("remove")}
              className="flex items-center"
            >
              <Minus size={16} className="mr-1" /> Remove
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="creditAmount">Credit Amount</Label>
            <Input
              id="creditAmount"
              type="number"
              min="1"
              value={creditAmount}
              onChange={(e) => setCreditAmount(Number.parseInt(e.target.value) || 0)}
              placeholder="Enter amount"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="reason">Reason</Label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2"
            >
              <option value="">Select a reason</option>
              {Object.entries(CREDIT_ACTIONS).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.replace(/_/g, " ")} ({CREDIT_VALUES[value]} credits)
                </option>
              ))}
              <option value="manual_adjustment">Manual adjustment</option>
              <option value="bonus">Bonus credits</option>
              <option value="penalty">Penalty</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center">
              <Check size={16} className="mr-1" />
              {operation === "add" ? "Add Credits" : "Remove Credits"}
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-8">
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
                {user.creditHistory.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(entry.date).toLocaleDateString()}
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
  )
}

export default UserCreditManager
