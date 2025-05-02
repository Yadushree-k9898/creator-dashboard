"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchRedditPosts, fetchTwitterPosts } from "../services/feedService"

export const useFetchFeed = (initialSource = "all") => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(initialSource)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let fetchedPosts = []

      if (source === "all" || source === "reddit") {
        const redditPosts = await fetchRedditPosts()
        fetchedPosts = [...fetchedPosts, ...redditPosts]
      }

      if (source === "all" || source === "twitter") {
        const twitterPosts = await fetchTwitterPosts(searchQuery)
        fetchedPosts = [...fetchedPosts, ...twitterPosts]
      }

      // Sort posts by creation date (newest first)
      fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      setPosts(fetchedPosts)
    } catch (err) {
      console.error("Error fetching feed:", err)
      setError("Failed to load feed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [source, searchQuery])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const refreshFeed = () => {
    fetchPosts()
  }

  const changeSource = (newSource) => {
    setSource(newSource)
  }

  const updateSearchQuery = (query) => {
    setSearchQuery(query)
  }

  return {
    posts,
    loading,
    error,
    source,
    searchQuery,
    refreshFeed,
    changeSource,
    updateSearchQuery,
  }
}
