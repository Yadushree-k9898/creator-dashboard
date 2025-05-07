import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDashboard } from '@/redux/slices/userSlice';
import UserCreditStats from '@/components/dashboard/userDashboard/UserCreditStats';
import UserRecentActivity from '@/components/dashboard/userDashboard/UserRecentActivity';
import SavedFeedPage from '../Feed/SavedFeedPage';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading, error, dashboardLoaded } = useSelector((state) => state.user);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadDashboard = async () => {
      if (!dashboardLoaded) {
        await dispatch(fetchUserDashboard());
      }
    };

    loadDashboard();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');

    setTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [dispatch, dashboardLoaded]);

  if (loading && !dashboardLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-60"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 mx-auto rounded-lg shadow-md max-w-lg">
        <p className="font-bold text-lg">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center p-12 text-gray-500 dark:text-gray-300">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full px-4 py-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-semibold text-center text-gray-900 dark:text-white">Your Dashboard</h1>

        <UserCreditStats creditStats={dashboard.creditStats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800">
            <SavedFeedPage />
          </div>

          <div className="p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800">
            <UserRecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
