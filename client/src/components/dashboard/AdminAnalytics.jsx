// src/components/dashboard/AdminAnalytics.jsx
import React from 'react';
import { BarChart2, Users, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const AdminAnalytics = () => {
  // Mock data for analytics
  const stats = [
    { 
      title: 'Total Users', 
      value: '24,563', 
      change: '+12%', 
      trend: 'up',
      icon: <Users size={20} className="text-blue-500" /> 
    },
    { 
      title: 'Revenue', 
      value: '$12,485', 
      change: '+23%', 
      trend: 'up',
      icon: <TrendingUp size={20} className="text-green-500" /> 
    },
    { 
      title: 'Bounce Rate', 
      value: '24%', 
      change: '-8%', 
      trend: 'down',
      icon: <BarChart2 size={20} className="text-purple-500" /> 
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Analytics</h2>
        <div className="flex space-x-2">
          <select className="text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-1.5 transition-colors">
            Export
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">{stat.icon}</span>
                <span className={`text-sm font-medium flex items-center ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 p-6 text-center">
          <div className="inline-block h-48 w-full max-w-4xl">
            {/* This would be where you render a chart */}
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-700 dark:text-gray-300">Analytics chart would render here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;