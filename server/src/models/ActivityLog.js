const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  postId: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
