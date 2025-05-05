// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import * as feedService from "../../services/feedService"

// // ======== ASYNC THUNKS =========

// // Reddit feed
// export const fetchRedditFeed = createAsyncThunk("feed/fetchReddit", async (_, { rejectWithValue }) => {
//   try {
//     const response = await feedService.fetchRedditPosts()
//     return Array.isArray(response) ? response : [] // Ensure it's an array
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch Reddit posts")
//   }
// })

// // Dev.to feed (✅ FIXED - added this thunk)
// export const fetchDevToPosts = createAsyncThunk("feed/fetchDevTo", async (_, { rejectWithValue }) => {
//   try {
//     const response = await feedService.fetchDevToPosts()
//     return Array.isArray(response) ? response : [] // Ensure it's an array
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch Dev.to posts")
//   }
// })

// // Save post
// export const savePostToFeed = createAsyncThunk("feed/savePost", async (postData, { rejectWithValue }) => {
//   try {
//     return await feedService.savePost(postData)
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to save post")
//   }
// })

// // Report post
// export const reportPostFromFeed = createAsyncThunk("feed/reportPost", async (postData, { rejectWithValue }) => {
//   try {
//     return await feedService.reportPost(postData)
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to report post")
//   }
// })

// // Share post
// export const sharePostFromFeed = createAsyncThunk("feed/sharePost", async (postData, { rejectWithValue }) => {
//   try {
//     return await feedService.sharePost(postData)
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to share post")
//   }
// })

// // Fetch saved posts
// export const fetchSavedPosts = createAsyncThunk("feed/fetchSaved", async (_, { rejectWithValue }) => {
//   try {
//     return await feedService.getSavedPosts()
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch saved posts")
//   }
// })

// // ======== INITIAL STATE =========
// const initialState = {
//   redditPosts: [],
//   twitterPosts: [],
//   devtoPosts: [],
//   allPosts: [],
//   savedPosts: [],
//   loading: false,
//   error: null,
//   saveStatus: "idle",
//   reportStatus: "idle",
//   shareStatus: "idle",
//   activeSource: "all",
//   searchQuery: "",
// }

// // ======== SLICE =========
// const feedSlice = createSlice({
//   name: "feed",
//   initialState,
//   reducers: {
//     setActiveSource: (state, action) => {
//       state.activeSource = action.payload

//       // Update allPosts based on active source
//       if (state.activeSource === "all") {
//         state.allPosts = [...state.redditPosts, ...state.twitterPosts, ...state.devtoPosts]
//       } else if (state.activeSource === "reddit") {
//         state.allPosts = [...state.redditPosts]
//       } else if (state.activeSource === "twitter") {
//         state.allPosts = [...state.twitterPosts]
//       } else if (state.activeSource === "devto") {
//         state.allPosts = [...state.devtoPosts]
//       }

