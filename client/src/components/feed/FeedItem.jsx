import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Bookmark, Flag, ExternalLink } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  savePostToFeed,
  reportPostFromFeed,
  sharePostFromFeed,
} from "../../redux/slices/feedSlice"
import { ReportModal } from "./ReportModal"

const FeedItem = ({ post }) => {
  const dispatch = useDispatch()
  const { savedPosts } = useSelector((state) => state.feed)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const isSaved = savedPosts.some(
    (savedPost) => savedPost.postId === post.postId || savedPost.url === post.url
  )
  const isReported = savedPosts.some(
    (savedPost) =>
      (savedPost.postId === post.postId || savedPost.url === post.url) &&
      savedPost.reported
  )
  const isShared = savedPosts.some(
    (savedPost) =>
      (savedPost.postId === post.postId || savedPost.url === post.url) &&
      savedPost.shared
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleSave = () => {
    if (!isSaved) {
      dispatch(
        savePostToFeed({
          postId: post.postId,
          title: post.title,
          url: post.url,
          content: post.content,
          source: post.source,
        })
      )
    }
  }

  const handleReport = () => {
    setIsReportModalOpen(true)
  }

  const handleConfirmReport = (reason) => {
    dispatch(
      reportPostFromFeed({
        postId: post.postId,
        title: post.title,
        url: post.url,
        content: post.content,
        source: post.source,
        reason,
      })
    )
    setIsReportModalOpen(false)
  }

  const handleShare = () => {
    if (!isShared) {
      dispatch(
        sharePostFromFeed({
          postId: post.postId,
          title: post.title,
          url: post.url,
          content: post.content,
          source: post.source,
        })
      )
      navigator.clipboard
        .writeText(post.url)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Copy failed: ", err))
    }
  }

  return (
    <>
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
            <Badge>{post.source}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
            {post.content}
          </p>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm inline-flex items-center hover:underline"
          >
            Read more <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Posted on {formatDate(post.date || post.published_at)}
          </span>
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant={isSaved ? "secondary" : "ghost"}
              onClick={handleSave}
              disabled={isSaved}
              title="Save"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={isReported ? "secondary" : "ghost"}
              onClick={handleReport}
              disabled={isReported}
              title="Report"
            >
              <Flag className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={isShared ? "secondary" : "ghost"}
              onClick={handleShare}
              disabled={isShared}
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onConfirm={handleConfirmReport}
        post={post}
      />
    </>
  )
}

export default FeedItem
