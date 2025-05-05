// import axios from "axios"


// const API_URL = "http://localhost:5000/api/feed"

// // Fetch Reddit posts
// export const fetchRedditPosts = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/reddit`)
//     return response.data.posts
//   } catch (error) {
//     console.error("Error fetching Reddit posts:", error)
//     throw error
//   }
// }

// // Fetch Dev.to posts with optional search query
// export const fetchDevToPosts = async (searchQuery = "") => {
//   try {
//     const url = searchQuery
//       ? `${API_URL}/devto?q=${encodeURIComponent(searchQuery)}`
//       : `${API_URL}/devto`;

//     const response = await axios.get(url);
//     return response.data.posts;
//   } catch (error) {
//     console.error("Error fetching Dev.to posts:", error);
//     throw error;
//   }
// };


// // Save a post
// export const savePost = async (postData) => {
//   try {
//     const response = await axios.post(`${API_URL}/save`, postData)
//     return response.data
//   } catch (error) {
//     console.error("Error saving post:", error)
//     throw error
//   }
// }

// // Report a post
// export const reportPost = async (postData) => {
//   try {
//     const response = await axios.post(`${API_URL}/report`, postData)
//     return response.data
//   } catch (error) {
//     console.error("Error reporting post:", error)
//     throw error
//   }
// }

// // Share a post
// export const sharePost = async (postData) => {
//   try {
//     const response = await axios.post(`${API_URL}/share`, postData)
//     return response.data
//   } catch (error) {
//     console.error("Error sharing post:", error)
//     throw error
//   }
// }




// // export const getSavedPosts = async () => {
// //   try {
// //     const token = localStorage.getItem("token");
// //     const response = await axios.get(`${API_URL}/saved`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching saved posts:", error);
// //     throw error;
// //   }
// // }


// export const getSavedPosts = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("No token found. Please log in.");
//     }
    
//     const response = await axios.get(`${API_URL}/saved`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // Check if error has response from the API
//     if (error.response) {
//       console.error("API Error:", error.response.data);
//     } else {
//       console.error("Error fetching saved posts:", error);
//     }
//     throw error;
//   }
// };



import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/feed";

// Fetch Reddit posts with pagination
export const fetchRedditPosts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/reddit?page=${page}`);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    throw error;
  }
};

// Fetch Dev.to posts with optional search query and pagination
export const fetchDevToPosts = async (searchQuery = "", page = 1) => {
  try {
    const url = searchQuery
      ? `${API_URL}/devto?q=${encodeURIComponent(searchQuery)}&page=${page}`
      : `${API_URL}/devto?page=${page}`;

    const response = await axios.get(url);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching Dev.to posts:", error);
    throw error;
  }
};

export const useFetchPosts = (searchQuery = "", platform = "reddit") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // For pagination
  const [hasMore, setHasMore] = useState(true); // To track if there are more posts to load

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading || !hasMore) return; // Prevent multiple requests and stop if no more posts
      setLoading(true);

      try {
        const fetchedPosts =
          platform === "reddit"
            ? await fetchRedditPosts(page)
            : await fetchDevToPosts(searchQuery, page);

        if (fetchedPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
        } else {
          setHasMore(false); // No more posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, searchQuery, platform]); // Refetch posts when page, searchQuery, or platform changes

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page to fetch more posts
    }
  };

  return { posts, loading, loadMore, hasMore };
};

// Save a post
export const savePost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/save`, postData);
    return response.data;
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
};

// Report a post
export const reportPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/report`, postData);
    return response.data;
  } catch (error) {
    console.error("Error reporting post:", error);
    throw error;
  }
};

// Share a post
export const sharePost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/share`, postData);
    return response.data;
  } catch (error) {
    console.error("Error sharing post:", error);
    throw error;
  }
};

export const getSavedPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/saved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Check if error has response from the API
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Error fetching saved posts:", error);
    }
    throw error;
  }
};
