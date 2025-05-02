"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export const ReportModal = ({ isOpen, onClose, onConfirm, post }) => {
  const [reason, setReason] = useState("inappropriate")
  const [otherReason, setOtherReason] = useState("")

  const handleSubmit = () => {
    const reportReason = reason === "other" ? otherReason : reason
    onConfirm(reportReason)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
          <DialogDescription>Please let us know why you're reporting this content.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="font-medium mb-2 text-sm">Post: {post?.title}</h3>

          <RadioGroup defaultValue="inappropriate" value={reason} onValueChange={setReason} className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="inappropriate" id="inappropriate" />
              <Label htmlFor="inappropriate">Inappropriate content</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="spam" id="spam" />
              <Label htmlFor="spam">Spam</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="misinformation" id="misinformation" />
              <Label htmlFor="misinformation">Misinformation</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>

          {reason === "other" && (
            <div className="mt-4">
              <Label htmlFor="otherReason">Please specify:</Label>
              <Textarea
                id="otherReason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Please provide details..."
                className="mt-1"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
