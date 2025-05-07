/**
 * Format a date to a readable string
 * @param {Date|string|number} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const defaultOptions = {
    format: "default", // 'default', 'relative', 'time', 'dateTime'
    includeTime: false,
  };

  const config = { ...defaultOptions, ...options };

  // Format as relative time (e.g., "2 hours ago")
  if (config.format === "relative") {
    return formatRelativeTime(dateObj);
  }

  // Format as time only (e.g., "14:30")
  if (config.format === "time") {
    return dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Format as date and time
  if (config.format === "dateTime" || config.includeTime) {
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Default format (date only)
  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
* Format a date as a relative time string (e.g., "2 hours ago")
* @param {Date} date - The date to format
* @returns {string} Relative time string
*/
export const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

/**
* Format a date range
* @param {Date|string|number} startDate - The start date
* @param {Date|string|number} endDate - The end date
* @returns {string} Formatted date range
*/
export const formatDateRange = (startDate, endDate) => {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date range";
  }

  // Same day
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(start)} ${formatDate(start, { format: "time" })} - ${formatDate(end, { format: "time" })}`;
  }

  // Different days
  return `${formatDate(start)} - ${formatDate(end)}`;
};
