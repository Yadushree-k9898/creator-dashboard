import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDashboard } from '../../redux/slices/userSlice';
import { Card } from '@/components/ui/Card'; // Reusable Card component
import Loader from '../common/Loader'; // Reusable Loader component
import { formatDate } from '../../utils/formatDate';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const {
    userProfile,
    userCredits,
    userPosts,
    activityLog,
    loading,
    error
  } = useSelector(state => state.user || {});

  useEffect(() => {
    dispatch(fetchUserDashboard());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  // Default fallbacks in case userProfile is empty or missing
  const { name = "User", email = "No email provided", role = "N/A" } = userProfile || {};
  const credits = userCredits || { totalCredits: 0, loginPoints: 0, profileCompletionPoints: 0, interactionPoints: 0 };
  const posts = userPosts || [];
  const activities = activityLog || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Welcome, {name}</h1>

      {/* User Info Card */}
      <Card title="Profile Information">
        <div className="space-y-4">
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Role:</span> {role}</p>
          <p><span className="font-semibold">Credits:</span> {credits.totalCredits}</p>
        </div>
      </Card>

      {/* Credits Statistics */}
      <Card title="Credits Breakdown">
        <div className="space-y-4">
          <p><span className="font-semibold">Total Credits:</span> {credits.totalCredits}</p>
          <p><span className="font-semibold">Login Credits:</span> {credits.loginPoints}</p>
          <p><span className="font-semibold">Profile Completion Credits:</span> {credits.profileCompletionPoints}</p>
          <p><span className="font-semibold">Interaction Credits:</span> {credits.interactionPoints}</p>
        </div>
      </Card>

      {/* Saved Posts */}
      <Card title="Saved Posts">
        {posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post._id}>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts saved yet.</p>
        )}
      </Card>

      {/* Activity Log */}
      <Card title="Activity Log">
        {activities.length > 0 ? (
          <ul className="space-y-2">
            {activities.map((activity) => (
              <li key={activity._id} className="text-gray-700">
                <p>{activity.details} - <span className="text-sm text-gray-500">{formatDate(activity.timestamp)}</span></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activity yet.</p>
        )}
      </Card>
    </div>
  );
};

export default UserDashboard;
