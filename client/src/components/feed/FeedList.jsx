// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { setActiveSource, fetchDevToPosts, fetchRedditFeed } from "../../redux/slices/feedSlice"
// import FeedItem from "./FeedItem"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { RefreshCw, Search } from "lucide-react"
// import Spinner from "../common/Spinner"
// import ErrorAlert from "../common/ErrorAlert"


// const FeedList = () => {
//   const dispatch = useDispatch()
//   const { allPosts, loading, error, activeSource } = useSelector((state) => state.feed)
//   const [localSearchQuery, setLocalSearchQuery] = React.useState("")

//   // Handle source tab change
//   const handleSourceChange = (source) => {
//     dispatch(setActiveSource(source))
//   }

//   // Handle search (for Dev.to only)
//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (activeSource === "devto") {
//       dispatch(fetchDevToPosts(localSearchQuery))
//     }
//   }

//   // Handle refresh (manually triggered fetch for active source)
//   const handleRefresh = () => {
//     if (activeSource === "reddit") {
//       dispatch(fetchRedditFeed())
//     } else if (activeSource === "devto") {
//       dispatch(fetchDevToPosts(localSearchQuery))
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex justify-between items-center">
//             <CardTitle>Content Feed</CardTitle>
//             <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
//               <RefreshCw className="h-4 w-4 mr-1" />
//               Refresh
//             </Button>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <Tabs defaultValue={activeSource} onValueChange={handleSourceChange}>
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
//               <TabsList>
//                 <TabsTrigger value="all">All</TabsTrigger>
//                 <TabsTrigger value="reddit">Reddit</TabsTrigger>
//                 <TabsTrigger value="devto">Dev.to</TabsTrigger>
//               </TabsList>

//               <form onSubmit={handleSearch} className="flex w-full md:w-auto">
//                 <Input
//                   placeholder="Search Dev.to..."
//                   value={localSearchQuery}
//                   onChange={(e) => setLocalSearchQuery(e.target.value)}
//                   className="mr-2"
//                   disabled={activeSource !== "devto"}
//                 />
//                 <Button
//                   type="submit"
//                   variant="secondary"
//                   disabled={activeSource !== "devto" || loading}
//                 >
//                   <Search className="h-4 w-4" />
//                 </Button>
//               </form>
//             </div>

//             {error && <ErrorAlert message={error} />}

//             {loading ? (
//               <div className="flex justify-center py-8">
//                 <Spinner />
//               </div>
//             ) : (
//               <>
//                 <TabsContent value="all" className="m-0">
//                   {allPosts.length > 0 ? (
//                     allPosts.map((post) => (
//                       <FeedItem key={`${post.source}-${post.postId}`} post={post} />
//                     ))
//                   ) : (
//                     <p className="text-center py-8 text-gray-500">No posts found</p>
//                   )}
//                 </TabsContent>

//                 <TabsContent value="reddit" className="m-0">
//                   {allPosts.filter((post) => post.source === "Reddit").length > 0 ? (
//                     allPosts
//                       .filter((post) => post.source === "Reddit")
//                       .map((post) => (
//                         <FeedItem key={`${post.source}-${post.postId}`} post={post} />
//                       ))
//                   ) : (
//                     <p className="text-center py-8 text-gray-500">No Reddit posts found</p>
//                   )}
//                 </TabsContent>

//                 <TabsContent value="devto" className="m-0">
//                   {allPosts.filter((post) => post.source === "Dev.to").length > 0 ? (
//                     allPosts
//                       .filter((post) => post.source === "Dev.to")
//                       .map((post) => (
//                         <FeedItem key={`${post.source}-${post.postId}`} post={post} />
//                       ))
//                   ) : (
//                     <p className="text-center py-8 text-gray-500">No Dev.to posts found</p>
//                   )}
//                 </TabsContent>
//               </>
//             )}
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default FeedList

import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveSource, fetchDevToPosts, fetchRedditFeed } from "../../redux/slices/feedSlice"
import FeedItem from "./FeedItem"
import Pagination from "./Pagination"
import ItemsPerPageSelector from "./ItemsPerPageSelector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RefreshCw, Search } from "lucide-react"
import Spinner from "../common/Spinner"
import ErrorAlert from "../common/ErrorAlert"

const FeedList = () => {
  const dispatch = useDispatch()
  const { allPosts, loading, error, activeSource, page, itemsPerPage } = useSelector((state) => state.feed)
  const [localSearchQuery, setLocalSearchQuery] = React.useState("")

  // Handle source tab change
  const handleSourceChange = (source) => {
    dispatch(setActiveSource(source))
  }

  // Handle search (for Dev.to only)
  const handleSearch = (e) => {
    e.preventDefault()
    if (activeSource === "devto") {
      dispatch(fetchDevToPosts(localSearchQuery))
    }
  }

  // Handle refresh (manually triggered fetch for active source)
  const handleRefresh = () => {
    if (activeSource === "reddit") {
      dispatch(fetchRedditFeed())
    } else if (activeSource === "devto") {
      dispatch(fetchDevToPosts(localSearchQuery))
    }
  }

  // Get current posts based on pagination
  const getCurrentPosts = (posts) => {
    const startIndex = (page - 1) * itemsPerPage
    return posts.slice(startIndex, startIndex + itemsPerPage)
  }

  // Filter posts based on active source
  const filteredPosts = useMemo(() => {
    if (activeSource === "all") {
      return allPosts
    } else if (activeSource === "reddit") {
      return allPosts.filter((post) => post.source === "Reddit")
    } else if (activeSource === "devto") {
      return allPosts.filter((post) => post.source === "Dev.to")
    }
    return []
  }, [allPosts, activeSource])

  // Get current page of posts
  const currentPosts = useMemo(() => {
    return getCurrentPosts(filteredPosts)
  }, [filteredPosts, page])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Content Feed</CardTitle>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue={activeSource} onValueChange={handleSourceChange}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="reddit">Reddit</TabsTrigger>
                <TabsTrigger value="devto">Dev.to</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                <Input
                  placeholder="Search Dev.to..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="mr-2"
                  disabled={activeSource !== "devto"}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={activeSource !== "devto" || loading}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {error && <ErrorAlert message={error} />}

            {loading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : (
              <>
                <TabsContent value="all" className="m-0">
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <FeedItem key={`${post.source}-${post.postId}`} post={post} />
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-500">No posts found</p>
                  )}
                </TabsContent>

                <TabsContent value="reddit" className="m-0">
                  {activeSource !== "reddit" || currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <FeedItem key={`${post.source}-${post.postId}`} post={post} />
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-500">No Reddit posts found</p>
                  )}
                </TabsContent>

                <TabsContent value="devto" className="m-0">
                  {activeSource !== "devto" || currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <FeedItem key={`${post.source}-${post.postId}`} post={post} />
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-500">No Dev.to posts found</p>
                  )}
                </TabsContent>
              </>
            )}
            
            {!loading && filteredPosts.length > 0 && (
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                <ItemsPerPageSelector />
                <Pagination totalItems={filteredPosts.length} itemsPerPage={itemsPerPage} />
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeedList
