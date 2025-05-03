/**
 * Section Title component for page sections
 * @param {string} title - The main title text
 * @param {string} subtitle - Optional subtitle text
 * @param {React.ReactNode} action - Optional action button or component
 * @param {string} className - Additional CSS classes
 */
const SectionTitle = ({ title, subtitle, action, className = "" }) => {
    return (
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 ${className}`}>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action && <div className="mt-3 sm:mt-0">{action}</div>}
      </div>
    )
  }
  
  export default SectionTitle
  