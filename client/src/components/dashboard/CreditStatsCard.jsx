// src/components/dashboard/CreditStatsCard.jsx
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  CreditCard,
  BarChart,
  Users
} from 'lucide-react';

const CreditStatsCard = ({ title, value, icon, change, changeType }) => {
  // Default values if not provided
  const defaultIcon = {
    'credits': <Zap className="text-yellow-500" size={20} />,
    'spending': <CreditCard className="text-blue-500" size={20} />,
    'usage': <BarChart className="text-purple-500" size={20} />,
    'followers': <Users className="text-green-500" size={20} />
  };

  const iconToRender = icon || defaultIcon[title.toLowerCase()] || <Zap className="text-yellow-500" size={20} />;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2">
            {iconToRender}
          </div>
          
          {change && (
            <div className={`flex items-center text-sm font-medium
              ${changeType === 'positive' 
                ? 'text-green-600 dark:text-green-500' 
                : changeType === 'negative' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {changeType === 'positive' ? (
                <ArrowUpRight size={16} className="mr-1" />
              ) : changeType === 'negative' ? (
                <ArrowDownRight size={16} className="mr-1" />
              ) : null}
              {change}
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
          {value}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {title}
        </p>
      </div>
      
      {/* Optional bottom progress section - can be shown conditionally */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400">Usage</span>
          <span className="text-gray-900 dark:text-white font-medium">64%</span>
        </div>
        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full" style={{ width: '64%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CreditStatsCard;