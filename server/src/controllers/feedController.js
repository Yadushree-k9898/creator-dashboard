require('dotenv').config();
const axios = require('axios');
const SavedPost = require('../models/SavedPost');
const User = require('../models/User');
const { awardSavePostCredits } = require('../services/creditService');
const { getCache, setCache} = require('../config/redisClient');
const { fetchRedditPosts } = require('../services/feedService');



const fetchRedditPostsInternal = async () => {
  const { data } = await axios.get('https://www.reddit.com/r/popular.json', {
    params: { limit: 10 }, // Fetching 10 posts, adjust as needed
    headers: { 'User-Agent': process.env.REDDIT_USER_AGENT || 'creator-dashboard/1.0' }
  });
  return data.data.children.map(c => {
    const p = c.data;
    return {
      postId: p.id,
      title: p.title,
      url: `https://reddit.com${p.permalink}`,
      content: p.selftext || '',
      source: 'Reddit',
      createdAt: new Date(p.created_utc * 1000),
    };
  });
};


exports.fetchRedditPosts = async (req, res) => {
  const cacheKey = 'reddit:popular';
  
  try {
    const fetchRedditPosts = async (req, res) => {
      const cacheKey = 'reddit:popular';
      
      try {
        // Try fetching cached data
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
          console.log('Returning cached Reddit posts');
          return res.json({ posts: JSON.parse(cachedData) });
        }
    
        // Fetch posts from API
        const posts = await fetchRedditPostsInternal();
        console.log('Fetched new Reddit posts from API');
    
        // Cache the posts for 5 minutes (300 seconds)
        await setCache(cacheKey, 300, JSON.stringify(posts));
    
        // Return the fetched posts
        return res.json({ posts });
    
      } catch (err) {
        console.error('Error fetching Reddit posts:', err);
        return res.status(500).json({ message: 'Failed to fetch Reddit posts' });
      }
    };
    const posts = await fetchRedditPostsInternal();
    console.log('Fetched new Reddit posts from API');

    // Return the fetched posts
    return res.json({ posts });

  } catch (err) {
    console.error('Error fetching Reddit posts:', err);
    return res.status(500).json({ message: 'Failed to fetch Reddit posts' });
  }
};




const fetchDevToPostsInternal = async (overrideQuery) => {
  const tag = overrideQuery || 'javascript'; 
  const url = `https://dev.to/api/articles`;
  const params = {
    tag,
    per_page: 10
  };

  const { data } = await axios.get(url, { params });

  return data.map(post => ({
    postId: post.id,
    title: post.title,
    url: post.url,
    content: post.description || post.body_markdown || '',
    source: 'Dev.to',
    createdAt: new Date(post.published_at),
  }));
};


// GET /api/feed/devto
exports.fetchDevToPosts = async (req, res) => {
  const searchQuery = req.query.q || 'javascript';
  const cacheKey = `devto:${searchQuery}`;
  try {
   

    const posts = await fetchDevToPostsInternal(searchQuery);
    await setCache(cacheKey, posts, 300);

    res.json({ posts });
  } catch (err) {
    console.error('Error fetching Dev.to posts:', err);
    res.status(500).json({ message: 'Failed to fetch Dev.to posts' });
  }
};

// 🛠 POST /api/feed/save
exports.savePost = async (req, res) => {
  const { postId, title, url, content, source } = req.body;
  try {
    console.log('Attempting to save post with ID:', postId);
    
    // Check if post already exists for this user
    const exists = await SavedPost.findOne({ 
      $or: [
        { user: req.user._id, postId },
        // Also check by URL to catch duplicates from different sources
        { user: req.user._id, url }
      ]
    });
    
    // If post already exists, return a friendly message
    if (exists) {
      console.log('Post already saved by user');
      return res.status(200).json({ 
        message: 'You have already saved this post',
        post: {
          _id: exists._id,
          title: exists.title,
          source: exists.source,
          url: exists.url,
          saved: true
        }
      });
    }

    // Create new saved post
    const saved = await SavedPost.create({
      user: req.user._id,
      postId,
      title,
      url,
      content,
      source,
    });
    console.log('Post saved successfully with ID:', saved._id);

    // Award credit
    const user = await User.findById(req.user._id);
    const credits = await awardSavePostCredits(user._id);
    console.log('Credits awarded for saving post');
    
    // Create activity log entry
    const ActivityLog = require('../models/ActivityLog');
    const activity = new ActivityLog({
      user: req.user._id,
      action: 'SAVED_POST',
      postId: saved._id,
      details: `Saved a ${source} post: ${title.substring(0, 30)}...`
    });
    await activity.save();
    console.log('Activity logged');

    // Return success response with post details
    res.status(201).json({
      message: 'Post saved successfully',
      post: saved,
      credits: credits ? credits.totalCredits : user.credits
    });
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ message: 'Failed to save post' });
  }
};


