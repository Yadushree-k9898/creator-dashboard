// src/components/layout/Footer.jsx
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Creator Dashboard. All rights reserved.
        </p>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by the Creator Team
          </span>
          
          <div className="flex space-x-3">
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;