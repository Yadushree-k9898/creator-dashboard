"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSavedPosts } from "../../redux/slices/feedSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout } from "../../components/layout/Layout"
import { SectionTitle } from "../../components/common/SectionTitle"
import FeedItem from "../../components/feed/FeedItem"
import { Spinner } from "../../components/common/Spinner"
import { ErrorAlert } from "../../components/common/ErrorAlert"

const SavedFeedPage = () => {
  const dispatch = useDispatch()
  const { savedPosts, loading, error } = useSelector((state) => state.feed)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    dispatch(fetchSavedPosts())
  }, [dispatch])

  // Filter posts based on active tab
  const filteredPosts = savedPosts.filter((post) => {
    if (activeTab === "all") return true
    if (activeTab === "shared") return post.shared
    if (activeTab === "reported") return post.reported
    if (activeTab === "reddit") return post.source === "Reddit"
    if (activeTab === "twitter") return post.source === "Twitter"
    return true
  })

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <SectionTitle title="Saved Content" subtitle="View and manage your saved posts" />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Saved Posts</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({savedPosts.length})</TabsTrigger>
                <TabsTrigger value="shared">Shared ({savedPosts.filter((p) => p.shared).length})</TabsTrigger>
                <TabsTrigger value="reported">Reported ({savedPosts.filter((p) => p.reported).length})</TabsTrigger>
                <TabsTrigger value="reddit">
                  Reddit ({savedPosts.filter((p) => p.source === "Reddit").length})
                </TabsTrigger>
                <TabsTrigger value="twitter">
                  Twitter ({savedPosts.filter((p) => p.source === "Twitter").length})
                </TabsTrigger>
              </TabsList>

              {error && <ErrorAlert message={error} />}

              {loading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : (
                <TabsContent value={activeTab} className="m-0">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => <FeedItem key={post._id || post.postId} post={post} />)
                  ) : (
                    <p className="text-center py-8 text-gray-500">No saved posts found</p>
                  )}
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default SavedFeedPage
