import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../redux/slices/feedSlice"

const Pagination = ({ totalItems, itemsPerPage = 5 }) => {
  const dispatch = useDispatch()
  const { page } = useSelector((state) => state.feed)
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1) {
    return null
  }
  
  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage))
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Generate page numbers for display
  const getPageNumbers = () => {
    let pages = []
    
    // Always show first page
    pages.push(1)
    
    // Calculate range around current page
    let startPage = Math.max(2, page - 1)
    let endPage = Math.min(totalPages - 1, page + 1)
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...')
    }
    
    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...')
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    return pages
  }
  
  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => goToPage(page - 1)} 
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((pageNum, index) => (
        pageNum === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <Button
            key={`page-${pageNum}`}
            variant={pageNum === page ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(pageNum)}
            className="min-w-[32px]"
          >
            {pageNum}
          </Button>
        )
      ))}
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => goToPage(page + 1)} 
        disabled={page === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <div className="text-sm text-gray-500 ml-2">
        Page {page} of {totalPages}
      </div>
    </div>
  )
}

export default Pagination