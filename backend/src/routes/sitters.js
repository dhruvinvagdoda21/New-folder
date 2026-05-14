const express = require('express');
const router = express.Router();
const Sitter = require('../models/Sitter');
const User = require('../models/User');
const { protect, sitterOnly } = require('../middleware/auth');

// GET /api/sitters - Get all sitters with filters
router.get('/', async (req, res) => {
  try {
    const { petType, minPrice, maxPrice, minRating, service, sort, page = 1, limit = 12 } = req.query;
    
    let query = {};

    if (petType) {
      query.petTypes = petType;
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (service) {
      query['services.name'] = service;
    }

    if (minPrice || maxPrice) {
      query['services.price'] = {};
      if (minPrice) query['services.price'].$gte = parseFloat(minPrice);
      if (maxPrice) query['services.price'].$lte = parseFloat(maxPrice);
    }

    let sortOption = {};
    switch (sort) {
      case 'price-low': sortOption = { 'services.0.price': 1 }; break;
      case 'price-high': sortOption = { 'services.0.price': -1 }; break;
      case 'rating': sortOption = { rating: -1 }; break;
      case 'reviews': sortOption = { totalReviews: -1 }; break;
      default: sortOption = { rating: -1 };
    }

    const sitters = await Sitter.find(query)
      .populate('user', 'name email avatar address phone')
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Sitter.countDocuments(query);

    res.json({
      success: true,
      sitters,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/sitters/:id
router.get('/:id', async (req, res) => {
  try {
    const sitter = await Sitter.findOne({ user: req.params.id })
      .populate('user', 'name email avatar address phone');
    
    if (!sitter) {
      return res.status(404).json({ success: false, message: 'Sitter not found' });
    }

    res.json({ success: true, sitter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/sitters/profile
router.put('/profile', protect, sitterOnly, async (req, res) => {
  try {
    const { bio, experience, services, petTypes, availability, gallery, certifications } = req.body;
    
    const sitter = await Sitter.findOneAndUpdate(
      { user: req.user._id },
      { bio, experience, services, petTypes, availability, gallery, certifications },
      { new: true, runValidators: true, upsert: true }
    ).populate('user', 'name email avatar address phone');

    res.json({ success: true, sitter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/sitters/dashboard/stats
router.get('/dashboard/stats', protect, sitterOnly, async (req, res) => {
  try {
    const sitter = await Sitter.findOne({ user: req.user._id });
    const Booking = require('../models/Booking');
    
    const totalBookings = await Booking.countDocuments({ sitter: req.user._id });
    const pendingBookings = await Booking.countDocuments({ sitter: req.user._id, status: 'pending' });
    const completedBookings = await Booking.countDocuments({ sitter: req.user._id, status: 'completed' });

    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalEarnings: sitter?.totalEarnings || 0,
        rating: sitter?.rating || 0,
        totalReviews: sitter?.totalReviews || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
