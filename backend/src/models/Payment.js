const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'usd',
  },
  stripePaymentId: {
    type: String,
    default: '',
  },
  stripeSessionId: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    default: 'pending',
  },
  method: {
    type: String,
    default: 'card',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);
