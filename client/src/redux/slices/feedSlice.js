import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as feedService from "../../services/feedService";

// ======== ASYNC THUNKS =========

// Fetch Reddit feed
export const fetchRedditFeed = createAsyncThunk(
  "feed/fetchReddit",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    if (state.feed.redditPosts.length > 0) {
      return state.feed.redditPosts; // Avoid refetching
    }

    try {
      const response = await feedService.fetchRedditPosts();
      return Array.isArray(response) ? response : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Reddit posts"
      );
    }
  }
);

// Fetch Dev.to posts
export const fetchDevToPosts = createAsyncThunk(
  "feed/fetchDevTo",
  async (searchQuery = "", { getState, rejectWithValue }) => {
    // If a search query is provided, always fetch new results
    const state = getState();
    if (state.feed.devtoPosts.length > 0 && !searchQuery) {
      return state.feed.devtoPosts; // Avoid refetching if no search query
    }

    try {
      const response = await feedService.fetchDevToPosts(searchQuery);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Dev.to posts"
      );
    }
  }
);

// Fetch saved posts
export const fetchSavedPosts = createAsyncThunk(
  "feed/fetchSaved",
  async (_, { rejectWithValue }) => {
    try {
      return await feedService.getSavedPosts();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch saved posts"
      );
    }
  }
);

// Report post
export const reportPostFromFeed = createAsyncThunk(
  "feed/reportPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await feedService.reportPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to report post"
      );
    }
  }
);

// ======== INITIAL STATE =========
const initialState = {
  redditPosts: [],
  devtoPosts: [],
  savedPosts: [],
  allPosts: [],
  activeSource: "all",
  searchQuery: "",
  page: 1, // pagination
  itemsPerPage: 5, // default items per page

  loading: false, // Combined loading state
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
      state.page = 1; // Reset to first page when changing sources

      if (state.activeSource === "all") {
        state.allPosts = [...state.redditPosts, ...state.devtoPosts];
      } else if (state.activeSource === "reddit") {
        state.allPosts = [...state.redditPosts];
      } else if (state.activeSource === "devto") {
        state.allPosts = [...state.devtoPosts];
      }

      state.allPosts.sort(
        (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1; // Reset to first page when searching
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.page = 1; // Reset to first page when changing items per page
    },
    resetFeedErrors: (state) => {
      state.error = null;
    },
    savePostToFeed: (state, action) => {
      const post = action.payload;
      // Check if the post is already saved
      const existingPostIndex = state.savedPosts.findIndex(
        (savedPost) => savedPost.postId === post.postId || savedPost.url === post.url
      );
      
      if (existingPostIndex === -1) {
        state.savedPosts.push(post);
      }
      
      // Update the saved status in allPosts
      const allPostIndex = state.allPosts.findIndex(
        (item) => item.postId === post.postId || item.url === post.url
      );
      
      if (allPostIndex !== -1) {
        state.allPosts[allPostIndex].saved = true;
      }
    },
    sharePostFromFeed: (state, action) => {
      const post = action.payload;
      const postIndex = state.allPosts.findIndex(
        (item) => item.postId === post.postId || item.url === post.url
      );
      
      if (postIndex !== -1) {
        state.allPosts[postIndex].shared = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // REDDIT
      .addCase(fetchRedditFeed.pending, (state) => {
        if (state.redditPosts.length === 0) {
          state.redditLoading = true;
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchRedditFeed.fulfilled, (state, action) => {
        state.redditLoading = false;
        state.loading = state.devtoLoading || state.savedLoading;
        state.redditPosts = action.payload;

        if (state.activeSource === "all" || state.activeSource === "reddit") {
          state.allPosts =
            state.activeSource === "all"
              ? [...action.payload, ...state.devtoPosts]
              : [...action.payload];

          state.allPosts.sort(
            (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
          );
        }
      })
      .addCase(fetchRedditFeed.rejected, (state, action) => {
        state.redditLoading = false;
        state.loading = state.devtoLoading || state.savedLoading;
        state.error = action.payload;
      })

      // DEVTO
      .addCase(fetchDevToPosts.pending, (state) => {
        state.devtoLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevToPosts.fulfilled, (state, action) => {
        state.devtoLoading = false;
        state.loading = state.redditLoading || state.savedLoading;
        state.devtoPosts = action.payload;

        if (state.activeSource === "all" || state.activeSource === "devto") {
          state.allPosts =
            state.activeSource === "all"
              ? [...state.redditPosts, ...action.payload]
              : [...action.payload];

          state.allPosts.sort(
            (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
          );
        }
      })
      .addCase(fetchDevToPosts.rejected, (state, action) => {
        state.devtoLoading = false;
        state.loading = state.redditLoading || state.savedLoading;
        state.error = action.payload;
      })

      // SAVED
      .addCase(fetchSavedPosts.pending, (state) => {
        state.savedLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedLoading = false;
        state.loading = state.redditLoading || state.devtoLoading;
        state.savedPosts = action.payload;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.savedLoading = false;
        state.loading = state.redditLoading || state.devtoLoading;
        state.error = action.payload;
      })

      // REPORT
      .addCase(reportPostFromFeed.pending, (state) => {
        // Optional loading state for reporting
      })
      .addCase(reportPostFromFeed.fulfilled, (state, action) => {
        const { postId, url, reason } = action.payload;
        
        // Update the post in allPosts
        const postIndex = state.allPosts.findIndex(
          (post) => post.postId === postId || post.url === url
        );
        
        if (postIndex !== -1) {
          state.allPosts[postIndex].reported = true;
          state.allPosts[postIndex].reportReason = reason;
        }
      })
      .addCase(reportPostFromFeed.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// ======== EXPORTS =========
export const {
  setActiveSource,
  setSearchQuery,
  setPage,
  setItemsPerPage,
  resetFeedErrors,
  savePostToFeed,
  sharePostFromFeed,
} = feedSlice.actions;

export default feedSlice.reducer;