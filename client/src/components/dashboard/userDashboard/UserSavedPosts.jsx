// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Save, Share2, Flag } from "lucide-react"
// import { PostItem } from "./StatComponents"
// import { useCredits } from "@/hooks/useCredits"

// const UserSavedPosts = () => {
//   const { posts, loading } = useCredits()
//   const [activeTab, setActiveTab] = useState("all")

//   if (loading) {
//     return (
//       <Card className="h-full">
//         <CardHeader>
//           <CardTitle>Saved Posts</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, index) => (
//               <div key={index} className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card className="h-full">
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Save className="mr-2 h-5 w-5" />
//           Saved Posts
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="all" onValueChange={setActiveTab}>
//           <TabsList className="grid w-full grid-cols-3 mb-4">
//             <TabsTrigger value="all" className="flex items-center">
//               <Save className="mr-2 h-4 w-4" />
//               All ({posts?.allPosts?.length || 0})
//             </TabsTrigger>
//             <TabsTrigger value="shared" className="flex items-center">
//               <Share2 className="mr-2 h-4 w-4" />
//               Shared ({posts?.sharedPosts?.length || 0})
//             </TabsTrigger>
//             <TabsTrigger value="reported" className="flex items-center">
//               <Flag className="mr-2 h-4 w-4" />
//               Reported ({posts?.reportedPosts?.length || 0})
//             </TabsTrigger>
//           </TabsList>

//           <ScrollArea className="h-[350px]">
//             <TabsContent value="all" className="mt-0">
//               {posts?.allPosts && posts.allPosts.length > 0 ? (
//                 posts.allPosts.map((post, index) => (
//                   <PostItem
//                     key={index}
//                     title={post.title}
//                     source={post.source}
//                     url={post.url}
//                     content={post.content}
//                     isReported={post.isReported}
//                     isShared={post.isShared}
//                     timestamp={post.createdAt}
//                   />
//                 ))
//               ) : (
//                 <p className="text-center text-sm text-gray-500 py-4">No saved posts found</p>
//               )}
//             </TabsContent>

//             <TabsContent value="shared" className="mt-0">
//               {posts?.sharedPosts && posts.sharedPosts.length > 0 ? (
//                 posts.sharedPosts.map((post, index) => (
//                   <PostItem
//                     key={index}
//                     title={post.title}
//                     source={post.source}
//                     url={post.url}
//                     content={post.content}
//                     isShared={true}
//                     timestamp={post.createdAt}
//                   />
//                 ))
//               ) : (
//                 <p className="text-center text-sm text-gray-500 py-4">No shared posts found</p>
//               )}
//             </TabsContent>

//             <TabsContent value="reported" className="mt-0">
//               {posts?.reportedPosts && posts.reportedPosts.length > 0 ? (
//                 posts.reportedPosts.map((post, index) => (
//                   <PostItem
//                     key={index}
//                     title={post.title}
//                     source={post.source}
//                     url={post.url}
//                     content={post.content}
//                     isReported={true}
//                     timestamp={post.createdAt}
//                   />
//                 ))
//               ) : (
//                 <p className="text-center text-sm text-gray-500 py-4">No reported posts found</p>
//               )}
//             </TabsContent>
//           </ScrollArea>
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }

// export default UserSavedPosts


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, Share2, Flag } from "lucide-react"
import { PostItem } from "./StatComponents"
import { useCredits } from "@/hooks/useCredits"

const UserSavedPosts = () => {
  const { posts, loading } = useCredits()
  const [activeTab, setActiveTab] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card className="h-full transition-all duration-300 shadow-md hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Save className="mr-2 h-5 w-5 text-primary" />
            Saved Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`h-full transition-all duration-500 shadow-md hover:shadow-lg transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <Save className="mr-2 h-5 w-5 text-primary" />
          Saved Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="animate-fadeIn">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger
              value="all"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
            >
              <Save className="mr-2 h-4 w-4" />
              All ({posts?.allPosts?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="shared"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Shared ({posts?.sharedPosts?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="reported"
              className="flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-primary transition-all duration-300"
            >
              <Flag className="mr-2 h-4 w-4" />
              Reported ({posts?.reportedPosts?.length || 0})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[350px] pr-4">
            <TabsContent value="all" className="mt-0">
              {posts?.allPosts && posts.allPosts.length > 0 ? (
                posts.allPosts.map((post, index) => (
                  <PostItem
                    key={index}
                    title={post.title}
                    source={post.source}
                    url={post.url}
                    content={post.content}
                    isReported={post.isReported}
                    isShared={post.isShared}
                    timestamp={post.createdAt}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
                  <Save className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No saved posts found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="shared" className="mt-0">
              {posts?.sharedPosts && posts.sharedPosts.length > 0 ? (
                posts.sharedPosts.map((post, index) => (
                  <PostItem
                    key={index}
                    title={post.title}
                    source={post.source}
                    url={post.url}
                    content={post.content}
                    isShared={true}
                    timestamp={post.createdAt}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
                  <Share2 className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No shared posts found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reported" className="mt-0">
              {posts?.reportedPosts && posts.reportedPosts.length > 0 ? (
                posts.reportedPosts.map((post, index) => (
                  <PostItem
                    key={index}
                    title={post.title}
                    source={post.source}
                    url={post.url}
                    content={post.content}
                    isReported={true}
                    timestamp={post.createdAt}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
                  <Flag className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No reported posts found</p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default UserSavedPosts
