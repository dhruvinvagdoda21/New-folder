const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Sitter = require('../models/Sitter');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const { sitterId, petId, service, startDate, endDate, totalPrice, notes } = req.body;
    
    const booking = await Booking.create({
      owner: req.user._id,
      sitter: sitterId,
      pet: petId,
      service,
      startDate,
      endDate,
      totalPrice,
      notes,
    });

    // Notify sitter
    await User.findByIdAndUpdate(sitterId, {
      $push: {
        notifications: {
          type: 'booking',
          message: `New booking request from ${req.user.name}`,
        },
      },
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/bookings - Get user's bookings
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = {};

    if (req.user.role === 'owner') {
      query.owner = req.user._id;
    } else if (req.user.role === 'sitter') {
      query.sitter = req.user._id;
    }

    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('owner', 'name email avatar')
      .populate('sitter', 'name email avatar')
      .populate('pet', 'name type breed image')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/bookings/:id/status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // Update sitter stats if completed
    if (status === 'completed') {
      await Sitter.findOneAndUpdate(
        { user: booking.sitter },
        {
          $inc: {
            totalBookings: 1,
            totalEarnings: booking.totalPrice,
          },
        }
      );
    }

    // Notify the other party
    const notifyUserId = req.user.role === 'sitter' ? booking.owner : booking.sitter;
    await User.findByIdAndUpdate(notifyUserId, {
      $push: {
        notifications: {
          type: 'booking_update',
          message: `Booking ${status}: ${booking.service}`,
        },
      },
    });

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
