import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as feedService from "../../services/feedService";

// ======== ASYNC THUNKS =========

// Fetch Reddit feed
export const fetchRedditFeed = createAsyncThunk("feed/fetchReddit", async (_, { getState, rejectWithValue }) => {
  const state = getState();
  if (state.feed.redditPosts.length > 0) {
    return state.feed.redditPosts; // Return existing data to avoid unnecessary API call
  }

  try {
    const response = await feedService.fetchRedditPosts();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch Reddit posts");
  }
});

// Fetch Dev.to posts
export const fetchDevToPosts = createAsyncThunk("feed/fetchDevTo", async (_, { getState, rejectWithValue }) => {
  const state = getState();
  if (state.feed.devtoPosts.length > 0) {
    return state.feed.devtoPosts; // Return existing data to avoid unnecessary API call
  }

  try {
    const response = await feedService.fetchDevToPosts();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch Dev.to posts");
  }
});

// Fetch saved posts
export const fetchSavedPosts = createAsyncThunk("feed/fetchSaved", async (_, { rejectWithValue }) => {
  try {
    return await feedService.getSavedPosts();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch saved posts");
  }
});

// Report a post from the feed
export const reportPostFromFeed = createAsyncThunk("feed/reportPost", async (postId, { rejectWithValue }) => {
  try {
    const response = await feedService.reportPost(postId);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to report post");
  }
});

// ======== INITIAL STATE =========
const initialState = {
  redditPosts: [],
  devtoPosts: [],
  savedPosts: [],
  allPosts: [],
  activeSource: "all",
  searchQuery: "",

  redditLoading: false,
  devtoLoading: false,
  savedLoading: false,

  error: null,
};

// ======== SLICE =========
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setActiveSource: (state, action) => {
      state.activeSource = action.payload;

      if (state.activeSource === "all") {
        state.allPosts = [...state.redditPosts, ...state.devtoPosts];
      } else if (state.activeSource === "reddit") {
        state.allPosts = [...state.redditPosts];
      } else if (state.activeSource === "devto") {
        state.allPosts = [...state.devtoPosts];
      }

      state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFeedErrors: (state) => {
      state.error = null;
    },
    // Save post to the feed
    savePostToFeed: (state, action) => {
      const post = action.payload;
      state.savedPosts.push(post);
      state.allPosts = [...state.savedPosts, ...state.redditPosts, ...state.devtoPosts];
      state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    // Report a post from the feed
    reportPostFromFeed: (state, action) => {
      const { postId, status } = action.payload; // Assuming report status or reason is sent
      const postIndex = state.allPosts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        state.allPosts[postIndex].reported = status; // Add report status to the post
      }
    },
    // Share post from the feed
    sharePostFromFeed: (state, action) => {
      const postId = action.payload; // Get postId to be shared
      const postIndex = state.allPosts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        // Share logic here, e.g., increment share count or handle further sharing functionality
        state.allPosts[postIndex].shared = true; // Example field to indicate post is shared
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // REDDIT
      .addCase(fetchRedditFeed.pending, (state) => {
        if (state.redditPosts.length === 0) { // Only set loading if data hasn't been fetched
          state.redditLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchRedditFeed.fulfilled, (state, action) => {
        state.redditLoading = false;
        state.redditPosts = action.payload;
        if (state.activeSource === "all" || state.activeSource === "reddit") {
          state.allPosts = state.activeSource === "all" ? [...action.payload, ...state.devtoPosts] : [...action.payload];
          state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      })
      .addCase(fetchRedditFeed.rejected, (state, action) => {
        state.redditLoading = false;
        state.error = action.payload;
      })
      // DEVTO
      .addCase(fetchDevToPosts.pending, (state) => {
        if (state.devtoPosts.length === 0) { // Only set loading if data hasn't been fetched
          state.devtoLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchDevToPosts.fulfilled, (state, action) => {
        state.devtoLoading = false;
        state.devtoPosts = action.payload;
        if (state.activeSource === "all" || state.activeSource === "devto") {
          state.allPosts = state.activeSource === "all" ? [...state.redditPosts, ...action.payload] : [...action.payload];
          state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      })
      .addCase(fetchDevToPosts.rejected, (state, action) => {
        state.devtoLoading = false;
        state.error = action.payload;
      })
      // SAVED
      .addCase(fetchSavedPosts.pending, (state) => {
        state.savedLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.savedPosts = action.payload;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.savedLoading = false;
        state.error = action.payload;
      })
      // REPORT
      .addCase(reportPostFromFeed.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setActiveSource,
  setSearchQuery,
  resetFeedErrors,
  savePostToFeed,
  sharePostFromFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
