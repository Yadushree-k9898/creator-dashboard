import { TOKEN_KEY, USER_KEY } from '../utils/constants'

/**
 * Get an item from localStorage with optional parsing
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue

    try {
      return JSON.parse(item)
    } catch {
      return item
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return defaultValue
  }
}

/**
 * Set an item in localStorage
 */
export const setStorageItem = (key, value) => {
  try {
    const serializedValue = typeof value === "object" ? JSON.stringify(value) : value
    localStorage.setItem(key, serializedValue)
    return true
  } catch (error) {
    console.error("Error setting localStorage item:", error)
    return false
  }
}

/**
 * Remove an item from localStorage
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing localStorage item:", error)
    return false
  }
}

/**
 * Clear all localStorage
 */
export const clearStorage = () => {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}

/**
 * Get all saved posts
 */
export const getSavedPosts = () => getStorageItem("saved_posts", [])

/**
 * Save a post to localStorage
 */
export const savePost = (post) => {
  try {
    const savedPosts = getSavedPosts()
    if (savedPosts.some((p) => p.id === post.id)) return true

    const updatedPosts = [...savedPosts, { ...post, savedAt: new Date().toISOString() }]
    return setStorageItem("saved_posts", updatedPosts)
  } catch (error) {
    console.error("Error saving post:", error)
    return false
  }
}

/**
 * Remove a saved post by ID
 */
export const removeSavedPost = (postId) => {
  try {
    const savedPosts = getSavedPosts()
    const updatedPosts = savedPosts.filter((post) => post.id !== postId)
    return setStorageItem("saved_posts", updatedPosts)
  } catch (error) {
    console.error("Error removing saved post:", error)
    return false
  }
}

// ✅ Export token and user helpers
export const saveToken = (token) => setStorageItem(TOKEN_KEY, token)
export const getToken = () => getStorageItem(TOKEN_KEY)
export const removeToken = () => removeStorageItem(TOKEN_KEY)

export const saveUser = (user) => setStorageItem(USER_KEY, user)
export const getUser = () => getStorageItem(USER_KEY)
export const removeUser = () => removeStorageItem(USER_KEY)
