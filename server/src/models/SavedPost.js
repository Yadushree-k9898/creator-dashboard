const mongoose = require('mongoose');

const savedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  content: String,
  reported: {
    type: Boolean,
    default: false
  },
  shared: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SavedPost', savedPostSchema);
