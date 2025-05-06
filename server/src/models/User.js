// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     // Allow both lowercase and capitalized roles
//     role: { 
//       type: String, 
//       enum: ['User', 'admin', 'user', 'admin'], 
//       default: 'User',
//       set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() // Normalize to 'User' or 'admin'
//     },
//     credits: { type: Number, default: 0 },
//     savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
//     lastLogin: Date,
//     profileCompleted: { type: Boolean, default: false },
//     recentActivity: [{ type: String }],
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true, 
      match: [/\S+@\S+\.\S+/, 'Invalid email format'] 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user',
      set: v => v.toLowerCase() 
    },
    credits: { 
      type: Number, 
      default: 0 
    },
    savedPosts: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Post' 
    }],
    lastLogin: Date,
    profileCompleted: { 
      type: Boolean, 
      default: false 
    },
    recentActivity: [{ 
      type: String 
    }],
  },
  { timestamps: true }
);

// Pre-save hook to hash password if modified or new
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