exports.reportPost = async (req, res) => {
  console.log('Feed report request received with body:', req.body);

  try {
    const { postId, title, url, content, source } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let post = null;

    if (postId) {
      try {
        post = await SavedPost.findOne({ postId, user: req.user._id });

        if (!post && /^[0-9a-fA-F]{24}$/.test(postId)) {
          post = await SavedPost.findOne({ _id: postId, user: req.user._id });
        }

        console.log('Looking for post by ID:', postId, 'Found:', !!post);
      } catch (error) {
        console.log('Error finding post by ID (safely handled):', error.message);
      }
    }

    if (!post && title && url) {
      console.log('Creating new post to report');
      post = new SavedPost({
        user: req.user._id,
        postId: postId || `temp-${Date.now()}`,
        title,
        url,
        content: content || '',
        source: source || 'Unknown',
        reported: false
      });
      await post.save();
    }

    if (!post) {
      post = await SavedPost.findOne({ user: req.user._id, reported: false });
    }

    if (!post) {
      post = new SavedPost({
        user: req.user._id,
        postId: `sample-${Date.now()}`,
        title: 'Sample Post for Reporting',
        url: 'https://example.com/sample-post',
        content: 'This is a sample post created for reporting purposes',
        source: 'Sample',
        reported: false
      });
      await post.save();
    }

    if (!post.reported) {
      post.reported = true;
      await post.save();

      const { awardReportPostCredits } = require('../services/creditService');
      const credits = await awardReportPostCredits(req.user._id);

      const ActivityLog = require('../models/ActivityLog');
      const activity = new ActivityLog({
        user: req.user._id,
        action: 'REPORTED_POST',
        postId: post._id,
        details: `Reported a ${post.source} post: ${post.title.substring(0, 30)}...`
      });
      await activity.save();

      const reportedPostsCount = await SavedPost.countDocuments({ user: req.user._id, reported: true });

      return res.status(200).json({
        message: 'Post reported successfully',
        post: {
          _id: post._id,
          title: post.title,
          url: post.url,
          source: post.source,
          reported: true
        },
        credits: credits ? credits.totalCredits : user.credits,
        reportedPostsCount
      });
    } else {
      return res.status(200).json({
        message: 'This post has already been reported',
        post: {
          _id: post._id,
          title: post.title,
          url: post.url,
          source: post.source,
          reported: true
        }
      });
    }
  } catch (err) {
    console.error('Error reporting post:', err);
    res.status(500).json({ message: 'Failed to report post' });
  }
};


// 🛠 GET /api/feed/saved
exports.getSavedPosts = async (req, res) => {
  try {
    const posts = await SavedPost.find({ user: req.user._id });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching saved posts:', err);
    res.status(500).json({ message: 'Failed to fetch saved posts' });
  }
};

const { awardSharePostCredits } = require('../services/creditService');

exports.sharePost = async (req, res) => {
  console.log('Feed share request received with body:', req.body);
  
  try {
    const { postId, title, url, content, source } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // First try to find an existing post by postId
    let post = null;
    if (postId) {
      try {
        // First try to find by postId field (not the MongoDB _id)
        post = await SavedPost.findOne({ postId, user: req.user._id });
        
        // If not found and postId looks like a valid MongoDB ObjectId, try that too
        if (!post && /^[0-9a-fA-F]{24}$/.test(postId)) {
          post = await SavedPost.findOne({ _id: postId, user: req.user._id });
        }
        
        console.log('Looking for post by ID:', postId, 'Found:', post ? 'Yes' : 'No');
      } catch (error) {
        console.log('Error finding post by ID (safely handled):', error.message);
      }
    }
    
    // If no post found and we have details, create a new post to share
    if (!post && title && url) {
      console.log('Creating new post to share');
      post = new SavedPost({
        user: req.user._id,
        postId: postId || `temp-${Date.now()}`,
        title,
        url,
        content: content || '',
        source: source || 'Unknown',
        shared: false
      });
      await post.save();
      console.log('Created new post with ID:', post._id);
    }
    
    // If still no post, try to find any unshared post
    if (!post) {
      console.log('Looking for any unshared post');
      post = await SavedPost.findOne({ user: req.user._id, shared: false });
    }
    
    // If still no post, create a sample post
    if (!post) {
      console.log('Creating sample post for sharing');
      post = new SavedPost({
        user: req.user._id,
        postId: `sample-${Date.now()}`,
        title: 'Sample Post for Sharing',
        url: 'https://example.com/sample-post',
        content: 'This is a sample post created for sharing purposes',
        source: 'Sample',
        shared: false
      });
      await post.save();
      console.log('Created sample post with ID:', post._id);
    }
    
    // Mark the post as shared if not already
    if (!post.shared) {
      post.shared = true;
      await post.save();
      console.log('Post marked as shared');
      
      // Award credits for sharing
      const credits = await awardSharePostCredits(user._id);
      console.log('Credits awarded for sharing');
      
      // Create activity log entry
      const ActivityLog = require('../models/ActivityLog');
      const activity = new ActivityLog({
        user: user._id,
        action: 'SHARED_POST',
        postId: post._id,
        details: `Shared a ${post.source} post: ${post.title.substring(0, 30)}...`
      });
      await activity.save();
      console.log('Activity logged');
      
      // Get updated counts
      const sharedPostsCount = await SavedPost.countDocuments({ user: req.user._id, shared: true });
      
      return res.status(200).json({
        message: 'Post shared successfully',
        post: {
          _id: post._id,
          title: post.title,
          source: post.source,
          shared: true
        },
        credits: credits ? credits.totalCredits : user.credits,
        sharedPostsCount
      });
    } else {
      // Post was already shared
      console.log('Post was already shared by user');
      
      // Get the count of shared posts for this user
      const sharedPostsCount = await SavedPost.countDocuments({ user: req.user._id, shared: true });
      
      return res.status(200).json({
        message: 'You have already shared this post',
        post: {
          _id: post._id,
          title: post.title,
          source: post.source,
          shared: true
        },
        sharedPostsCount
      });
    }
  } catch (err) {
    console.error('Error sharing post:', err);
    res.status(500).json({ message: 'Server error processing share request' });
  }
};
