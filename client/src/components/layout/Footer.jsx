import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Creator Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              A platform for creators to manage their profile, earn credits, and interact with content through a
              personalized feed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Have questions or feedback? <br />
              <a href="mailto:support@creatordashboard.com" className="text-primary hover:underline">
                support@creatordashboard.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} Creator Dashboard. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
