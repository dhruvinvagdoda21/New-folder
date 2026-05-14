const ActivityLog = require('../models/ActivityLog');

const logActivity = async (userId, actionType, page, changes = {}, ipAddress = '') => {
  try {
    if (userId) {
      await ActivityLog.create({
        userId,
        actionType,
        page,
        changes,
        ipAddress
      });
    }
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = { logActivity };
