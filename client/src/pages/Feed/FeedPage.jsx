import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchDevToPosts,
  fetchRedditFeed,
  fetchSavedPosts,
} from "../../redux/slices/feedSlice"
import FeedList from "../../components/feed/FeedList"
import SectionTitle from "../../components/common/SectionTitle"
import Spinner from "../../components/common/Spinner"
import ErrorAlert from "../../components/common/ErrorAlert"

const FeedPage = () => {
  const dispatch = useDispatch()
  const {
    allPosts,
    redditPosts,
    devtoPosts,
    savedPosts,
    redditLoading,
    devtoLoading,
    savedPostsLoading,
    redditError,
    devtoError,
    savedPostsError,
    activeSource,
    searchQuery,
  } = useSelector((state) => state.feed)

  const isAnyLoading = redditLoading || devtoLoading || savedPostsLoading
  const anyError = redditError || devtoError || savedPostsError

  // useEffect(() => {
  //   if (activeSource === "reddit" && !redditPosts.length && !redditLoading) {
  //     dispatch(fetchRedditFeed())
  //   } else if (activeSource === "devto" && !devtoPosts.length && !devtoLoading) {
  //     dispatch(fetchDevToPosts(searchQuery))
  //   } else if (activeSource === "all") {
  //     if (!redditPosts.length && !redditLoading) {
  //       dispatch(fetchRedditFeed())
  //     }
  //     if (!devtoPosts.length && !devtoLoading) {
  //       dispatch(fetchDevToPosts(searchQuery))
  //     }
  //   }

  //   if (!savedPosts.length && !savedPostsLoading) {
  //     dispatch(fetchSavedPosts())
  //   }
  // }, [dispatch, activeSource, redditPosts.length, devtoPosts.length, savedPosts.length, redditLoading, devtoLoading, savedPostsLoading, searchQuery])


  useEffect(() => {
    if (activeSource === "reddit" && redditPosts.length === 0) {
      dispatch(fetchRedditFeed())
    } else if (activeSource === "devto" && devtoPosts.length === 0) {
      dispatch(fetchDevToPosts())
    } else if (activeSource === "all") {
      if (redditPosts.length === 0) {
        dispatch(fetchRedditFeed())
      }
      if (devtoPosts.length === 0) {
        dispatch(fetchDevToPosts())
      }
    }
  
    if (savedPosts.length === 0) {
      dispatch(fetchSavedPosts())
    }
  }, [dispatch, activeSource]) // Keep minimal dependencies
  
  if (isAnyLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (anyError) {
    return <ErrorAlert message={anyError} />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <SectionTitle
        title="Content Feed"
        subtitle="Discover and interact with content from various platforms"
      />
      <div className="mt-6">
        <FeedList />
      </div>
    </div>
  )
}

export default FeedPage
