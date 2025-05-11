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

// Save post - async thunk to persist to backend
export const savePostToFeed = createAsyncThunk(
  "feed/savePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await feedService.savePost(postData);
      return { ...postData, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save post"
      );
    }
  }
);

// Report post - async thunk to persist to backend
export const reportPostFromFeed = createAsyncThunk(
  "feed/reportPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await feedService.reportPost(postData);
      return { ...postData, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to report post"
      );
    }
  }
);

// Share post - async thunk to persist to backend
export const sharePostFromFeed = createAsyncThunk(
  "feed/sharePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await feedService.sharePost(postData);
      return { ...postData, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to share post"
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
  savePostLoading: false,
  reportPostLoading: false,
  sharePostLoading: false,

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

      // SAVE POST
      .addCase(savePostToFeed.pending, (state) => {
        state.savePostLoading = true;
      })
      .addCase(savePostToFeed.fulfilled, (state, action) => {
        state.savePostLoading = false;

        // Add to savedPosts if not already there
        const existingPostIndex = state.savedPosts.findIndex(
          (savedPost) => savedPost.postId === action.payload.postId || savedPost.url === action.payload.url
        );

        if (existingPostIndex === -1) {
          state.savedPosts.push({
            ...action.payload,
            saved: true,
            savedAt: new Date().toISOString(),
          });
        } else {
          state.savedPosts[existingPostIndex].saved = true;
        }

        // Update in allPosts
        const allPostIndex = state.allPosts.findIndex(
          (item) => item.postId === action.payload.postId || item.url === action.payload.url
        );

        if (allPostIndex !== -1) {
          state.allPosts[allPostIndex].saved = true;
        }

        // Update in source-specific arrays
        if (action.payload.source === "Reddit") {
          const redditIndex = state.redditPosts.findIndex(
            (post) => post.postId === action.payload.postId || post.url === action.payload.url
          );
          if (redditIndex !== -1) {
            state.redditPosts[redditIndex].saved = true;
          }
        } else if (action.payload.source === "Dev.to") {
          const devtoIndex = state.devtoPosts.findIndex(
            (post) => post.postId === action.payload.postId || post.url === action.payload.url
          );
          if (devtoIndex !== -1) {
            state.devtoPosts[devtoIndex].saved = true;
          }
        }
      })
      .addCase(savePostToFeed.rejected, (state, action) => {
        state.savePostLoading = false;
        state.error = action.payload;
      })

      // REPORT POST
      .addCase(reportPostFromFeed.pending, (state) => {
        state.reportPostLoading = true;
      })
      .addCase(reportPostFromFeed.fulfilled, (state, action) => {
        state.reportPostLoading = false;

        // Update in allPosts
        const allPostIndex = state.allPosts.findIndex(
          (item) => item.postId === action.payload.postId || item.url === action.payload.url
        );

        if (allPostIndex !== -1) {
          state.allPosts[allPostIndex].reported = true;
          state.allPosts[allPostIndex].reportReason = action.payload.reason;
        }

        // Update in savedPosts if it exists there
        const savedPostIndex = state.savedPosts.findIndex(
          (savedPost) => savedPost.postId === action.payload.postId || savedPost.url === action.payload.url
        );

        if (savedPostIndex !== -1) {
          state.savedPosts[savedPostIndex].reported = true;
          state.savedPosts[savedPostIndex].reportReason = action.payload.reason;
        }

        // Update in source-specific arrays
        if (action.payload.source === "Reddit") {
          const redditIndex = state.redditPosts.findIndex(
            (post) => post.postId === action.payload.postId || post.url === action.payload.url
          );
          if (redditIndex !== -1) {
            state.redditPosts[redditIndex].reported = true;
          }
        } else if (action.payload.source === "Dev.to") {
          const devtoIndex = state.devtoPosts.findIndex(
            (post) => post.postId === action.payload.postId || post.url === action.payload.url
          );
          if (devtoIndex !== -1) {
            state.devtoPosts[devtoIndex].reported = true;
          }
        }
      })
      .addCase(reportPostFromFeed.rejected, (state, action) => {
        state.reportPostLoading = false;
        state.error = action.payload;
      })

      // SHARE POST
      .addCase(sharePostFromFeed.pending, (state) => {
        state.sharePostLoading = true;
      })
      .addCase(sharePostFromFeed.fulfilled, (state, action) => {
        state.sharePostLoading = false;

        // Update in allPosts
        const allPostIndex = state.allPosts.findIndex(
          (item) => item.postId === action.payload.postId || item.url === action.payload.url
        );

        if (allPostIndex !== -1) {
          state.allPosts[allPostIndex].shared = true;
        }

        // Update in savedPosts if it exists there
        const savedPostIndex = state.savedPosts.findIndex(
          (savedPost) => savedPost.postId === action.payload.postId || savedPost.url === action.payload.url
        );

        if (savedPostIndex !== -1) {
          state.savedPosts[savedPostIndex].shared = true;
        }

        // Update in source-specific arrays
        if (action.payload.source === "Reddit") {
          const redditIndex = state.redditPosts.findIndex(
            (post) => post.postId === action.payload.postId || post.url === action.payload.url
          );
          if (redditIndex !== -1) {
            state.redditPosts[redditIndex].shared = true;
          }
        } else if (action.payload.source === "Dev.to") {
          const devtoIndex = state.devtoPosts.findIndex(
            (post) => post.postId === action.payload.postId || post.url === action.payload.url
          );
          if (devtoIndex !== -1) {
            state.devtoPosts[devtoIndex].shared = true;
          }
        }
      })
      .addCase(sharePostFromFeed.rejected, (state, action) => {
        state.sharePostLoading = false;
        state.error = action.payload;
      })
  },
});

// ======== EXPORTS =========
export const {
  setActiveSource,
  setSearchQuery,
  setPage,
  setItemsPerPage,
  resetFeedErrors,
} = feedSlice.actions;

export default feedSlice.reducer;