const { redisClient, getCache, setCache } = require('../utils/redisClient'); // Assuming you have a utils folder for Redis connection

// Simulate fetching Reddit posts (Update this to use Reddit's actual API if needed)
exports.fetchRedditPosts = async () => {
  const cacheKey = 'reddit:popular'; // Cache key to store posts in Redis

  try {
    // Check Redis cache first
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log('Cache hit for Reddit posts');
      return cachedData; // Return cached data if available
    }

    // If no cache, simulate fetching Reddit posts (replace with actual API calls if required)
    const posts = [
      {
        id: 'reddit1',
        source: 'Reddit',
        title: 'How to grow your startup using Reddit?',
        link: 'https://reddit.com/r/startups/post1',
        createdAt: new Date(),
      },
      {
        id: 'reddit2',
        source: 'Reddit',
        title: 'Top 10 growth hacking strategies',
        link: 'https://reddit.com/r/growthhacking/post2',
        createdAt: new Date(),
      },
    ];

    // Cache the fetched posts for 5 minutes (300 seconds)
    await setCache(cacheKey, posts, 300);
    console.log('Cache set for Reddit posts');

    return posts; // Return the posts

  } catch (err) {
    console.error('Error fetching Reddit posts:', err);
    // Handle error (e.g., fallback, alert user, or return empty data)
    throw new Error('Failed to fetch Reddit posts');
  }
};
