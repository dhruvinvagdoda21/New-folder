const mongoose = require('mongoose');

const sitterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500,
  },
  experience: {
    type: Number,
    default: 0,
  },
  services: [{
    name: {
      type: String,
      enum: ['boarding', 'walking', 'daycare', 'grooming', 'training', 'vet-visits'],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  }],
  petTypes: [{
    type: String,
    enum: ['dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster', 'reptile', 'other'],
  }],
  availability: {
    monday: { available: { type: Boolean, default: true }, start: String, end: String },
    tuesday: { available: { type: Boolean, default: true }, start: String, end: String },
    wednesday: { available: { type: Boolean, default: true }, start: String, end: String },
    thursday: { available: { type: Boolean, default: true }, start: String, end: String },
    friday: { available: { type: Boolean, default: true }, start: String, end: String },
    saturday: { available: { type: Boolean, default: false }, start: String, end: String },
    sunday: { available: { type: Boolean, default: false }, start: String, end: String },
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  gallery: [{
    type: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: Number,
  }],
}, {
  timestamps: true,
});

// Index for geospatial queries (using user's address coordinates)
sitterSchema.index({ 'user': 1 });

module.exports = mongoose.model('Sitter', sitterSchema);
