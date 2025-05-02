import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDashboard } from '@/redux/slices/userSlice';
import UserCreditStats from '@/components/dashboard/userDashboard/UserCreditStats';
import UserEngagementStats from '@/components/dashboard/userDashboard/UserEngagementStats';
import UserRecentActivity from '@/components/dashboard/userDashboard/UserRecentActivity';
import UserSavedPosts from '@/components/dashboard/userDashboard/UserSavedPosts';
import { User } from 'lucide-react';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector((state) => state.user);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    dispatch(fetchUserDashboard());
    
    // Check user's system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );
  
  if (!dashboard) return (
    <div className="text-center p-10 text-gray-500">No dashboard data available.</div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <header className={`py-6 px-6 mb-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <User size={28} className="text-indigo-500 mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Your Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                {dashboard.profile?.name?.charAt(0) || 'U'}
              </div>
              <span className="font-medium">
                {dashboard.profile?.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UserCreditStats 
            creditStats={dashboard.creditStats} 
            theme={theme} 
          />
          <UserEngagementStats 
            engagementStats={dashboard.engagementStats} 
            theme={theme} 
          />
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserSavedPosts 
              posts={dashboard.posts?.allPosts || []} 
              theme={theme} 
            />
            <UserRecentActivity 
              activity={dashboard.recentActivity} 
              theme={theme} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;