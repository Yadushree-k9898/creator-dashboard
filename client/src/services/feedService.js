import axios from "axios"


const API_URL = "http://localhost:5000/api/feed"

// Fetch Reddit posts
export const fetchRedditPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/reddit`)
    return response.data.posts
  } catch (error) {
    console.error("Error fetching Reddit posts:", error)
    throw error
  }
}

// Fetch Twitter posts with optional search query
// export const fetchTwitterPosts = async (searchQuery = "") => {
//   try {
//     const url = searchQuery ? `${API_URL}/twitter?q=${encodeURIComponent(searchQuery)}` : `${API_URL}/twitter`

//     const response = await axios.get(url)
//     return response.data.posts
//   } catch (error) {
//     console.error("Error fetching Twitter posts:", error)
//     throw error
//   }
// }

// Save a post
export const savePost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/save`, postData)
    return response.data
  } catch (error) {
    console.error("Error saving post:", error)
    throw error
  }
}

// Report a post
export const reportPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/report`, postData)
    return response.data
  } catch (error) {
    console.error("Error reporting post:", error)
    throw error
  }
}

// Share a post
export const sharePost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/share`, postData)
    return response.data
  } catch (error) {
    console.error("Error sharing post:", error)
    throw error
  }
}

// Get saved posts
export const getSavedPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/saved`)
    return response.data
  } catch (error) {
    console.error("Error fetching saved posts:", error)
    throw error
  }
}
