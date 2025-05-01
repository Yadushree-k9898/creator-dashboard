const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Allow both lowercase and capitalized roles
    role: { 
      type: String, 
      enum: ['User', 'Admin', 'user', 'admin'], 
      default: 'User',
      set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() // Normalize to 'User' or 'Admin'
    },
    credits: { type: Number, default: 0 },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    lastLogin: Date,
    profileCompleted: { type: Boolean, default: false },
    recentActivity: [{ type: String }],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
