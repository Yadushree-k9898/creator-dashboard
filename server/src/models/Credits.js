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
    creditsSpent: { 
      type: Number, 
      default: 0 
    },
    action: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Credit', creditSchema);
