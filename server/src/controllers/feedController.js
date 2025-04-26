// controllers/feedController.js
require('dotenv').config();
const axios     = require('axios');
const SavedPost = require('../models/SavedPost');
const User      = require('../models/User');
const { awardSavePostCredits } = require('../services/creditService');

// Internal helper: fetch real Reddit posts (unchanged)
const fetchRedditPostsInternal = async () => {
  const { data } = await axios.get('https://www.reddit.com/r/popular.json', {
    params: { limit: 10 },
    headers: { 'User-Agent': process.env.REDDIT_USER_AGENT || 'creator-dashboard/1.0' }
  });
  return data.data.children.map(c => {
    const p = c.data;
    return {
      postId:    p.id,
      title:     p.title,
      url:       `https://reddit.com${p.permalink}`,
      content:   p.selftext || '',
      source:    'Reddit',
      createdAt: new Date(p.created_utc * 1000),
    };
  });
};

// ─── ALTERED: fetch real Twitter posts via Twitter API v2 ───
const fetchTwitterPostsInternal = async (overrideQuery) => {
  const url = 'https://api.twitter.com/2/tweets/search/recent';
  const params = {
    query:         overrideQuery || 'tech OR startup OR javascript',
    max_results:   10,
    'tweet.fields': 'created_at,text'
  };
  const headers = {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
  };

  const { data } = await axios.get(url, { params, headers });
  return (data.data || []).map(tweet => ({
    postId:    tweet.id,
    title:     tweet.text.length > 50 
                 ? tweet.text.slice(0,47) + '...' 
                 : tweet.text,
    url:       `https://twitter.com/i/web/status/${tweet.id}`,
    content:   tweet.text,
    source:    'Twitter',
    createdAt: new Date(tweet.created_at),
  }));
};
// ────────────────────────────────────────────────────────────────

// 🛠 GET /api/feed/reddit
exports.fetchRedditPosts = async (req, res) => {
  try {
    const posts = await fetchRedditPostsInternal();
    res.json({ posts });
  } catch (err) {
    console.error('Error fetching Reddit posts:', err);
    res.status(500).json({ message: 'Failed to fetch Reddit posts' });
  }
};

// 🛠 GET /api/feed/twitter
// Now accepts optional ?q=searchTerm
exports.fetchTwitterPosts = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const posts = await fetchTwitterPostsInternal(searchQuery);
    res.json({ posts });
  } catch (err) {
    console.error('Error fetching Twitter posts:', err);
    res.status(500).json({ message: 'Failed to fetch Twitter posts' });
  }
};

// 🛠 POST /api/feed/save
exports.savePost = async (req, res) => {
  const { postId, title, url, content, source } = req.body;
  try {
    // Prevent duplicates
    const exists = await SavedPost.findOne({ user: req.user._id, postId });
    if (exists) return res.status(400).json({ message: 'Post already saved' });

    const saved = await SavedPost.create({
      user:    req.user._id,
      postId,
      title,
      url,
      content,
      source,
    });

    // Award credit
    const user = await User.findById(req.user._id);
    await awardSavePostCredits(user);

    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ message: 'Failed to save post' });
  }
};

// 🛠 POST /api/feed/report
exports.reportPost = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await SavedPost.findOne({ postId, user: req.user._id });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.reported = true;
    await post.save();
    res.json({ message: 'Post reported successfully' });
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
  const { postId } = req.body;
  try {
    // (Optionally) log the share in a collection or simply simulate:
    // e.g., ActivityLog.create({ user: req.user._id, action: 'share', postId })

    // Award credits
    const user = await User.findById(req.user._id);
    await awardSharePostCredits(user);

    res.json({ message: 'Post shared successfully' });
  } catch (err) {
    console.error('Error sharing post:', err);
    res.status(500).json({ message: 'Failed to share post' });
  }
};
