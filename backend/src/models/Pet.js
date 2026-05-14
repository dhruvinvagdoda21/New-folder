const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster', 'reptile', 'other'],
    required: true,
  },
  breed: {
    type: String,
    default: '',
  },
  age: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  image: {
    type: String,
    default: '',
  },
  medicalNotes: {
    type: String,
    default: '',
  },
  specialNeeds: {
    type: String,
    default: '',
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pet', petSchema);
