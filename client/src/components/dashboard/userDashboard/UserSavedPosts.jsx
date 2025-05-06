import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, Share2, Flag } from "lucide-react"
import { PostItem } from "./StatComponents"
import { useCredits } from "@/hooks/useCredits"

const UserSavedPosts = () => {
  const { posts, loading } = useCredits()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
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
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"
              />
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
        <Tabs defaultValue="all" className="animate-fadeIn">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="all">
              <Save className="mr-2 h-4 w-4" />
              All ({posts?.allPosts?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="shared">
              <Share2 className="mr-2 h-4 w-4" />
              Shared ({posts?.sharedPosts?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="reported">
              <Flag className="mr-2 h-4 w-4" />
              Reported ({posts?.reportedPosts?.length || 0})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[350px] pr-4">
            <TabsContent value="all">
              {posts?.allPosts?.length > 0 ? (
                posts.allPosts.map((post, i) => (
                  <PostItem key={i} {...post} />
                ))
              ) : (
                <EmptyState icon={<Save />} message="No saved posts found" />
              )}
            </TabsContent>

            <TabsContent value="shared">
              {posts?.sharedPosts?.length > 0 ? (
                posts.sharedPosts.map((post, i) => (
                  <PostItem key={i} {...post} isShared />
                ))
              ) : (
                <EmptyState icon={<Share2 />} message="No shared posts found" />
              )}
            </TabsContent>

            <TabsContent value="reported">
              {posts?.reportedPosts?.length > 0 ? (
                posts.reportedPosts.map((post, i) => (
                  <PostItem key={i} {...post} isReported />
                ))
              ) : (
                <EmptyState icon={<Flag />} message="No reported posts found" />
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const EmptyState = ({ icon, message }) => (
  <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fadeIn">
    <div className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600">
      {icon}
    </div>
    <p>{message}</p>
  </div>
)

export default UserSavedPosts
