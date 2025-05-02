import React from 'react';

const SavedFeeds = ({ feeds }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-4">Saved Feeds (by Source)</h2>
    <ul className="space-y-2">
      {feeds?.map((feed, idx) => (
        <li key={idx} className="text-gray-700 dark:text-gray-300">
          {feed._id}: {feed.count}
        </li>
      ))}
    </ul>
  </div>
);

export default SavedFeeds;