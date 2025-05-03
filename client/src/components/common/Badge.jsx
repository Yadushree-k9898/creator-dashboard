/**
 * Badge component for displaying status, counts, or labels
 * @param {string} variant - The style variant (default, success, warning, danger, info)
 * @param {string} text - The text to display in the badge
 * @param {string} className - Additional CSS classes
 */
const Badge = ({ variant = "default", text, className = "" }) => {
    const variantClasses = {
      default: "bg-gray-100 text-gray-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
      primary: "bg-indigo-100 text-indigo-800",
    }
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          variantClasses[variant]
        } ${className}`}
      >
        {text}
      </span>
    )
  }
  
  export default Badge
  