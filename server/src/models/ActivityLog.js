const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  action: { 
    type: String, 
    required: true,
    enum: [
      'SAVED_POST', 
      'SHARED_POST', 
      'REPORTED_POST', 
      'LOGIN', 
      'PROFILE_COMPLETION'
      
    ]
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SavedPost',
    default: null
  },
  details: { 
    type: String,
    default: ''
  } 
}, { 
  timestamps: true 
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
