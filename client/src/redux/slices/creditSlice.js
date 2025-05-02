import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// API base URL
const API_URL = "/api/users"

// Async thunks for API calls
export const fetchUserDashboard = createAsyncThunk("credits/fetchUserDashboard", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data")
  }
})

export const savePost = createAsyncThunk("credits/savePost", async (postData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/save-post`, postData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to save post")
  }
})

export const reportPost = createAsyncThunk("credits/reportPost", async (postId, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/report-post/${postId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to report post")
  }
})

export const sharePost = createAsyncThunk("credits/sharePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/share-post/${postId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to share post")
  }
})

// Initial state
const initialState = {
  dashboard: null,
  loading: false,
  error: null,
  savePostStatus: "idle",
  reportPostStatus: "idle",
  sharePostStatus: "idle",
}

// Create the slice
const creditSlice = createSlice({
  name: "credits",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.savePostStatus = "idle"
      state.reportPostStatus = "idle"
      state.sharePostStatus = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard
      .addCase(fetchUserDashboard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.dashboard = action.payload
      })
      .addCase(fetchUserDashboard.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Save post
      .addCase(savePost.pending, (state) => {
        state.savePostStatus = "loading"
        state.error = null
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.savePostStatus = "succeeded"

        // Update dashboard data with new saved post
        if (state.dashboard && action.payload) {
          // Update credit stats
          if (state.dashboard.creditStats && action.payload.credits) {
            state.dashboard.creditStats.totalCredits = action.payload.credits
            state.dashboard.creditStats.interactionCredits += 5 // Assuming 5 credits for saving
          }

          // Update engagement stats
          if (state.dashboard.engagementStats) {
            state.dashboard.engagementStats.totalSavedPosts += 1
          }

          // Add the new post to allPosts
          if (state.dashboard.posts && action.payload.savedPost) {
            state.dashboard.posts.allPosts = [
              {
                _id: action.payload.savedPost._id,
                title: action.payload.savedPost.title,
                source: action.payload.savedPost.source,
                url: action.payload.savedPost.url,
                content: action.payload.savedPost.content,
                isReported: false,
                isShared: false,
                createdAt: action.payload.savedPost.createdAt,
              },
              ...state.dashboard.posts.allPosts,
            ]
          }
        }
      })
      .addCase(savePost.rejected, (state, action) => {
        state.savePostStatus = "failed"
        state.error = action.payload
      })

      // Report post
      .addCase(reportPost.pending, (state) => {
        state.reportPostStatus = "loading"
        state.error = null
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        state.reportPostStatus = "succeeded"

        // Update dashboard data with reported post
        if (state.dashboard && action.payload) {
          // Update credit stats
          if (state.dashboard.creditStats && action.payload.credits) {
            state.dashboard.creditStats.totalCredits = action.payload.credits
            state.dashboard.creditStats.interactionCredits += 10 // Assuming 10 credits for reporting
          }

          // Update engagement stats
          if (state.dashboard.engagementStats) {
            state.dashboard.engagementStats.totalReportedPosts =
              action.payload.reportedPostsCount || state.dashboard.engagementStats.totalReportedPosts + 1
          }

          // Update the post in allPosts and add to reportedPosts
          if (state.dashboard.posts && action.payload.post) {
            // Update in allPosts
            state.dashboard.posts.allPosts = state.dashboard.posts.allPosts.map((post) =>
              post._id === action.payload.post._id ? { ...post, isReported: true } : post,
            )

            // Add to reportedPosts if not already there
            const existingPost = state.dashboard.posts.reportedPosts.find(
              (post) => post._id === action.payload.post._id,
            )

            if (!existingPost) {
              const postToAdd = state.dashboard.posts.allPosts.find((post) => post._id === action.payload.post._id)

              if (postToAdd) {
                state.dashboard.posts.reportedPosts.unshift(postToAdd)
              }
            }
          }
        }
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.reportPostStatus = "failed"
        state.error = action.payload
      })

      // Share post
      .addCase(sharePost.pending, (state) => {
        state.sharePostStatus = "loading"
        state.error = null
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.sharePostStatus = "succeeded"

        // Update dashboard data with shared post
        if (state.dashboard && action.payload) {
          // Update credit stats
          if (state.dashboard.creditStats && action.payload.credits) {
            state.dashboard.creditStats.totalCredits = action.payload.credits
            state.dashboard.creditStats.interactionCredits += 5 // Assuming 5 credits for sharing
          }

          // Update engagement stats
          if (state.dashboard.engagementStats) {
            state.dashboard.engagementStats.totalSharedPosts =
              action.payload.sharedPostsCount || state.dashboard.engagementStats.totalSharedPosts + 1
          }

          // Update the post in allPosts and add to sharedPosts
          if (state.dashboard.posts && action.payload.post) {
            // Update in allPosts
            state.dashboard.posts.allPosts = state.dashboard.posts.allPosts.map((post) =>
              post._id === action.payload.post._id ? { ...post, isShared: true } : post,
            )

            // Add to sharedPosts if not already there
            const existingPost = state.dashboard.posts.sharedPosts.find((post) => post._id === action.payload.post._id)

            if (!existingPost) {
              const postToAdd = state.dashboard.posts.allPosts.find((post) => post._id === action.payload.post._id)

              if (postToAdd) {
                state.dashboard.posts.sharedPosts.unshift(postToAdd)
              }
            }
          }
        }
      })
      .addCase(sharePost.rejected, (state, action) => {
        state.sharePostStatus = "failed"
        state.error = action.payload
      })
  },
})

// Export actions and reducer
export const { resetStatus } = creditSlice.actions
export default creditSlice.reducer
