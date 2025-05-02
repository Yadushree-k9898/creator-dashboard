// src/components/dashboard/RecentActivity.jsx
import React from 'react';
import { 
  Clock, 
  Check, 
  AlertCircle, 
  MoreVertical,
  DollarSign,
  FileText,
  RefreshCcw,
  UserPlus
} from 'lucide-react';

const RecentActivity = ({ activities = [] }) => {
  // Use provided activities or default to these examples if none provided
  const defaultActivities = [
    {
      id: 1,
      type: 'payment',
      title: 'New payment received',
      description: 'You received $250.00 from John Smith',
      time: '10 minutes ago',
      status: 'success',
      icon: <DollarSign size={16} />
    },
    {
      id: 2,
      type: 'document',
      title: 'Documentation updated',
      description: 'API documentation has been updated',
      time: '2 hours ago',
      status: 'info',
      icon: <FileText size={16} />
    },
    {
      id: 3,
      type: 'system',
      title: 'System maintenance',
      description: 'System will undergo maintenance at 02:00 AM',
      time: '5 hours ago',
      status: 'warning',
      icon: <RefreshCcw size={16} />
    },
    {
      id: 4,
      type: 'user',
      title: 'New follower',
      description: 'Alex Johnson started following you',
      time: '1 day ago',
      status: 'success',
      icon: <UserPlus size={16} />
    }
  ];

  const activitiesToShow = activities.length > 0 ? activities : defaultActivities;

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500';
      case 'warning': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'error': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500';
      case 'info': 
      default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <Clock size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {activitiesToShow.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-start">
              <div className={`p-2 rounded-md mr-4 ${getStatusColor(activity.status)}`}>
                {activity.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.description}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{activity.time}</span>
              </div>
              
              <div>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="py-3 px-6 border-t border-gray-200 dark:border-gray-800 text-center">
        <button className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;