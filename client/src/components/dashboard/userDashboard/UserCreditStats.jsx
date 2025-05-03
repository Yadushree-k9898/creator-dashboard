import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Award, Calendar, Users } from 'lucide-react';
import { StatCard, ProgressBar } from './StatComponents';
import userService from '@/services/userService'; // adjust this import path as needed

const UserCreditStats = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await userService.getDashboard();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
        setError('Unable to load credit data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const credits = dashboardData?.creditStats;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Credit Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-24 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !credits) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Credit Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-left text-sm bg-gray-100 p-4 rounded-md overflow-x-auto">
            {dashboardData
              ? JSON.stringify(dashboardData, null, 2)
              : error || 'Unable to load data.'}
          </pre>
        </CardContent>
      </Card>
    );
  }

  const creditData = {
    totalCredits: Number(credits.totalCredits) || 0,
    loginCredits: Number(credits.loginCredits) || 0,
    profileCredits: Number(credits.profileCredits) || 0,
    interactionCredits: Number(credits.interactionCredits) || 0,
  };

  const totalCredits =
    creditData.totalCredits ||
    creditData.loginCredits + creditData.profileCredits + creditData.interactionCredits;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2 h-5 w-5" />
          Credit Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StatCard
            title="Total Credits"
            value={totalCredits}
            icon={<Coins className="h-5 w-5" />}
            description="Your total earned credits"
          />
          <StatCard
            title="Login Credits"
            value={creditData.loginCredits}
            icon={<Calendar className="h-5 w-5" />}
            description="Credits earned from daily logins"
          />
          <StatCard
            title="Profile Credits"
            value={creditData.profileCredits}
            icon={<Users className="h-5 w-5" />}
            description="Credits from profile completion"
          />
          <StatCard
            title="Interaction Credits"
            value={creditData.interactionCredits}
            icon={<Award className="h-5 w-5" />}
            description="Credits from post interactions"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium mb-2">Credit Breakdown</h3>
          <ProgressBar value={creditData.loginCredits} max={totalCredits} label="Login Credits" className="mb-3" />
          <ProgressBar
            value={creditData.profileCredits}
            max={totalCredits}
            label="Profile Credits"
            className="mb-3"
          />
          <ProgressBar value={creditData.interactionCredits} max={totalCredits} label="Interaction Credits" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCreditStats;
