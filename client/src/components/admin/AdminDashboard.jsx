import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [userStats, setUserStats] = useState([]);
  const [feedStats, setFeedStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const users = await axios.get("/api/admin/user-stats");
        const feeds = await axios.get("/api/admin/feed-activity");
        setUserStats(users.data);
        setFeedStats(feeds.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-medium">User Statistics</h3>
        <pre>{JSON.stringify(userStats, null, 2)}</pre>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-medium">Feed Activity</h3>
        <pre>{JSON.stringify(feedStats, null, 2)}</pre>
      </div>
    </div>
  );
}
