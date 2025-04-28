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
      // Add more actions here as needed
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
  } // Additional details about the activity
}, { 
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
