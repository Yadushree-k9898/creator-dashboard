"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRedditFeed, fetchTwitterFeed, fetchSavedPosts } from "../../redux/slices/feedSlice"
import FeedList from "../../components/feed/FeedList"
import { Layout } from "../../components/layout/Layout"
import SectionTitle from "../../components/common/SectionTitle"

const FeedPage = () => {
  const dispatch = useDispatch()
  const feed = useSelector((state) => state.feed)
  const loading = feed?.loading
  const error = feed?.error

  useEffect(() => {
    // Fetch all feed data when component mounts
    dispatch(fetchRedditFeed())
    dispatch(fetchTwitterFeed())
    dispatch(fetchSavedPosts())
  }, [dispatch])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <SectionTitle title="Content Feed" subtitle="Discover and interact with content from various platforms" />

        <div className="mt-6">
          <FeedList />
        </div>
      </div>
    </Layout>
  )
}

export default FeedPage
