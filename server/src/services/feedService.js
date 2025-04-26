// services/feedService.js

// Simulate fetching Reddit posts
exports.fetchRedditPosts = async () => {
    // In real case, you'd call Reddit API here
    return [
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
  };
  
  // Simulate fetching LinkedIn posts
  exports.fetchLinkedInPosts = async () => {
    // In real case, you'd call LinkedIn API here
    return [
      {
        id: 'linkedin1',
        source: 'LinkedIn',
        title: '5 leadership lessons for founders',
        link: 'https://linkedin.com/posts/post1',
        createdAt: new Date(),
      },
      {
        id: 'linkedin2',
        source: 'LinkedIn',
        title: 'Networking tips for entrepreneurs',
        link: 'https://linkedin.com/posts/post2',
        createdAt: new Date(),
      },
    ];
  };
  