//       // Sort allPosts by createdAt (descending)
//       state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload
//     },
//     resetStatus: (state) => {
//       state.saveStatus = "idle"
//       state.reportStatus = "idle"
//       state.shareStatus = "idle"
//       state.error = null
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // ===== REDDIT FEED =====
//       .addCase(fetchRedditFeed.pending, (state) => {
//         if (state.loading) return // Prevent redundant pending state updates
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchRedditFeed.fulfilled, (state, action) => {
//         state.loading = false
//         state.redditPosts = Array.isArray(action.payload) ? action.payload : [] // Ensure it's an array

//         if (state.activeSource === "all" || state.activeSource === "reddit") {
//           state.allPosts =
//             state.activeSource === "all"
//               ? [...action.payload, ...state.twitterPosts, ...state.devtoPosts]
//               : [...action.payload]

//           state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         }
//       })
//       .addCase(fetchRedditFeed.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       // ===== DEV.TO FEED (✅ FIXED) =====
//       .addCase(fetchDevToPosts.pending, (state) => {
//         if (state.loading) return // Prevent redundant pending state updates
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchDevToPosts.fulfilled, (state, action) => {
//         state.loading = false
//         state.devtoPosts = Array.isArray(action.payload) ? action.payload : [] // Ensure it's an array

//         if (state.activeSource === "all" || state.activeSource === "devto") {
//           state.allPosts =
//             state.activeSource === "all"
//               ? [...state.redditPosts, ...state.twitterPosts, ...action.payload]
//               : [...action.payload]

//           state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         }
//       })
//       .addCase(fetchDevToPosts.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })

//       // ===== SAVE POST =====
//       .addCase(savePostToFeed.pending, (state) => {
//         state.saveStatus = "loading"
//         state.error = null
//       })
//       .addCase(savePostToFeed.fulfilled, (state, action) => {
//         state.saveStatus = "succeeded"
//         const exists = state.savedPosts.find(
//           (post) => post._id === action.payload.post._id || post.postId === action.payload.post.postId,
//         )
//         if (!exists) {
//           state.savedPosts.push(action.payload.post)
//         }
//       })
//       .addCase(savePostToFeed.rejected, (state, action) => {
//         state.saveStatus = "failed"
//         state.error = action.payload
//       })

//       // ===== REPORT POST =====
//       .addCase(reportPostFromFeed.pending, (state) => {
//         state.reportStatus = "loading"
//         state.error = null
//       })
//       .addCase(reportPostFromFeed.fulfilled, (state, action) => {
//         state.reportStatus = "succeeded"
//         state.savedPosts = state.savedPosts.map((post) =>
//           post._id === action.payload.post._id || post.postId === action.payload.post.postId
//             ? { ...post, reported: true }
//             : post,
//         )
//       })
//       .addCase(reportPostFromFeed.rejected, (state, action) => {
//         state.reportStatus = "failed"
//         state.error = action.payload
//       })

//       // ===== SHARE POST =====
//       .addCase(sharePostFromFeed.pending, (state) => {
//         state.shareStatus = "loading"
//         state.error = null
//       })
//       .addCase(sharePostFromFeed.fulfilled, (state, action) => {
//         state.shareStatus = "succeeded"
//         state.savedPosts = state.savedPosts.map((post) =>
//           post._id === action.payload.post._id || post.postId === action.payload.post.postId
//             ? { ...post, shared: true }
//             : post,
//         )
//       })
//       .addCase(sharePostFromFeed.rejected, (state, action) => {
//         state.shareStatus = "failed"
//         state.error = action.payload
//       })

//       // ===== FETCH SAVED POSTS =====
//       .addCase(fetchSavedPosts.pending, (state) => {
//         if (state.loading) return // Prevent redundant pending state updates
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchSavedPosts.fulfilled, (state, action) => {
//         state.loading = false
//         state.savedPosts = action.payload
//       })
//       .addCase(fetchSavedPosts.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })
//   },
// })

// // ===== EXPORTS =====
// export const { setActiveSource, setSearchQuery, resetStatus } = feedSlice.actions
// export default feedSlice.reducer



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as feedService from "../../services/feedService";

// // ======== ASYNC THUNKS =========

// // Fetch Reddit feed
// export const fetchRedditFeed = createAsyncThunk("feed/fetchReddit", async (_, { rejectWithValue }) => {
//   try {
//     const response = await feedService.fetchRedditPosts();
//     return Array.isArray(response) ? response : [];
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch Reddit posts");
//   }
// });

// // Fetch Dev.to posts
// export const fetchDevToPosts = createAsyncThunk("feed/fetchDevTo", async (_, { rejectWithValue }) => {
//   try {
//     const response = await feedService.fetchDevToPosts();
//     return Array.isArray(response) ? response : [];
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch Dev.to posts");
//   }
// });

// // Fetch saved posts
// export const fetchSavedPosts = createAsyncThunk("feed/fetchSaved", async (_, { rejectWithValue }) => {
//   try {
//     return await feedService.getSavedPosts();
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to fetch saved posts");
//   }
// });

// // Report a post from the feed
// export const reportPostFromFeed = createAsyncThunk("feed/reportPost", async (postId, { rejectWithValue }) => {
//   try {
//     const response = await feedService.reportPost(postId); // Ensure this function exists
//     return response;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Failed to report post");
//   }
// });

// // ======== INITIAL STATE =========
// const initialState = {
//   redditPosts: [],
//   devtoPosts: [],
//   savedPosts: [],
//   allPosts: [],
//   activeSource: "all",
//   searchQuery: "",

//   redditLoading: false,
//   devtoLoading: false,
//   savedLoading: false,

//   error: null,
// };

// // ======== SLICE =========
// const feedSlice = createSlice({
//   name: "feed",
//   initialState,
//   reducers: {
//     setActiveSource: (state, action) => {
//       state.activeSource = action.payload;

//       if (state.activeSource === "all") {
//         state.allPosts = [...state.redditPosts, ...state.devtoPosts];
//       } else if (state.activeSource === "reddit") {
//         state.allPosts = [...state.redditPosts];
//       } else if (state.activeSource === "devto") {
//         state.allPosts = [...state.devtoPosts];
//       }

//       state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     resetFeedErrors: (state) => {
//       state.error = null;
//     },
//     // Save post to the feed
//     savePostToFeed: (state, action) => {
//       const post = action.payload;
//       state.savedPosts.push(post);
//       state.allPosts = [...state.savedPosts, ...state.redditPosts, ...state.devtoPosts];
//       state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     },
//     // Report a post from the feed
//     reportPostFromFeed: (state, action) => {
//       const { postId, status } = action.payload; // Assuming report status or reason is sent
//       const postIndex = state.allPosts.findIndex(post => post.id === postId);
//       if (postIndex !== -1) {
//         state.allPosts[postIndex].reported = status; // Add report status to the post
//       }
//     },
//     // Share post from the feed
//     sharePostFromFeed: (state, action) => {
//       const postId = action.payload; // Get postId to be shared
//       const postIndex = state.allPosts.findIndex(post => post.id === postId);
//       if (postIndex !== -1) {
//         // Share logic here, e.g., increment share count or handle further sharing functionality
//         state.allPosts[postIndex].shared = true; // Example field to indicate post is shared
//       }
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // REDDIT
//       .addCase(fetchRedditFeed.pending, (state) => {
//         state.redditLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchRedditFeed.fulfilled, (state, action) => {
//         state.redditLoading = false;
//         state.redditPosts = action.payload;
//         if (state.activeSource === "all" || state.activeSource === "reddit") {
//           state.allPosts = state.activeSource === "all" ? [...action.payload, ...state.devtoPosts] : [...action.payload];
//           state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         }
//       })
//       .addCase(fetchRedditFeed.rejected, (state, action) => {
//         state.redditLoading = false;
//         state.error = action.payload;
//       })
//       // DEVTO
//       .addCase(fetchDevToPosts.pending, (state) => {
//         state.devtoLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDevToPosts.fulfilled, (state, action) => {
//         state.devtoLoading = false;
//         state.devtoPosts = action.payload;
//         if (state.activeSource === "all" || state.activeSource === "devto") {
//           state.allPosts = state.activeSource === "all" ? [...state.redditPosts, ...action.payload] : [...action.payload];
//           state.allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         }
//       })
//       .addCase(fetchDevToPosts.rejected, (state, action) => {
//         state.devtoLoading = false;
//         state.error = action.payload;
//       })
//       // SAVED
//       .addCase(fetchSavedPosts.pending, (state) => {
//         state.savedLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchSavedPosts.fulfilled, (state, action) => {
//         state.savedLoading = false;
//         state.savedPosts = action.payload;
//       })
//       .addCase(fetchSavedPosts.rejected, (state, action) => {
//         state.savedLoading = false;
//         state.error = action.payload;
//       })
//       // REPORT
//       .addCase(reportPostFromFeed.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions
// export const {
//   setActiveSource,
//   setSearchQuery,
//   resetFeedErrors,
//   savePostToFeed,

//   sharePostFromFeed,
// } = feedSlice.actions;

// export default feedSlice.reducer;



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
