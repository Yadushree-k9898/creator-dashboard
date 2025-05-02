// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Rss, 
  User, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ collapsed }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Feed', path: '/feed', icon: <Rss size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> }
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 ease-in-out
                  bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
                  shadow-sm ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className={`flex items-center ${collapsed ? 'justify-center p-4' : 'px-6 py-4'} border-b border-gray-200 dark:border-gray-800`}>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          {!collapsed && <span className="ml-3 font-semibold text-gray-900 dark:text-white text-lg">Creator</span>}
        </div>
      </div>

      <nav className={`flex flex-col ${collapsed ? 'px-2 py-4' : 'p-4'} space-y-1`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-2.5 rounded-md transition-all duration-200
               ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'}`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={`absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-800 ${collapsed ? 'p-2' : 'p-4'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-md ${collapsed ? 'p-2' : 'px-3 py-2.5'} cursor-pointer`}>
          <HelpCircle size={20} />
          {!collapsed && <span className="ml-3">Help & Support</span>}
        </div>
        <div className={`flex items-center ${collapsed ? 'justify-center mt-2' : 'mt-1'} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-md ${collapsed ? 'p-2' : 'px-3 py-2.5'} cursor-pointer`}>
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;