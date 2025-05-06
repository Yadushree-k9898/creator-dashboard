import { useState } from "react"
import { useDispatch } from "react-redux"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { updateUserCredits } from "../../redux/slices/adminSlice"
import { Coins, Plus, Minus } from "lucide-react"

const UserCreditManager = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const [operation, setOperation] = useState("add")
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  if (!user) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (amount <= 0) return

    setLoading(true)

    try {
      const finalAmount = operation === "subtract" ? -amount : amount
      const currentCredits = user.credits || 0
      const newCredits = currentCredits + finalAmount

      await dispatch(
        updateUserCredits({
          userId: user._id,
          credits: newCredits,
        }),
      )

      // Reset form and close dialog
      setAmount(0)
      setReason("")
      setOperation("add")
      onClose()
    } catch (error) {
      console.error("Error updating credits:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-primary/80 to-primary text-white p-6 -mx-6 -mt-6 mb-6">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Coins className="h-5 w-5" />
            Manage User Credits
          </DialogTitle>
          <DialogDescription className="text-white/80">
            {user.name || user.email} currently has {user.credits || 0} credits.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="operation" className="text-gray-700 dark:text-gray-300">
              Operation
            </Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger
                id="operation"
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              >
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-emerald-500" />
                    <span>Add Credits</span>
                  </div>
                </SelectItem>
                <SelectItem value="subtract">
                  <div className="flex items-center gap-2">
                    <Minus className="h-4 w-4 text-rose-500" />
                    <span>Subtract Credits</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount || ""}
              onChange={(e) => setAmount(Number.parseInt(e.target.value) || 0)}
              required
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-gray-700 dark:text-gray-300">
              Reason
            </Label>
            <Textarea
              id="reason"
              placeholder="Provide a reason for this credit adjustment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 min-h-[100px]"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-200 hover:bg-gray-50 transition-colors duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || amount <= 0}
              className={`transition-all duration-300 ${
                operation === "add" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              {loading ? "Processing..." : operation === "add" ? "Add Credits" : "Subtract Credits"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserCreditManager
