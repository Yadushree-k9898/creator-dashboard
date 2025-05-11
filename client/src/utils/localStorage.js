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

// STANDARDIZED TOKEN HANDLING
const AUTH_TOKEN_KEY = "auth_token";

/**
 * Save the token(s) to localStorage with consistent format.
 * @param {Object|string} token - The token object or string
 * @returns {boolean} - Returns true if the token was saved, false otherwise.
 */
export const saveToken = (token) => {
  try {
    // Standardize token format
    let tokenToStore = token;
    
    // If it's a string, convert to object format
    if (typeof token === 'string') {
      tokenToStore = { accessToken: token, refreshToken: null };
    } 
    // If it's an object but missing refreshToken
    else if (token && typeof token === 'object' && token.accessToken && !token.refreshToken) {
      tokenToStore = { ...token, refreshToken: null };
    }
    
    // Store token
    setStorageItem(AUTH_TOKEN_KEY, tokenToStore);
    console.log("Token saved successfully:", tokenToStore);
    return true;
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
    return false;
  }
};

/**
 * Get the token from localStorage.
 * @returns {Object|null} - The token object or null if not found.
 */
export const getToken = () => {
  try {
    const token = getStorageItem(AUTH_TOKEN_KEY);
    
    // If token is a string, convert to object format
    if (typeof token === 'string') {
      return { accessToken: token, refreshToken: null };
    }
    
    return token;
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

/**
 * Get just the access token string
 * @returns {string|null} - The access token string or null
 */
export const getAccessToken = () => {
  const token = getToken();
  return token?.accessToken || null;
};

/**
 * Remove the token(s) from localStorage.
 * @returns {boolean} - Returns true if the tokens were removed, false otherwise.
 */
export const removeToken = () => {
  return removeStorageItem(AUTH_TOKEN_KEY);
};

/**
 * Get auth headers for API requests
 * @returns {Object} - Headers object with Authorization if token exists
 */
export const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
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