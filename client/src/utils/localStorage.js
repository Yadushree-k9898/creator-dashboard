// import { TOKEN_KEY, USER_KEY } from '../utils/constants'


// export const getStorageItem = (key, defaultValue = null) => {
//   try {
//     const item = localStorage.getItem(key)
//     if (item === null) return defaultValue

//     try {
//       return JSON.parse(item)
//     } catch {
//       return item
//     }
//   } catch (error) {
//     console.error("Error accessing localStorage:", error)
//     return defaultValue
//   }
// }

// /**
//  * Set an item in localStorage
//  */
// export const setStorageItem = (key, value) => {
//   try {
//     const serializedValue = typeof value === "object" ? JSON.stringify(value) : value
//     localStorage.setItem(key, serializedValue)
//     return true
//   } catch (error) {
//     console.error("Error setting localStorage item:", error)
//     return false
//   }
// }

// /**
//  * Remove an item from localStorage
//  */
// export const removeStorageItem = (key) => {
//   try {
//     localStorage.removeItem(key)
//     return true
//   } catch (error) {
//     console.error("Error removing localStorage item:", error)
//     return false
//   }
// }

// /**
//  * Clear all localStorage
//  */
// export const clearStorage = () => {
//   try {
//     localStorage.clear()
//     return true
//   } catch (error) {
//     console.error("Error clearing localStorage:", error)
//     return false
//   }
// }

// /**
//  * Get all saved posts
//  */
// export const getSavedPosts = () => getStorageItem("saved_posts", [])

// /**
//  * Save a post to localStorage
//  */
// export const savePost = (post) => {
//   try {
//     const savedPosts = getSavedPosts()
//     if (savedPosts.some((p) => p.id === post.id)) return true

//     const updatedPosts = [...savedPosts, { ...post, savedAt: new Date().toISOString() }]
//     return setStorageItem("saved_posts", updatedPosts)
//   } catch (error) {
//     console.error("Error saving post:", error)
//     return false
//   }
// }

// /**
//  * Remove a saved post by ID
//  */
// export const removeSavedPost = (postId) => {
//   try {
//     const savedPosts = getSavedPosts()
//     const updatedPosts = savedPosts.filter((post) => post.id !== postId)
//     return setStorageItem("saved_posts", updatedPosts)
//   } catch (error) {
//     console.error("Error removing saved post:", error)
//     return false
//   }
// }

// // ✅ Export token and user helpers
// export const saveToken = (token) => setStorageItem(TOKEN_KEY, token)
// export const getToken = () => getStorageItem(TOKEN_KEY)
// export const removeToken = () => removeStorageItem(TOKEN_KEY)

// export const saveUser = (user) => setStorageItem(USER_KEY, user)
// export const getUser = () => getStorageItem(USER_KEY)
// export const removeUser = () => removeStorageItem(USER_KEY)


/**
 * Get an item from localStorage and parse it as JSON if possible.
 * @param {string} key - The key to fetch from localStorage.
 * @param {any} defaultValue - The default value if the key is not found.
 * @returns {any} - The parsed value or the default value.
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    // Try to parse the item as JSON
    try {
      return JSON.parse(item);
    } catch (err) {
      // Return the string if it's not JSON
      return item;
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage.
 * @param {string} key - The key to store the item under.
 * @param {any} value - The value to store.
 * @returns {boolean} - Returns true if successful, false otherwise.
 */
export const setStorageItem = (key, value) => {
  try {
    const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error("Error setting localStorage item:", error);
    return false;
  }
};

/**
 * Remove an item from localStorage.
 * @param {string} key - The key of the item to remove.
 * @returns {boolean} - Returns true if successful, false otherwise.
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing localStorage item:", error);
    return false;
  }
};

/**
 * Clear all items from localStorage.
 * @returns {boolean} - Returns true if successful, false otherwise.
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

/**
 * Get all saved posts from localStorage.
 * @returns {Array} - Array of saved posts.
 */
export const getSavedPosts = () => getStorageItem("saved_posts", []);

/**
 * Save a post to localStorage.
 * @param {Object} post - The post object to save.
 * @returns {boolean} - Returns true if the post was saved, false otherwise.
 */
export const savePost = (post) => {
  try {
    const savedPosts = getSavedPosts();
    if (savedPosts.some((p) => p.id === post.id)) return true;

    const updatedPosts = [...savedPosts, { ...post, savedAt: new Date().toISOString() }];
    return setStorageItem("saved_posts", updatedPosts);
  } catch (error) {
    console.error("Error saving post:", error);
    return false;
  }
};

/**
 * Remove a saved post by ID.
 * @param {string} postId - The ID of the post to remove.
 * @returns {boolean} - Returns true if the post was removed, false otherwise.
 */
export const removeSavedPost = (postId) => {
  try {
    const savedPosts = getSavedPosts();
    const updatedPosts = savedPosts.filter((post) => post.id !== postId);
    return setStorageItem("saved_posts", updatedPosts);
  } catch (error) {
    console.error("Error removing saved post:", error);
    return false;
  }
};

/**
 * Save the token to localStorage.
 * @param {string} token - The token to save.
 * @returns {boolean} - Returns true if the token was saved, false otherwise.
 */
export const saveToken = (token) => setStorageItem("auth_token", token);

/**
 * Get the token from localStorage.
 * @returns {string|null} - The token or null if not found.
 */
export const getToken = () => getStorageItem("auth_token");

/**
 * Remove the token from localStorage.
 * @returns {boolean} - Returns true if the token was removed, false otherwise.
 */
export const removeToken = () => removeStorageItem("auth_token");

/**
 * Save the user data to localStorage.
 * @param {Object} user - The user object to save.
 * @returns {boolean} - Returns true if the user data was saved, false otherwise.
 */
export const saveUser = (user) => setStorageItem("user_data", user);

/**
 * Get the user data from localStorage.
 * @returns {Object|null} - The user data or null if not found.
 */
export const getUser = () => getStorageItem("user_data");

/**
 * Remove the user data from localStorage.
 * @returns {boolean} - Returns true if the user data was removed, false otherwise.
 */
export const removeUser = () => removeStorageItem("user_data");
