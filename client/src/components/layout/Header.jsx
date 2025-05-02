// src/components/layout/Header.jsx
import React from 'react';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  Menu,
  ChevronLeft
} from 'lucide-react';

const Header = ({ toggleSidebar, collapsed }) => {
  // This would be connected to your theme system
  const [darkMode, setDarkMode] = React.useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you would also toggle your actual dark mode
  };

  return (
    <header className={`fixed top-0 ${collapsed ? 'left-20' : 'left-64'} right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                      border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-40 transition-all duration-300`}>
      
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-4 h-8 w-8 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {collapsed ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="search" 
            className="py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search..." 
          />
        </div>
        
        <button className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center ml-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          <div className="ml-2 hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Creator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;