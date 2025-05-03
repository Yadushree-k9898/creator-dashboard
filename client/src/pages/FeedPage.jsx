"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRedditFeed, fetchTwitterFeed, fetchSavedPosts } from "../../redux/slices/feedSlice"
import FeedList from "../../components/feed/FeedList"
import Layout from "../components/layout/Layout"
import SectionTitle from "../../components/common/SectionTitle"

const FeedPage = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.feed)

  useEffect(() => {
    // Fetch all feed data when component mounts
    dispatch(fetchRedditFeed())
    dispatch(fetchTwitterFeed())
    dispatch(fetchSavedPosts())
  }, [dispatch])

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
