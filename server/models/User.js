const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: Date,
    preferences: {
      theme: { type: String, default: 'dark' },
      defaultSummaryLength: { type: String, default: 'medium' },
      quizDifficulty: { type: String, default: 'medium' },
    },
    stats: {
      totalStudyHours: { type: Number, default: 0 },
      quizzesTaken: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 },
      flashcardsReviewed: { type: Number, default: 0 },
      notesUploaded: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
