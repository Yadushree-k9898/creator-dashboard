// API endpoints
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.creatordashboard.com/api"
    : "http://localhost:5000/api"

// Auth constants
export const TOKEN_KEY = "creator_dashboard_token"
export const USER_KEY = "creator_dashboard_user"

// User roles
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
}

// Credit actions and values
export const CREDIT_ACTIONS = {
  DAILY_LOGIN: "daily_login",
  PROFILE_COMPLETION: "profile_completion",
  FEED_INTERACTION: "feed_interaction",
  CONTENT_SHARE: "content_share",
  CONTENT_SAVE: "content_save",
}

export const CREDIT_VALUES = {
  [CREDIT_ACTIONS.DAILY_LOGIN]: 5,
  [CREDIT_ACTIONS.PROFILE_COMPLETION]: 20,
  [CREDIT_ACTIONS.FEED_INTERACTION]: 2,
  [CREDIT_ACTIONS.CONTENT_SHARE]: 3,
  [CREDIT_ACTIONS.CONTENT_SAVE]: 1,
}

// Feed sources
export const FEED_SOURCES = {
  TWITTER: "twitter",
  REDDIT: "reddit",
  LINKEDIN: "linkedin",
}

// Pagination
export const DEFAULT_PAGE_SIZE = 10

// Report reasons
export const REPORT_REASONS = [
  "Inappropriate content",
  "Spam",
  "Misinformation",
  "Hate speech",
  "Violence",
  "Other",
]

// Local storage keys
export const STORAGE_KEYS = {
  THEME: "theme",
  SAVED_POSTS: "saved_posts",
  FEED_PREFERENCES: "feed_preferences",
}

// Dashboard tabs
export const DASHBOARD_TABS = {
  OVERVIEW: "overview",
  CREDITS: "credits",
  SAVED: "saved",
  ACTIVITY: "activity",
}

// Admin dashboard tabs
export const ADMIN_DASHBOARD_TABS = {
  OVERVIEW: "overview",
  USERS: "users",
  CREDITS: "credits",
  REPORTS: "reports",
}
