const mongoose = require('mongoose');

const savedPostSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  postId: { 
    type: String, 
    required: true 
  }, // The ID from Reddit or LinkedIn post
  source: { 
    type: String, 
    enum: ['reddit', 'twitter', 'Reddit', 'Twitter', 'linkedin', 'LinkedIn'], 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String 
  },
  content: { 
    type: String 
  },
  reported: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('SavedPost', savedPostSchema);
