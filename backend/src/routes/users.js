const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

// GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, address, avatar, darkMode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address, avatar, darkMode },
      { new: true, runValidators: true }
    );

    await logActivity(user._id, 'PROFILE_UPDATE', '/profile', { name, phone }, req.ip);

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users/favorites/:sitterId
router.post('/favorites/:sitterId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const sitterId = req.params.sitterId;

    const index = user.favorites.indexOf(sitterId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(sitterId);
    }

    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/users/notifications
router.get('/notifications', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, notifications: user.notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/notifications/read
router.put('/notifications/read', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { 'notifications.$[].read': true },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
