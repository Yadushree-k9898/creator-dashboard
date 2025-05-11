import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDashboard } from '@/redux/slices/userSlice';
import UserCreditStats from '@/components/dashboard/userDashboard/UserCreditStats';
import UserRecentActivity from '@/components/dashboard/userDashboard/UserRecentActivity';
import SavedFeedPage from '../Feed/SavedFeedPage';
import { LayoutDashboard, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading, error, dashboardLoaded } = useSelector((state) => state.user);
  const [theme, setTheme] = useState('light');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!dashboardLoaded) {
        await dispatch(fetchUserDashboard());
      }
    };

    loadDashboard();
    
    // Animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');

    setTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      clearTimeout(timer);
    };
  }, [dispatch, dashboardLoaded]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchUserDashboard()).finally(() => {
      setTimeout(() => setIsRefreshing(false), 600);
    });
  };

  if (loading && !dashboardLoaded) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-60"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-8 bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-6 rounded-lg shadow-md">
        <p className="font-bold text-lg">Error</p>
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4 border-red-300 hover:bg-red-50 text-red-600"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center p-12 text-gray-500 dark:text-gray-300">
        <LayoutDashboard className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <p className="text-lg">No dashboard data available.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full px-3 sm:px-4 py-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto space-y-6 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg mr-3">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </span>
              Your Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track your activity, credits, and saved content
            </p>
          </div>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="flex items-center gap-2" 
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        <UserCreditStats creditStats={dashboard.creditStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-[500px] sm:h-[600px]">
            <SavedFeedPage />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-[500px] sm:h-[600px]">
            <UserRecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;