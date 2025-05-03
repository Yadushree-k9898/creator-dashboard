"use client"

/**
 * Icon Button component for actions with icons
 * @param {React.ReactNode} icon - The icon to display
 * @param {string} label - Accessible label for the button
 * @param {function} onClick - Function to call when the button is clicked
 * @param {string} variant - The style variant (default, primary, secondary, danger)
 * @param {string} size - The size of the button (sm, md, lg)
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} className - Additional CSS classes
 */
const IconButton = ({
  icon,
  label,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  }

  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton
