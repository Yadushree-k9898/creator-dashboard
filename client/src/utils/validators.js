/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  /**
   * Validate a password
   * @param {string} password - The password to validate
   * @returns {Object} Validation result with isValid and message
   */
  export const validatePassword = (password) => {
    if (!password) {
      return { isValid: false, message: "Password is required" }
    }
  
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" }
    }
  
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one uppercase letter" }
    }
  
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one lowercase letter" }
    }
  
    // Check for at least one number
    if (!/\d/.test(password)) {
      return { isValid: false, message: "Password must contain at least one number" }
    }
  
    return { isValid: true, message: "Password is valid" }
  }
  
  /**
   * Validate a name
   * @param {string} name - The name to validate
   * @returns {Object} Validation result with isValid and message
   */
  export const validateName = (name) => {
    if (!name) {
      return { isValid: false, message: "Name is required" }
    }
  
    if (name.length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters long" }
    }
  
    if (name.length > 50) {
      return { isValid: false, message: "Name must be less than 50 characters long" }
    }
  
    return { isValid: true, message: "Name is valid" }
  }
  
  /**
   * Validate a URL
   * @param {string} url - The URL to validate
   * @returns {boolean} Whether the URL is valid
   */
  export const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }
  
  /**
   * Validate a form object
   * @param {Object} form - The form object to validate
   * @param {Object} validationRules - The validation rules
   * @returns {Object} Validation errors
   */
  export const validateForm = (form, validationRules) => {
    const errors = {}
  
    Object.keys(validationRules).forEach((field) => {
      const value = form[field]
      const rules = validationRules[field]
  
      // Required validation
      if (rules.required && (!value || (typeof value === "string" && value.trim() === ""))) {
        errors[field] = rules.requiredMessage || `${field} is required`
        return
      }
  
      // Skip other validations if value is empty and not required
      if (!value && !rules.required) {
        return
      }
  
      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = rules.minLengthMessage || `${field} must be at least ${rules.minLength} characters`
        return
      }
  
      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] = rules.maxLengthMessage || `${field} must be less than ${rules.maxLength} characters`
        return
      }
  
      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field] = rules.patternMessage || `${field} is invalid`
        return
      }
  
      // Custom validation
      if (rules.validate) {
        const customError = rules.validate(value, form)
        if (customError) {
          errors[field] = customError
        }
      }
    })
  
    return errors
  }
  