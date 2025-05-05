import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { setItemsPerPage } from "../../redux/slices/feedSlice"

const ItemsPerPageSelector = () => {
  const dispatch = useDispatch()
  const { itemsPerPage } = useSelector((state) => state.feed)
  
  const handleValueChange = (value) => {
    dispatch(setItemsPerPage(parseInt(value, 10)))
  }
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Show:</span>
      <Select value={itemsPerPage.toString()} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="5 items" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-500">per page</span>
    </div>
  )
}

export default ItemsPerPageSelector