const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  postId: { type: String },  // Optional: if the action involves a post (e.g., saving a post)
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
