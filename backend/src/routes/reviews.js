const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Sitter = require('../models/Sitter');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// POST /api/reviews
router.post('/', protect, async (req, res) => {
  try {
    const { bookingId, sitterId, rating, comment } = req.body;

    // Verify the booking exists and is completed
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings',
      });
    }

    // Check if already reviewed
    const existing = await Review.findOne({ booking: bookingId, reviewer: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already reviewed this booking' });
    }

    const review = await Review.create({
      booking: bookingId,
      reviewer: req.user._id,
      sitter: sitterId,
      rating,
      comment,
    });

    // Update sitter's average rating
    const reviews = await Review.find({ sitter: sitterId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Sitter.findOneAndUpdate(
      { user: sitterId },
      { rating: Math.round(avgRating * 10) / 10, totalReviews: reviews.length }
    );

    await review.populate('reviewer', 'name avatar');

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reviews/sitter/:sitterId
router.get('/sitter/:sitterId', async (req, res) => {
  try {
    const reviews = await Review.find({ sitter: req.params.sitterId })
      .populate('reviewer', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
