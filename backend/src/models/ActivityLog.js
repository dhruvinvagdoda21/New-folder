const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
  },
  ipAddress: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
