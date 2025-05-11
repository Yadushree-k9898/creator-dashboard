"use client"
import { Button } from "@/components/ui/button"
import { Share2, Bookmark, Flag } from 'lucide-react'
import { useDispatch } from "react-redux"
import { savePostToFeed, reportPostFromFeed, sharePostFromFeed } from "../../redux/slices/feedSlice"
import { toast } from "@/components/ui/use-toast"

const FeedActions = ({ post, isSaved, isReported, isShared }) => {
  const dispatch = useDispatch()

  // Handle save post
  const handleSave = async () => {
    if (!isSaved) {
      try {
        await dispatch(
          savePostToFeed({
            postId: post.postId,
            title: post.title,
            url: post.url,
            content: post.content,
            source: post.source,
          })
        ).unwrap();
        toast({
          title: "Post saved",
          description: "Post has been saved to your collection",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to save post",
          variant: "destructive",
        });
      }
    }
  };

  // Handle report post
  const handleReport = async () => {
    if (!isReported) {
      try {
        await dispatch(
          reportPostFromFeed({
            postId: post.postId,
            title: post.title,
            url: post.url,
            content: post.content,
            source: post.source,
            reason: "inappropriate content" // Default reason, could be from a form
          })
        ).unwrap();
        toast({
          title: "Post reported",
          description: "Thank you for reporting this post",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to report post",
          variant: "destructive",
        });
      }
    }
  };

  // Handle share post
  const handleShare = async () => {
    if (!isShared) {
      try {
        await dispatch(
          sharePostFromFeed({
            postId: post.postId,
            title: post.title,
            url: post.url,
            content: post.content,
            source: post.source,
          })
        ).unwrap();
        await navigator.clipboard.writeText(post.url);
        toast({
          title: "Link copied",
          description: "Post link has been copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to share post",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSave}
        disabled={isSaved}
        className={isSaved ? "bg-green-50 text-green-600 border-green-200" : ""}
      >
        <Bookmark className="h-4 w-4 mr-1" />
        {isSaved ? "Saved" : "Save"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        disabled={isShared}
        className={isShared ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
      >
        <Share2 className="h-4 w-4 mr-1" />
        {isShared ? "Shared" : "Share"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleReport}
        disabled={isReported}
        className={isReported ? "bg-red-50 text-red-600 border-red-200" : ""}
      >
        <Flag className="h-4 w-4 mr-1" />
        {isReported ? "Reported" : "Report"}
      </Button>
    </div>
  )
}

export default FeedActions