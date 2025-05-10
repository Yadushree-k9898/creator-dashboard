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
 * Save the token(s) to localStorage.
 * @param {Object} tokens - The object containing accessToken and refreshToken.
 * @returns {boolean} - Returns true if the tokens were saved, false otherwise.
 */
export const saveToken = (tokens) => {
  try {
    if (tokens && tokens.accessToken && tokens.refreshToken) {
      localStorage.setItem("auth_token", JSON.stringify(tokens));
      console.log("Token saved successfully:", tokens);
      return true;
    }
    console.error("Invalid token structure:", tokens);
    return false;
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
    return false;
  }
};


export const getToken = () => {
  try {
    const tokenString = localStorage.getItem("auth_token");
    return tokenString ? JSON.parse(tokenString) : null;
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
    return null;
  }
};



/**
 * Remove the token(s) from localStorage.
 * @returns {boolean} - Returns true if the tokens were removed, false otherwise.
 */
export const removeToken = () => {
  try {
    localStorage.removeItem("auth_token");
    console.log("Token removed successfully");
    return true;
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
    return false;
  }
};

/**
 * Save the user data to localStorage.
 * @param {Object} user - The user object to save.
 * @returns {boolean} - Returns true if the user data was saved, false otherwise.
 */
export const saveUser = (user) => {
  return setStorageItem("user_data", user);
};

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

/**
 * Get all saved posts from the backend.
 * @returns {Promise<Array>} - Array of saved posts.
 */
export const getSavedPosts = async () => {
  try {
    const token = getToken(); // Use the standardized getToken function
    if (!token) throw new Error("No token found. Please log in.");

    const response = await axios.get(`${API_URL}/saved`, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching saved posts:", error.message);
    throw error;
  }
};

/**
 * Save a post to localStorage.
 * @param {Object} post - The post object to save.
 * @returns {boolean} - Returns true if the post was saved, false otherwise.
 */
export const savePost = async (post) => {
  try {
    const savedPosts = await getSavedPosts();
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
export const removeSavedPost = async (postId) => {
  try {
    const savedPosts = await getSavedPosts();
    const updatedPosts = savedPosts.filter((post) => post.id !== postId);
    return setStorageItem("saved_posts", updatedPosts);
  } catch (error) {
    console.error("Error removing saved post:", error);
    return false;
  }
};
