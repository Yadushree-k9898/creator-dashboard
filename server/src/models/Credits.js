const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    totalCredits: { 
      type: Number, 
      default: 0 
    },
    loginPoints: { 
      type: Number, 
      default: 0 
    },
    interactionPoints: { 
      type: Number, 
      default: 0 
    },
    profileCompletionPoints: { 
      type: Number, 
      default: 0 
    },
    lastLoginDate: {
      type: Date
    },
    action: {
      type: String,
      required: true,
      enum: ['REGISTRATION', 'LOGIN', 'PROFILE_COMPLETION', 'POST_SAVE', 'POST_REPORT']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Credits', creditSchema);
