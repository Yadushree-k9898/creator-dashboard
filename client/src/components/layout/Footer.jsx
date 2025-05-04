// import { Link } from "react-router-dom"

// const Footer = () => {
//   return (
//     <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Creator Dashboard</h3>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               A platform for creators to manage their profile, earn credits, and interact with content through a
//               personalized feed.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/feed"
//                   className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
//                 >
//                   Feed
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/dashboard/user"
//                   className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
//                 >
//                   Dashboard
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               Have questions or feedback? <br />
//               <a href="mailto:support@creatordashboard.com" className="text-primary hover:underline">
//                 support@creatordashboard.com
//               </a>
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 pt-6 border-t dark:border-gray-700">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               © {new Date().getFullYear()} Creator Dashboard. All rights reserved.
//             </p>
//             <div className="flex space-x-4 mt-4 md:mt-0">
//               <Link
//                 to="/terms"
//                 className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
//               >
//                 Terms of Service
//               </Link>
//               <Link
//                 to="/privacy"
//                 className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm"
//               >
//                 Privacy Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="transform hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
              Creator Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              A platform for creators to manage their profile, earn credits, and interact with content through a
              personalized feed.
            </p>
          </div>

          <div className="transform hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative inline-block pr-6 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 group-hover:after:w-full after:transition-all after:duration-300">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative inline-block pr-6 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 group-hover:after:w-full after:transition-all after:duration-300">
                    Feed
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative inline-block pr-6 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 group-hover:after:w-full after:transition-all after:duration-300">
                    Dashboard
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="transform hover:translate-y-[-2px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">
              Contact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Have questions or feedback? <br />
              <a
                href="mailto:support@creatordashboard.com"
                className="text-primary hover:underline transition-all duration-200 hover:text-primary/80"
              >
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
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
