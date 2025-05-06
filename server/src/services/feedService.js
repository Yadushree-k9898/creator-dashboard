const { redisClient, getCache, setCache } = require('../utils/redisClient');

exports.fetchRedditPosts = async () => {
  const cacheKey = 'reddit:popular'; 

  try {
    // Check Redis cache first
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log('Cache hit for Reddit posts');
      return cachedData; // Return cached data if available
    }

   
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
