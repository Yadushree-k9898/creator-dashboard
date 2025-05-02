import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as feedService from "../../services/feedService"

// Async thunks for API calls
export const fetchRedditFeed = createAsyncThunk("feed/fetchReddit", async (_, { rejectWithValue }) => {
  try {
    return await feedService.fetchRedditPosts()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch Reddit posts")
  }
})

export const fetchTwitterFeed = createAsyncThunk("feed/fetchTwitter", async (searchQuery, { rejectWithValue }) => {
  try {
    return await feedService.fetchTwitterPosts(searchQuery)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch Twitter posts")
  }
})

export const savePostToFeed = createAsyncThunk("feed/savePost", async (postData, { rejectWithValue }) => {
  try {
    return await feedService.savePost(postData)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to save post")
  }
})

export const reportPostFromFeed = createAsyncThunk("feed/reportPost", async (postData, { rejectWithValue }) => {
  try {
    return await feedService.reportPost(postData)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to report post")
  }
})

export const sharePostFromFeed = createAsyncThunk("feed/sharePost", async (postData, { rejectWithValue }) => {
  try {
    return await feedService.sharePost(postData)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to share post")
  }
})

export const fetchSavedPosts = createAsyncThunk("feed/fetchSaved", async (_, { rejectWithValue }) => {
  try {
    return await feedService.getSavedPosts()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch saved posts")
  }
})

// Initial state
const initialState = {
  redditPosts: [],
  twitterPosts: [],
  allPosts: [],
  savedPosts: [],
  loading: false,
  error: null,
  saveStatus: "idle",
  reportStatus: "idle",
  shareStatus: "idle",
  activeSource: "all",
  searchQuery: "",
}

// Create the slice
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setActiveSource: (state, action) => {
      state.activeSource = action.payload

      // Update allPosts based on the active source
      if (state.activeSource === "all") {
        state.allPosts = [...state.redditPosts, ...state.twitterPosts]
      } else if (state.activeSource === "reddit") {
        state.allPosts = [...state.redditPosts]
      } else if (state.activeSource === "twitter") {
        state.allPosts = [...state.twitterPosts]
      }

      // Sort by creation date (newest first)
      state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    resetStatus: (state) => {
      state.saveStatus = "idle"
      state.reportStatus = "idle"
      state.shareStatus = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reddit posts
      .addCase(fetchRedditFeed.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRedditFeed.fulfilled, (state, action) => {
        state.loading = false
        state.redditPosts = action.payload

        // Update allPosts if activeSource is 'all' or 'reddit'
        if (state.activeSource === "all" || state.activeSource === "reddit") {
          state.allPosts =
            state.activeSource === "all" ? [...action.payload, ...state.twitterPosts] : [...action.payload]

          // Sort by creation date (newest first)
          state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
      })
      .addCase(fetchRedditFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch Twitter posts
      .addCase(fetchTwitterFeed.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTwitterFeed.fulfilled, (state, action) => {
        state.loading = false
        state.twitterPosts = action.payload

        // Update allPosts if activeSource is 'all' or 'twitter'
        if (state.activeSource === "all" || state.activeSource === "twitter") {
          state.allPosts =
            state.activeSource === "all" ? [...state.redditPosts, ...action.payload] : [...action.payload]

          // Sort by creation date (newest first)
          state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
      })
      .addCase(fetchTwitterFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Save post
      .addCase(savePostToFeed.pending, (state) => {
        state.saveStatus = "loading"
        state.error = null
      })
      .addCase(savePostToFeed.fulfilled, (state, action) => {
        state.saveStatus = "succeeded"

        // Add the post to savedPosts if it's not already there
        const existingPost = state.savedPosts.find(
          (post) => post._id === action.payload.post._id || post.postId === action.payload.post.postId,
        )

        if (!existingPost) {
          state.savedPosts.push(action.payload.post)
        }
      })
      .addCase(savePostToFeed.rejected, (state, action) => {
        state.saveStatus = "failed"
        state.error = action.payload
      })

      // Report post
      .addCase(reportPostFromFeed.pending, (state) => {
        state.reportStatus = "loading"
        state.error = null
      })
      .addCase(reportPostFromFeed.fulfilled, (state, action) => {
        state.reportStatus = "succeeded"

        // Update the post in savedPosts if it exists
        state.savedPosts = state.savedPosts.map((post) =>
          post._id === action.payload.post._id || post.postId === action.payload.post.postId
            ? { ...post, reported: true }
            : post,
        )
      })
      .addCase(reportPostFromFeed.rejected, (state, action) => {
        state.reportStatus = "failed"
        state.error = action.payload
      })

      // Share post
      .addCase(sharePostFromFeed.pending, (state) => {
        state.shareStatus = "loading"
        state.error = null
      })
      .addCase(sharePostFromFeed.fulfilled, (state, action) => {
        state.shareStatus = "succeeded"

        // Update the post in savedPosts if it exists
        state.savedPosts = state.savedPosts.map((post) =>
          post._id === action.payload.post._id || post.postId === action.payload.post.postId
            ? { ...post, shared: true }
            : post,
        )
      })
      .addCase(sharePostFromFeed.rejected, (state, action) => {
        state.shareStatus = "failed"
        state.error = action.payload
      })

      // Fetch saved posts
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.loading = false
        state.savedPosts = action.payload
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// Export actions and reducer
export const { setActiveSource, setSearchQuery, resetStatus } = feedSlice.actions
export default feedSlice.reducer
