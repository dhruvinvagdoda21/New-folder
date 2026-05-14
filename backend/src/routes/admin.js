const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Sitter = require('../models/Sitter');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSitters = await User.countDocuments({ role: 'sitter' });
    const totalOwners = await User.countDocuments({ role: 'owner' });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const recentBookings = await Booking.find()
      .populate('owner', 'name email')
      .populate('sitter', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({
      success: true,
      stats: {
        totalUsers, totalSitters, totalOwners, totalBookings,
        pendingBookings, completedBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    let query = {};
    if (role) query.role = role;
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(query);
    res.json({ success: true, users, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/users/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/bookings', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    let query = {};
    if (status) query.status = status;
    const bookings = await Booking.find(query)
      .populate('owner', 'name email')
      .populate('sitter', 'name email')
      .populate('pet', 'name type')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Booking.countDocuments(query);
    res.json({ success: true, bookings, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
