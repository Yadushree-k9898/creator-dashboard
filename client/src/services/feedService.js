// import axios from "axios";
// import { useState, useEffect } from "react";

// const API_URL = "http://localhost:5000/api/feed";

// // Fetch Reddit posts with pagination
// export const fetchRedditPosts = async (page = 1) => {
//   try {
//     const response = await axios.get(`${API_URL}/reddit?page=${page}`);
//     return response.data.posts || [];
//   } catch (error) {
//     console.error("Error fetching Reddit posts:", error.response?.data || error.message);
//     return [];
//   }
// };

// // Fetch Dev.to posts with optional search query and pagination
// export const fetchDevToPosts = async (searchQuery = "", page = 1) => {
//   try {
//     const url = searchQuery
//       ? `${API_URL}/devto?q=${encodeURIComponent(searchQuery)}&page=${page}`
//       : `${API_URL}/devto?page=${page}`;
//     const response = await axios.get(url);
//     return response.data.posts || [];
//   } catch (error) {
//     console.error("Error fetching Dev.to posts:", error.response?.data || error.message);
//     return [];
//   }
// };

// export const useFetchPosts = (searchQuery = "", platform = "reddit") => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (loading || !hasMore) return;
//       setLoading(true);

//       try {
//         const fetchedPosts =
//           platform === "reddit"
//             ? await fetchRedditPosts(page)
//             : await fetchDevToPosts(searchQuery, page);

//         if (fetchedPosts.length > 0) {
//           setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
//         } else {
//           setHasMore(false);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [page, searchQuery, platform]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return { posts, loading, loadMore, hasMore };
// };

// // Save a post
// export const savePost = async (postData) => {
//   try {
//     const response = await axios.post(`${API_URL}/save`, postData);
//     return response.data;
//   } catch (error) {
//     console.error("Error saving post:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Report a post
// export const reportPost = async (postData) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found. Please log in.");
//     const response = await axios.post(`${API_URL}/report`, postData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error reporting post:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Share a post
// export const sharePost = async (postData) => {
//   try {
//     const response = await axios.post(`${API_URL}/share`, postData);
//     return response.data;
//   } catch (error) {
//     console.error("Error sharing post:", error.response?.data || error.message);
//     throw error;
//   }
// };


// export const getSavedPosts = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found. Please log in.");

//     const parsedToken = JSON.parse(token); // Parse the token to extract the accessToken
//     if (!parsedToken.accessToken) throw new Error("No access token found. Please log in.");

//     const response = await axios.get(`${API_URL}/saved`, {
//       headers: {
//         Authorization: `Bearer ${parsedToken.accessToken}`, // Use accessToken here
//       },
//     });
//     return response.data.posts || [];
//   } catch (error) {
//     console.error("Error fetching saved posts:", error.response?.data || error.message);
//     return [];
//   }
// };





"use client"

import { useEffect } from "react"

import { useState } from "react"

import axios from "axios"
import { getAuthToken } from "../utils/localStorage"

const API_URL = "http://localhost:5000/api/feed"

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Fetch Reddit posts with pagination
export const fetchRedditPosts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/reddit?page=${page}`)
    return response.data.posts || []
  } catch (error) {
    console.error("Error fetching Reddit posts:", error.response?.data || error.message)
    return []
  }
}

// Fetch Dev.to posts with optional search query and pagination
export const fetchDevToPosts = async (searchQuery = "", page = 1) => {
  try {
    const url = searchQuery
      ? `${API_URL}/devto?q=${encodeURIComponent(searchQuery)}&page=${page}`
      : `${API_URL}/devto?page=${page}`
    const response = await axios.get(url)
    return response.data.posts || []
  } catch (error) {
    console.error("Error fetching Dev.to posts:", error.response?.data || error.message)
    return []
  }
}

export const useFetchPosts = (searchQuery = "", platform = "reddit") => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading || !hasMore) return
      setLoading(true)

      try {
        const fetchedPosts =
          platform === "reddit" ? await fetchRedditPosts(page) : await fetchDevToPosts(searchQuery, page)

        if (fetchedPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...fetchedPosts])
        } else {
          setHasMore(false)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, searchQuery, platform])

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  return { posts, loading, loadMore, hasMore }
}

// Save a post
export const savePost = async (postData) => {
  try {
    const headers = getAuthHeaders()
    if (!Object.keys(headers).length) {
      throw new Error("No authentication token found. Please log in.")
    }

    const response = await axios.post(`${API_URL}/save`, postData, { headers })
    return response.data
  } catch (error) {
    console.error("Error saving post:", error.response?.data || error.message)
    throw error
  }
}

// Report a post
export const reportPost = async (postData) => {
  try {
    const headers = getAuthHeaders()
    if (!Object.keys(headers).length) {
      throw new Error("No authentication token found. Please log in.")
    }

    const response = await axios.post(`${API_URL}/report`, postData, { headers })
    return response.data
  } catch (error) {
    console.error("Error reporting post:", error.response?.data || error.message)
    throw error
  }
}

// Share a post
export const sharePost = async (postData) => {
  try {
    const headers = getAuthHeaders()
    if (!Object.keys(headers).length) {
      throw new Error("No authentication token found. Please log in.")
    }

    const response = await axios.post(`${API_URL}/share`, postData, { headers })
    return response.data
  } catch (error) {
    console.error("Error sharing post:", error.response?.data || error.message)
    throw error
  }
}

// Get saved posts
export const getSavedPosts = async () => {
  try {
    const headers = getAuthHeaders()
    if (!Object.keys(headers).length) {
      throw new Error("No authentication token found. Please log in.")
    }

    const response = await axios.get(`${API_URL}/saved`, { headers })
    return response.data || []
  } catch (error) {
    console.error("Error fetching saved posts:", error.response?.data || error.message)
    return []
  }
}
